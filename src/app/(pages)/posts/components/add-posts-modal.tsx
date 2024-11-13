"use client"

import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { postsApi } from "@/services/posts/posts";
import { useStores } from "@/store/store-context";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

function AddPostModal() {
  const { postsStore } = useStores()
  const { data: session } = useSession();

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
    },
    onSubmit: async (values: IAddPostForm) => {
      try {
        await postsApi.createMyPostToBase({
          ...values,
          userId: (session?.user as any)?.id!,
          user: {
            fullname: (session?.user as any)?.fullname,
            username: (session?.user as any)?.username
          }
        });
        postsStore.getMyAllPosts((session?.user as any)?.id!)
        postsStore.getAllFirePost()
        handleClose()
        toast.success("Post added successfully");
      } catch (error) {
        toast.error("Smth wrong, please try again");
      }
    }
  });

  const handleClose = () => {
    postsStore.setIsOpenAddPostModal(false);
  };

  return (
    <Modal
      isOpen={postsStore.isOpenAddPostModal}
      onClose={handleClose}
      modalTitle="Add post"
    >
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name='title'
          onChange={formik.handleChange}
          value={formik.values.title}
          placeholder="Title"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          type="text"
          name='body'
          onChange={formik.handleChange}
          value={formik.values.body}
          placeholder="Body"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <Button
          styles="w-full flex justify-center"
          title="Add post"
          type="primary"
        />
      </form>
    </Modal>
  )
}

export default AddPostModal
