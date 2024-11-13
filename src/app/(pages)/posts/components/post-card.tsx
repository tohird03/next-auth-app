"use client"

type Props = {
  title: string,
  body: string,
  fullname?: string,
  footer?: React.ReactNode,
}

export default function PostCard({title, body, fullname, footer}: Props) {
  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-[350px]">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
        {body}
      </p>

      {footer}
      {fullname}
    </div>

  )
}
