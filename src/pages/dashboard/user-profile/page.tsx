import SectionUserProfile from "../../../components/sections/user-profile/user-profile";
import { redirect, useLoaderData } from "react-router-dom";
import API from "../../../services/api/api";
import { ResponseGetUserMe } from "../../../services/api/endpoints/user-me";
import Auth from "../../../services/auth/auth";

export type DataLoaderPageProfile = {
  data: ResponseGetUserMe;
  photo: string;
};

export async function loaderPageProfile(): Promise<
  DataLoaderPageProfile | Response
> {
  const auth = Auth.getAuth();

  if (!auth) {
    return redirect("/login");
  }

  const userData = await API.private.getUserMe(auth.token, auth.tokenType);
  console.log(userData);

  const userPhoto = await API.public.getUserImageURL(userData.user.id);

  return {
    data: userData,
    photo: userPhoto,
  };
}

export default function PageUserProfile() {
  const loaderData = useLoaderData() as DataLoaderPageProfile;

  return (
    <main>
      <SectionUserProfile userData={loaderData.data} photo={loaderData.photo} />
    </main>
  );
}
