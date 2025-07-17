import React from 'react'
import { ProfileForm } from "@/components/profile";

type Props = {}

const page = (props: Props) => {
  return (
    <div className="flex flex-col bg-amber-100 items-center justify-center min-h-screen p-4">
         <ProfileForm/>
    </div>
  )
}

export default page