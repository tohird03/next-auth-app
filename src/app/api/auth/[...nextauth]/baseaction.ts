import { db } from "@/lib/firebase/firebase";
import { IAuthForm } from "@/types/dto/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function signInUser({ username, password }: IAuthForm) {
  try {
    const usersRef = collection(db, "users");

    const q = query(usersRef, where("username", "==", username), where("password", "==", password));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return { ...userData, uid: querySnapshot.docs[0].id };
    } else {
      console.log("No matching user found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

