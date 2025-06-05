export interface Transaction {
  id: string
  name: string
  description: string
  amount: string
  type: "cash-in" | "cash-out" | "subs" | "transfer"
  date: string
  color: string
}

export interface User {
  name: string
  balance: number
  cardNumber: string
  expiryDate: string
}

export type Screen = "login" | "home" | "movements"
export type FilterType = "Todos" | "Débito Aut." | "Recibido" | "Enviado"
