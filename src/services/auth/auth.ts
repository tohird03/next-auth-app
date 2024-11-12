import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { ISignUpForm } from '@/types/dto/auth';

class AuthApi {
  addNewUser = async (params: ISignUpForm): Promise<void> => {
    const usersCollection = collection(db, "users");

    const userQuery = query(
      usersCollection,
      where("username", "==", params.username),
      where("password", "==", params.password)
    );
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      await addDoc(usersCollection, params);
    } else {
      throw new Error('Smth wrong')
    }
  };
}

export const authApi = new AuthApi();
