"use client";

import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { postsApi } from "@/services/posts/posts";
import { useStores } from "@/store/store-context";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { useState, useEffect } from "react";
import AddPostModal from "./components/add-posts-modal";
import { toast } from "react-toastify";
import UpdatePostModal from "./components/update-posts-modal";

function Posts() {
  const {postsStore} = useStores()
  const [posts, setPosts] = useState<IPost[]>([]);
  const [myPosts, setMyPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const otherPost = await postsApi.getAllPosts();
      postsStore.getMyAllPosts(1234)

      setPosts(otherPost);
    };

    fetchPosts();
  }, []);

  const handleOpenModal = () => {
    postsStore.setIsOpenAddPostModal(true);
  };

  const handleUpdatePost = (post: IPost) => {
    postsStore.setUpdatePost(post)
    postsStore.setIsOpenUpdateModal(true)
  }

  const handleDelete = (postId: string) => {
    postsApi.deleteMyPostsFromBase(postId)
      .then(() => {
        postsStore.getMyAllPosts(1234)
        toast.success('Success delete')
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  console.log(postsStore.isOpenAddPostModal);
  console.log(postsStore.isOpenUpdateModal);

  return (
    <div>
      <button onClick={handleOpenModal}>Add</button>

      <h1>Salom</h1>
      {postsStore.myAllPosts?.map((post: IPost, index) => (
        <div key={post?.id || `my-post-${index}`}>
          <h2>{post?.title}</h2>
          <p>{post?.body}</p>
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={handleUpdatePost.bind(null, post)}
          />
          <Button
            icon={<DeleteOutlined />}
            type="danger"
            onClick={handleDelete.bind(null, String(post?.id))}
          />
        </div>
      ))}

      {posts?.map((post: IPost) => (
        <div key={post?.id}>
          <h2>{post?.title}</h2>
          <p>{post?.body}</p>
        </div>
      ))}

      <AddPostModal />
      <UpdatePostModal />
    </div>
  );
}


export default observer(Posts)
