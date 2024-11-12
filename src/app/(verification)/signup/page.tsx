"use client"

import { IAuthForm, ISignUpForm } from "@/types/dto/auth";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignIn() {
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      fullname: '',
      username: '',
      password: '',
    },
    onSubmit: async (values: ISignUpForm) => {
      toast.error("Smth wrong, please try again");

      // try {
      //   toast.error("Smth wrong, please try again");

      //   const result = await signIn("Credentials", { redirect: false });
      //   if (result?.error) {
      //     setError("GitHub orqali tizimga kira olmadim.");
      //     setError("Ro'yxatdan o'tishda xatolik yuz berdi.");
      //     toast.error("Smth wrong, please try again");

      //   } else {
      //     console.log("Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi");
      //     toast.error("Smth wrong, please try again");

      //   }
      // } catch (err) {
      //   setError("Ro'yxatdan o'tishda xatolik yuz berdi.");
      //   toast.error("Smth wrong, please try again");
      // }
    }
  });
  return (
    <>
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
                <label className="block font-medium text-sm text-gray-700" htmlFor="fullname" />
                <input type='Full Name'
                  name='fullname'
                  onChange={formik.handleChange}
                  value={formik.values.fullname}
                  placeholder='Fullname'
                  required
                  className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                />
              </div>

              <div className="mt-4">
                <label className="block font-medium text-sm text-gray-700" htmlFor="username" />
                <input type='username'
                  name='username'
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder='Username'
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
                    className='w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]' />
                </div>
              </div>

              <div className="flex items-center justify-end mt-4">
                <button className='ms-4 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'>
                  Sign in
                </button>

              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}
