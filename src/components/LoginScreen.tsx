"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import logo from "@/assets/Paisabank-logo.svg";
import { Checkbox } from "@/components/ui/Checkbox"
import type { JSX } from "react/jsx-runtime"
import Image from "next/image"
import { loginUser, type LoginRequest } from "@/services/auth"

interface LoginScreenProps {
  onLogin: (user: string, token: string) => void
}

interface LoginForm {
  email: string
  password: string
  remember: boolean
}

interface LoginState {
  loading: boolean
  error: string | null
}

export default function LoginScreen({ onLogin }: LoginScreenProps): JSX.Element {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
    remember: false,
  })


  const [loginState, setLoginState] = useState<LoginState>({
    loading: false,
    error: null,
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Limpiar error cuando el usuario empiece a escribir
    if (loginState.error) {
      setLoginState((prev) => ({ ...prev, error: null }))
    }
  }

  const handleCheckboxChange = (checked: boolean): void => {
    setForm((prev) => ({ ...prev, remember: checked }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
     // Validación básica
    if (!form.email || !form.password) {
      setLoginState({
        loading: false,
        error: "Por favor, completa todos los campos",
      })
      return
    }

    setLoginState({ loading: true, error: null })

    try {
      const credentials: LoginRequest = {
        email: form.email,
        password: form.password,
      }

      const response = await loginUser(credentials)
      console.log(response)
      if (response.success && response.data.name && response.data.token) {
        // Guardar token en localStorage si el usuario quiere ser recordado
        if (form.remember) {
          localStorage.setItem("paisabank_token", response.data.token)
          localStorage.setItem("paisabank_user", JSON.stringify(response.data.name))
        }
        // Llamar a la función onLogin con los datos del usuario
        onLogin(response.data.name, response.data.token);
        setLoginState({ loading: true, error: null })

      } else {
        setLoginState({
          loading: false,
          error: "Error en el inicio de sesión",
        })
      }
    } catch (error) {
      setLoginState({
        loading: false,
        error: error instanceof Error ? error.message : "Error de conexión",
      })
    }
  }

  return (
    <div className="flex flex-col h-screen">

      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6">
                <Image 
                    src={logo} 
                    alt="Paisabank Logo" 
                    width={70}
                    height={80} 
                />
          </div>
          <h2 className="text-3xl font-bold text-blue-600 mb-2">PaisaBank</h2>
          <p className="text-gray-500 max-w-xs mx-auto">
            Comienza a manejar tu vida financiera
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {loginState.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm text-center">{loginState.error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 font-heading">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Ingresa tu email"
              value={form.email}
              onChange={handleInputChange}
              className="h-12 text-base border-gray-200"
              disabled={loginState.loading}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <Input
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={form.password}
              onChange={handleInputChange}
              className="h-12 text-base border-gray-200"
              disabled={loginState.loading}
              required
            />
          </div>

          <div className="flex items-center space-x-3 py-2">
            <Checkbox
              id="remember"
              checked={form.remember}
              onCheckedChange={handleCheckboxChange}
              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              disabled={loginState.loading}
            />
            <label htmlFor="remember" className="text-sm text-base font-medium cursor-pointer">
              Recordarme
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 font-medium rounded-xl mt-40 secondary text-poppins font-semibold"
            disabled={loginState.loading}
          >
            Ingresar
          </Button>
        </form>
      </div>
    </div>
  )
}
