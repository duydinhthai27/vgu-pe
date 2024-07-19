import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { z } from "zod";
import { Knock } from "@knocklabs/node";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, content, subredditId, subredditName } =
      PostValidator.parse(body);

    const session = await getAuthSession();

    const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY);

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // verify user is subscribed to passed subreddit id
    const subscription = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });

    if (!subscription) {
      return new Response("Subscribe to post", { status: 403 });
    }

    await db.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        subredditId,
      },
    });

    const otherUsers = await db.user.findMany({
      where: {
        id: {
          not: session.user.id,
        },
        subscriptions: {
          some: {
            subredditId: subredditId,
          },
        },
      },
      select: {
        id: true,
      },
    });

    await knockClient.workflows.trigger("new-post", {
      actor: session.user.id,
      recipients: otherUsers.map((user) => user.id),
      data: {
        data: {
          subredditName,
          title,
        },
      },
    });

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
