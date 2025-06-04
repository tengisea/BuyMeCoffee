import { auth, currentUser } from "@clerk/nextjs/server";
import { Header, NavBar, CreateProfile } from "./components";

export default async function Page() {
  const { userId } = await auth();

  const user = await currentUser();

  if (!user) {
    return <div>Welcome, guest!</div>;
  }
  return (
    <div className="flex flex-row">
      <Header/>
      <NavBar />
      <div>
        <div>
          {user ? <p>Welcome, user {userId}</p> : <p>Welcome, guest!</p>}
        </div>
    
      </div>
    </div>
  );
}
