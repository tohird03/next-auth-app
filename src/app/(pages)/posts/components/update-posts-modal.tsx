"use client"

import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { postsApi } from "@/services/posts/posts";
import { useStores } from "@/store/store-context";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

function UpdatePostModal() {
  const { postsStore } = useStores()
  const { data: session } = useSession();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: postsStore?.updatePost?.title!,
      body: postsStore?.updatePost?.body!,
    },
    onSubmit: async (values: IUpdatePost) => {
      try {
        await postsApi.updateMyPost({
          ...postsStore?.updatePost,
          ...values,
        });

        postsStore.getMyAllPosts((session?.user as any)?.id!)
        postsStore.getAllFirePost()

        handleClose()
        toast.success("Update successfully");
      } catch (error) {
        toast.error("Smth wrong, please try again");
      }
    }
  });

  const handleClose = () => {
    postsStore.setIsOpenUpdateModal(false);
  };

  return (
    <Modal
      isOpen={postsStore.isOpenUpdateModal}
      onClose={handleClose}
      modalTitle="Update post"
    >
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name='title'
          onChange={formik.handleChange}
          value={formik.values?.title}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <input
          type="text"
          name='body'
          onChange={formik.handleChange}
          value={formik.values?.body}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <Button
          styles="w-full flex justify-center"
          title="Update post"
          type="primary"
        />
      </form>
    </Modal>
  )
}

export default UpdatePostModal
