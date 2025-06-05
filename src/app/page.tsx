"use client"

import { JSX, useState } from "react"
import LoginScreen from "@/components/LoginScreen"
import HomeScreen from "@/components/HomeScreen"
import MovementsScreen from "@/components/MovementsScreen"
import type { Screen, User } from "@/types"

export default function PaisBankApp(): JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login")
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const [user] = useState<User>({
    name: "Paisanx",
    balance: 978.85,
    cardNumber: "1234",
    expiryDate: "02/26",
  })

  const handleLogin = (): void => {
    setIsLoggedIn(true)
    setCurrentScreen("home")
  }

  const handleNavigation = (screen: Screen): void => {
    if (isLoggedIn) {
      setCurrentScreen(screen)
    }
  }

  return (
    <div className="min-h-screen app-bg">
      <div className="max-w-sm mx-auto min-h-screen relative">
        {currentScreen === "login" && <LoginScreen onLogin={handleLogin} />}
        {currentScreen === "home" && (
          <HomeScreen onNavigate={handleNavigation} currentScreen={currentScreen} user={user} />
        )}
        {currentScreen === "movements" && (
          <MovementsScreen onNavigate={handleNavigation} currentScreen={currentScreen} />
        )}
      </div>
    </div>
  )
}
