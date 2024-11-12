import { AxiosResponse } from 'axios';
import { Instance } from '../instance.config';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

class PostsApi extends Instance {
  getAllPosts = (): Promise<IPost[]> =>
    this.get('/posts');

  createMyPostToBase = (params: IPost) =>
    addDoc(collection(db, "my-posts"), params);

  getMyPostFromBase = async (myId: number) => {
    const q = query(collection(db, "my-posts"), where("userId", "==", myId));
    const querySnapshot = await getDocs(q);

    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return posts as unknown as IPost[];
  };

  deleteMyPostsFromBase = async (myPostId: string) => {
    try {
      const docRef = doc(db, "my-posts", myPostId);
      await deleteDoc(docRef);
      return 'Success';
    } catch (err) {
      throw new Error('Error, please try again');
    }
  }

  updateMyPost = async (params: IUpdatePost) => {
    try {
      if (!params.id) {
        throw new Error("Post ID is required");
      }

      const docRef = doc(db, "my-posts", String(params.id));
      await updateDoc(docRef, { ...params });
      return 'Success';
    } catch (err) {
      throw new Error('Error, please try again');
    }
  }


}

export const postsApi = new PostsApi({});
