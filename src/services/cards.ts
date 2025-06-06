import { homeCredentials } from "@/components/HomeScreen"
import { config } from "@/config/config"

// Tipos para la API de cards

export interface CardsResponse {
    id: string
    issuer: 'VISA' | 'MASTERCARD',
    name: string,
    expDate: string,
    lastDigits: number,
    balance: string,
    currency: string
}

export interface ApiError {
  success: false
  error: string
}

export async function getCards(credentials: homeCredentials): Promise<CardsResponse[]> {
  try {
    const response = await fetch(`${config.urlApi}/paisabank/cards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': credentials.token,
      },
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || data.error)
    }
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Error de conexión con el servidor")
  }
}
