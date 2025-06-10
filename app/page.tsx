import { DashboardProfile, NavBar } from "./components";

export default async function Page() {
  return (
    <div className="flex flex-row">
      <NavBar />
      <DashboardProfile />
      
    </div>
  );
}
