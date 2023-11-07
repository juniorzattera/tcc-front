"use client";
import "tailwindcss/tailwind.css";
import Login from "@/pages/login";

export default function Home() {
  return (
    <div className="flex flex-row ">
      <div className="flex-1 ">
        <Login />
      </div>
    </div>
  );
}
