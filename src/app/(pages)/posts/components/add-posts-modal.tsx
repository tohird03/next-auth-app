"use client"

import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { postsApi } from "@/services/posts/posts";
import { useStores } from "@/store/store-context";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";

function AddPostModal() {
  const { postsStore } = useStores()

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
    },
    onSubmit: async (values: IAddPostForm) => {
      try {
        await postsApi.createMyPostToBase({
          ...values,
          userId: 1234,
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
    postsStore.setIsOpenAddPostModal(false);
  };

  return (
    <Modal
      isOpen={postsStore.isOpenAddPostModal}
      onClose={handleClose}
      modalTitle="Add post"
    >
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name='title'
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        <input
          type="text"
          name='body'
          onChange={formik.handleChange}
          value={formik.values.body}
        />

        <Button title="Add" type="primary" />
      </form>
    </Modal>
  )
}

export default AddPostModal
