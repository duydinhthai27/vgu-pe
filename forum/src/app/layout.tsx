import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/Toaster";
import { Knock } from "@knocklabs/node";
import "@/styles/globals.css";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mythos Forum",
};

export default async function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  const session = await getAuthSession();

  const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY);
  const knockUser = session
    ? await knockClient.users.identify(session.user.id, {
        id: session.user.id,
        name: session.user.name ? session.user.name : undefined,
      })
    : null;
  console.log(knockUser);
  return (
    <html
      lang="en"
      className={cn(" bg-black text-white antialiased light", inter.className)}
    >
      <body className="min-h-screen pt-12 bg-slate-50 antialiased">
        <Providers>
          {/* @ts-expect-error Server Component */}
          <Navbar />
          {authModal}

          <div className="container max-w-7xl mx-auto h-full pt-12">
            {children}
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
