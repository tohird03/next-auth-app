"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { toast } from "react-toastify";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import PostCard from "./components/post-card";
import AddPostModal from "./components/add-posts-modal";
import UpdatePostModal from "./components/update-posts-modal";
import { postsApi } from "@/services/posts/posts";
import { useStores } from "@/store/store-context";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { redirect } from "next/navigation";

function Posts() {
  const { postsStore } = useStores();
  const [posts, setPosts] = useState<IPost[]>([]);
  const { data: session, status } = useSession()

  if (status === "unauthenticated") {
    return redirect('/signin')
  }

  const handleOpenModal = () => {
    postsStore.setIsOpenAddPostModal(true);
  };

  const handleUpdatePost = (post: IPost) => {
    postsStore.setUpdatePost(post);
    postsStore.setIsOpenUpdateModal(true);
  };

  const handleDelete = (postId: string) => {
    postsApi.deleteMyPostsFromBase(postId)
      .then(() => {
        const userId = (session?.user as any)?.id;
        if (userId) {
          postsStore.getMyAllPosts(userId);
          toast.success("Success delete");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const otherPost = await postsApi.getAllPosts();
      postsStore.getAllFirePost()

      setPosts(otherPost);

      const userId = (session?.user as any)?.id;
      if (userId) {
        postsStore.getMyAllPosts(userId);
      }
    };

    fetchPosts();
  }, [(session?.user as any)?.id]);

  return (
    <div>

      <div className="flex items-center justify-center gap-4">
        <h1 className="text-center text-4xl mb-4">Only my posts</h1>
        <Button title="Add new post" onClick={handleOpenModal} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mb-4">
        {postsStore.myAllPosts?.map((post: IPost, index) => (
          <PostCard
            key={post?.id}
            title={post?.title}
            body={post?.body}
            footer={
              <div className="gap-2 flex">
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
            }
          />
        ))}
      </div>

      <h1 className="text-center text-4xl mb-4">All posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center ">
        {postsStore?.allDbPosts?.map((post: IPost) => (
          <PostCard
            key={post?.id}
            title={post?.title}
            body={post?.body}
          />
        ))}
        {posts?.map((post: IPost) => (
          <PostCard
            key={post?.id}
            title={post?.title}
            body={post?.body}
          />
        ))}
      </div>
      {postsStore.isOpenAddPostModal && <AddPostModal />}
      {postsStore.isOpenUpdateModal && <UpdatePostModal />}
    </div>
  );
}

export default observer(Posts);
