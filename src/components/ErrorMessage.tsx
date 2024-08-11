import { ReactNode } from "react"

type ErrorMessageProsp = {
    children: ReactNode
}

export default function ErrorMessage({children} : ErrorMessageProsp) {
  return (
    <p className="bg-red-500 p-2 text-center text-sm font-bold text-white">
        {children}
    </p>
  )
}
