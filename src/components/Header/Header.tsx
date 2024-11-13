"use client"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation'
import { toast } from 'react-toastify';

export default function Header() {
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    redirect("/signin")
  }


  const handleSignUp = () => {
    redirect("/signup")

  }

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
    } catch (error) {
      toast.error("Error during sign-out");
    }
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex  justify-between items-center max-w-screen-xl">
          <div className="flex items-center lg:order-2">
            {status !== "loading" ? (
              session?.user ? (
                <button onClick={handleSignOut} className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                  Sign out
                </button>
              ) : (
                <>
                  <button onClick={handleSignIn} className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                    Log in
                  </button>
                  <button onClick={handleSignUp} className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                    Sign up
                  </button>
                </>
              )
            ) : (
              <button className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                Loading
              </button>
            )

            }

          </div>
          <div className="flex justify-center items-center lg:flex lg:w-auto lg:order-1" >
            <ul className="flex font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link href="/" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Home</Link>
              </li>
              <li>
                <Link href="/posts" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Posts</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav >
    </header >
  )
}
