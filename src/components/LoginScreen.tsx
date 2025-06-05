"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import logo from "@/assets/Paisabank-logo.svg";
import { Checkbox } from "@/components/ui/Checkbox"
import type { JSX } from "react/jsx-runtime"
import Image from "next/image"

interface LoginScreenProps {
  onLogin: () => void
}

interface LoginForm {
  email: string
  password: string
  remember: boolean
}

export default function LoginScreen({ onLogin }: LoginScreenProps): JSX.Element {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
    remember: false,
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean): void => {
    setForm((prev) => ({ ...prev, remember: checked }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    onLogin()
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
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 font-heading">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Ingresa tu email"
              value={form.email}
              onChange={handleInputChange}
              className="h-12 text-base border-gray-200"
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
              required
            />
          </div>

          <div className="flex items-center space-x-3 py-2">
            <Checkbox
              id="remember"
              checked={form.remember}
              onCheckedChange={handleCheckboxChange}
              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <label htmlFor="remember" className="text-sm text-base font-medium cursor-pointer">
              Recordarme
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 font-medium rounded-xl mt-40 secondary text-poppins font-semibold"
          >
            Ingresar
          </Button>
        </form>
      </div>
    </div>
  )
}
