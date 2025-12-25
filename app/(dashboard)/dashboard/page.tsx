import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardRootPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/login");
    }

    // Check onboarding status
    if (!(session.user as any).onboarding_completed) {
        redirect("/onboarding");
    }

    const username = session.user.name || "user";
    redirect(`/dashboard/${username}`);
}
