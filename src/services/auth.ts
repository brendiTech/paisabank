import { config } from "@/config/config"

// Tipos para la API de autenticación
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  data: {
    name:string,
    token: string
  }
}

export interface ApiError {
  success: false
  error: string
}


// Función para hacer login
export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await fetch(`${config.urlApi}/paisabank/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || data.error)
    }
    localStorage.setItem("paisabank_token", data.token)
    localStorage.setItem("paisabank_user", JSON.stringify(data.name))
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Error de conexión con el servidor")
  }
}

// Función para verificar si el token es válido 
export async function verifyToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${config.urlApi}/auth/verify`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })

    return response.ok
  } catch (error) {
    console.log(error)
    return false
  }
}
