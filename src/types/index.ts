
export interface Card {
  id: string
  cardNumber: string
  issuer: 'VISA' | 'MASTERCARD'
  expDate: Date
  balance: string
  userId: string
  user: User
}

export interface Transaction {
  id: string
  name: string
  description: string
  amount: string
  type: "CASH_IN" | "CASH_OUT" | "SUS"
  date: string
  color: string
}

export interface User {
  id: string
  name: string
  email: string
  balance: number
  cardNumber: string
  expiryDate: string
}

export type Screen = "login" | "home" | "movements"
export type FilterType = "Todos" | "Débito Aut." | "Recibido" | "Enviado"


export interface AuthState {
  isLoggedIn: boolean
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}