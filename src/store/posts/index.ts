import { postsApi } from '@/services/posts/posts';
import {makeAutoObservable} from 'mobx';
import { toast } from 'react-toastify';

class PostsStore {
  myAllPosts: IPost[] = []
  isOpenAddPostModal = false
  isOpenUpdateModal = false
  isOpenConfirmDelete = false
  updatePost: IPost | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getMyAllPosts = (myId: number) =>
    postsApi.getMyPostFromBase(myId)
    .then((res) => {
      this.myAllPosts = res
    })
    .catch(() => {
      toast.error('Smth wrong')
    })

  setIsOpenAddPostModal = (isOpen: boolean) => {
    this.isOpenAddPostModal = isOpen
  }

  setIsOpenConfirmDelete = (isOpen: boolean) => {
    this.isOpenConfirmDelete = isOpen
  }

  setIsOpenUpdateModal = (isOpen: boolean) => {
    this.isOpenUpdateModal = isOpen
  }

  setUpdatePost = (updatePost: IPost) => {
    this.updatePost = updatePost
  }

  reset() {
    this.isOpenConfirmDelete = false;
  }
}

export const postsStore = new PostsStore();
