import { Metadata } from "next";
import AdminPage from "./AdminPage";
import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";
import DataPanel from "./DataPanel";

export const metadata: Metadata = {
  title: "Admin Page",
};

export default async function Page() {
  // TODO: Protect this page via authentication
  const session = await getSession();
  const user = session?.user;

  if(!user) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }
  //return <AdminPage user={user}/>;
  return <DataPanel/>;
}
