import { DashboardProfile, NavBar } from "./components";

export default async function Page() {
  return (
    <div className="flex flex-row">
      <NavBar />
      <div className="px-10 w-full">
        <DashboardProfile />
      </div>
    </div>
  );
}
