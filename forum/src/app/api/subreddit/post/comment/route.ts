import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CommentValidator } from "@/lib/validators/comment";
import { Knock } from "@knocklabs/node";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { postId, text, replyToId } = CommentValidator.parse(body);

    const session = await getAuthSession();
    const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY);

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // if no existing vote, create a new vote
    await db.comment.create({
      data: {
        text,
        postId,
        authorId: session.user.id,
        replyToId,
      },
    });

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });

    const postAuthor = await db.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        authorId: true,
      },
    });

    const subreddit = await db.subreddit.findUnique({
      where: {
        id: post?.subredditId,
      },
    });

    if (
      postAuthor?.authorId !== session.user.id &&
      postAuthor?.authorId !== undefined
    ) {
      await knockClient.workflows.trigger("comment", {
        actor: session.user.id,
        recipients: [postAuthor.authorId],
        data: {
          title: post?.title,
          preview: text.slice(0, 20),
          subredditName: subreddit?.name,
        },
      });
    }

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not post to subreddit at this time. Please try later",
      { status: 500 }
    );
  }
}
