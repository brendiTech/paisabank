"use client"

import { JSX } from "react"
import type { Screen } from "@/types"
import Image from "next/image"
import HomeIcon from "@/assets/Home.svg"
import Document from "@/assets/Document.svg"

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void
  currentScreen: Screen
}

export default function NavigationBar({ onNavigate, currentScreen }: HomeScreenProps): JSX.Element {
  return (
      <div className="bg-white border-t border-gray-100 px-6 py-3 safe-area-pb rounded-t-xl">
        <div className="flex justify-around">
          <button
            onClick={() => onNavigate("home")}
            className={`p-3 rounded-2xl transition-colors ${
              currentScreen === "home" ? "bg-blue-100" : "hover:bg-gray-50"
            }`}
            aria-label="Home"
          >
            <Image src={HomeIcon} alt="Home icon" className={`w-6 h-6 ${currentScreen === "home" ? "text-blue-600" : "text-gray-400"}`}/>
          </button>
          <button
            onClick={() => onNavigate("movements")}
            className={`p-3 rounded-2xl transition-colors ${
              currentScreen === "movements" ? "bg-blue-100" : "hover:bg-gray-50"
            }`}
            aria-label="Movements"
          >
            <Image src={Document} alt="Movements icon" className={`w-6 h-6 ${currentScreen === "movements" ? "text-blue-600" : "text-gray-400"}`}/>
          </button>
          <button
            onClick={() => onNavigate("login")}
            className={"p-3 rounded-2xl transition-colors hover:bg-gray-50"}
            aria-label="Settings"
          >
            <Image src={Document} alt="Logout icon" className={"w-6 h-6 text-gray-400"}/>
          </button>
        </div>
      </div>
  )
}
