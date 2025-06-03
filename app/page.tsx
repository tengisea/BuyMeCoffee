import { auth, currentUser } from "@clerk/nextjs/server";
import { AddBankCard, CreateProfile, NavBar } from "./components";

export default async function Page() {
  const { userId } = await auth();

  const user = await currentUser();

  if (!user) {
    return <div>Welcome, guest!</div>;
  }
  return (
    <div className="flex flex-row">
      <NavBar />
      <div>
        <div>
          {user ? <p>Welcome, user {userId}</p> : <p>Welcome, guest!</p>}
        </div>
        <CreateProfile />
      </div>
    </div>
  );
}
