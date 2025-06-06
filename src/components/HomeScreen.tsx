"use client"

import type { Screen, Transaction } from "@/types"
import { JSX, } from "react"
import Image from "next/image"
import MastercardIcon from "@/assets/Mastercard.svg"
import NavigationBar from "./NavigationBar/NavigationBar"
import TransactionRow from "./ui/TransactionRow"

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void
  currentScreen: Screen
  name: string
}

export interface homeCredentials {
  user: string
  token: string
}

const RECENT_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    name: "Adobe",
    description: "Pago de suscripción",
    amount: "$25",
    type: "SUS",
    date: "2024-01-15",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "2",
    name: "Camila Montenegro",
    description: "Pago recibido",
    amount: "$45",
    type: "CASH_IN",
    date: "2024-01-14",
    color: "bg-green-100 text-green-600",
  },
  {
    id: "3",
    name: "Figma",
    description: "Pago de suscripción",
    amount: "$25",
    type: "SUS",
    date: "2024-01-13",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "4",
    name: "Leonardo Echazu",
    description: "Pago enviado",
    amount: "$45",
    type: "CASH_OUT",
    date: "2024-01-12",
    color: "bg-orange-100 text-orange-600",
  },
]

export default function HomeScreen({ onNavigate, currentScreen, name }: HomeScreenProps): JSX.Element {
  return (
    <div className="flex flex-col h-screen bg-gray-50">

      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="mb-8">
          <p className="text-gray-500 text-sm mb-1">Hola</p>
          <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
        </div>

        {/* Credit Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 mb-8 text-white relative overflow-hidden shadow-lg">
          {/* Card decoration */}
          <div className="absolute top-4 right-4">
            <Image src={MastercardIcon} alt="Mastercard icon"/>
          </div>

          <div className="relative z-10">
            <div className="mb-6">
              <p className="text-sm font-medium mb-1">Balance</p>
              <p className="text-xl font-bold">934</p>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-xl mb-2 tracking-wider">**** **** **** 4567</p>
                <p className="text-md font-normal">{name}</p>
              </div>
              <div className="text-right">
                <p className="text-xs mb-1">Exp</p>
                <p className="text-sm">12/26</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Últimos movimientos</h3>
          <div>
            {RECENT_TRANSACTIONS.map((transaction) => (
              <div key={transaction.id}>
                <TransactionRow transactionDetail={transaction} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <NavigationBar onNavigate={onNavigate} currentScreen={currentScreen} />
    </div>
  )
}
