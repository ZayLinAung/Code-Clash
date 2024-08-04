"use client";
import { useUser } from '@auth0/nextjs-auth0/client'
import "./styles.css";
import React from "react";

export default function NavBar() {
  const { user, isLoading } = useUser()

  return (
    <div className="flex flex-row p-[110px]">
      <div className="flex-1 flex flex-col gap-[90px]">
      <div className="font-roboto leading-[84px] text-[64px] font-extrabold">
  Welcome to the Coding <span className="text-red-500">Clash!</span>
</div>



<div className="font-roboto leading-[34px] font-normal text-[24px]">
Welcome to Code Clash, the ultimate 1v1 coding showdown! Compete to solve a competitive programming in real time!
</div>
<div>
  <nav>
    {!isLoading && !user && (
      <a href="/api/auth/login?returnTo=/landing" className="font-roboto text-[18px] leading-[20px] border-2 border-black rounded-3xl p-[15px] text-white bg-black">
        Login
      </a>
    )}
    {user && (
      <a href="/api/auth/logout" className="font-roboto text-[18px] leading-[20px] border-2 border-black rounded-3xl p-[15px] text-white bg-black">
        Logout
      </a>
    )}
  </nav>
</div>

      </div>
      <div className="flex-1">
      <iframe className = "w-[100%] h-[100%]" src="https://lottie.host/embed/a01eecde-e637-490e-a575-cff1017240cb/T4NEIqt2PM.json"></iframe>
      </div>
    </div>
    
  )
}