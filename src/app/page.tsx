"use client"

import { JSX, useState, useEffect } from "react"
import LoginScreen from "@/components/LoginScreen"
import HomeScreen from "@/components/HomeScreen"
import MovementsScreen from "@/components/MovementsScreen"
import type { Screen } from "@/types"

export default function PaisaBankApp(): JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login")
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const [user, setUser] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  // Verificar si hay una sesión guardada al cargar la app
  useEffect(() => {
    const savedToken = localStorage.getItem("paisabank_token")
    const savedUser = localStorage.getItem("paisabank_user")

    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        setToken(savedToken)
        setIsLoggedIn(true)
        setCurrentScreen("home")
      } catch (error) {
        // Si hay error al parsear, limpiar localStorage
        console.log(error)
        localStorage.removeItem("paisabank_token")
        localStorage.removeItem("paisabank_user")
      }
    }
  }, [])

  const handleLogin = (userData: string, userToken: string): void => {
    setUser(userData)
    setToken(userToken)
    setIsLoggedIn(true)
    setCurrentScreen("home")
  }

  const handleNavigation = (screen: Screen): void => {
    if (isLoggedIn) {
      setCurrentScreen(screen)
    }
    if (screen === "login") {
      setIsLoggedIn(false)
      setUser(null)
      setToken(null)
      // Limpiar localStorage
      localStorage.removeItem("paisabank_token")
      localStorage.removeItem("paisabank_user")
    }
    setCurrentScreen(screen)
  }

  return (
    <div className="min-h-screen app-bg">
      <div className="max-w-sm mx-auto min-h-screen relative">
        {currentScreen === "login" && <LoginScreen onLogin={handleLogin} />}
        {currentScreen === "home" && user && (
          <HomeScreen onNavigate={handleNavigation} currentScreen={currentScreen} name={user} />
        )}
        {currentScreen === "movements" && (
          <MovementsScreen onNavigate={handleNavigation} currentScreen={currentScreen} />
        )}
      </div>
    </div>
  )
}
