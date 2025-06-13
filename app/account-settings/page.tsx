"use client";

import { NavBar } from "../components";
import { UpdateAccount } from "./components/UpdateAccount";

const AccountSettings = () => {
  return (
    <div className="flex flex-row">
      <NavBar />
      <UpdateAccount />
    </div>
  );
};

export default AccountSettings;
