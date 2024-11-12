"use client"

import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { postsApi } from "@/services/posts/posts";
import { useStores } from "@/store/store-context";
import { useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "react-toastify";

function UpdatePostModal() {
  const { postsStore } = useStores()

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
        postsStore.getMyAllPosts(1234)
        handleClose()
        toast.success("Post added successfully");
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
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name='title'
          onChange={formik.handleChange}
          value={formik.values?.title}
        />
        <input
          type="text"
          name='body'
          onChange={formik.handleChange}
          value={formik.values?.body}
        />

        <Button title="Add" type="primary" />
      </form>
    </Modal>
  )
}

export default UpdatePostModal
