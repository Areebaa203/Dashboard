import { UserDashboardClient } from "@/components/UserDashboardClient";

export const metadata = {
  title: "Dashboard - User",
  description: "Overview of your account and activity",
};

export default function UserDashboard() {
  return <UserDashboardClient />;
}
