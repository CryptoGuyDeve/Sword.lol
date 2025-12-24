import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardRootPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/login");
    }

    // Redirect to the user-specific dashboard using their username
    // session.user.name is mapped to username in auth.ts
    const username = session.user.name || "user";
    redirect(`/dashboard/${username}`);
}
