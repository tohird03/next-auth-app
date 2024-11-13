"use client";

import { IAuthForm } from "@/types/dto/auth";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SignIn() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values: IAuthForm) => {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          username: values.username,
          password: values.password,
        });

        if (result?.error) {
          toast.error("Something went wrong, please try again");
        } else {
          toast.success("Successfully signed in!");
          router.push("/posts");
        }
      } catch (err) {
        toast.error("An error occurred during sign-in.");
      }
    },
  });

  return (
    <div className="font-sans text-gray-900 antialiased">
      <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          <form onSubmit={formik.handleSubmit}>
            <div className="py-8">
              <center>
                <span className="text-2xl font-semibold">Sign in</span>
              </center>
            </div>
            <div>
              <label className="block font-medium text-sm text-gray-700" htmlFor="username" />
              <input
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="Username"
                required
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              />
            </div>
            <div className="mt-4">
              <label className="block font-medium text-sm text-gray-700" htmlFor="password" />
              <div className="relative">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                />
              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <Link href="/signup" className="">Sign Up</Link>

              <button
                type="submit"
                className="ms-4 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Sign In
              </button>
            </div>
            <Link href="/" className="underline flex justify-center mt-3">Back to Home</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
