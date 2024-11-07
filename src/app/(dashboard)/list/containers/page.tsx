import { Metadata } from "next";
import ContainerListPage from "./ContainerListPage";
import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";

export const metadata: Metadata = {
  title: "Container List Page",
};

export default async function Page() {
  // TODO: Protect this page via authentication
  const session = await getSession();
  const user = session?.user;

  if(!user) {
    redirect("/api/auth/signin?callbackUrl=/containers");
  }
  return <ContainerListPage user={user}/>;
}
