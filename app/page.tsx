import { auth, currentUser } from "@clerk/nextjs/server";
import { Header, NavBar } from "./components";
import AddBankCardProfile from "./components/AddBankCard";

export default async function Page() {
  const user = await currentUser();

  // console.log(user);
  
  return (
    <div className="flex flex-row">
      <Header/>
      <NavBar />
      <div>
        <div>
          {user ? <p>Welcome, user {user.username}</p> : <p>Welcome, guest!</p>}
        </div>
    
      </div>
    </div>
  );
}
