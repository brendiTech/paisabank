"use client"

import { useState, useMemo, type ChangeEvent, JSX } from "react"
import { Search, FileText } from "lucide-react"
import { Input } from "@/components/ui/Input"
import type { Screen, Transaction, FilterType } from "@/types"
import NavigationBar from "./NavigationBar/NavigationBar"
import TransactionRow from "./ui/TransactionRow"

interface MovementsScreenProps {
  onNavigate: (screen: Screen) => void
  currentScreen: Screen
}

const ALL_TRANSACTIONS: Transaction[] = [
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
  {
    id: "5",
    name: "Martín Bozzini",
    description: "Pago recibido",
    amount: "$65",
    type: "CASH_IN",
    date: "2024-01-11",
    color: "bg-green-100 text-green-600",
  },
  {
    id: "6",
    name: "Leonardo Echazu",
    description: "Pago enviado",
    amount: "$25",
    type: "CASH_OUT",
    date: "2024-01-10",
    color: "bg-orange-100 text-orange-600",
  },
]

const FILTERS: FilterType[] = ["Todos", "Débito Aut.", "Recibido", "Enviado"]

export default function MovementsScreen({ onNavigate, currentScreen }: MovementsScreenProps): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Todos")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value)
  }

  const filteredTransactions = useMemo((): Transaction[] => {
    let filtered = ALL_TRANSACTIONS

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by type
    if (activeFilter !== "Todos") {
      filtered = filtered.filter((transaction) => {
        switch (activeFilter) {
          case "Débito Aut.":
            return transaction.type === "SUS"
          case "Recibido":
            return transaction.type === "CASH_IN"
          case "Enviado":
            return transaction.type === "CASH_OUT"
          default:
            return true
        }
      })
    }

    return filtered
  }, [searchQuery, activeFilter])

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-100">
        <h1 className="text-xl font-medium text-gray-900 mb-6 text-base">Movimientos</h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Ingresa un nombre o servicio"
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-12 h-12 bg-gray-50 border-gray-200 rounded-2xl text-base focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        {filteredTransactions.length > 0 ? (
          <div>
            {filteredTransactions.map((transaction) => (
                <div key={transaction.id}>
                  <TransactionRow transactionDetail={transaction} />
                </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-center">No se encontraron movimientos</p>
          </div>
        )}
      </div>

      <NavigationBar onNavigate={onNavigate} currentScreen={currentScreen} />
    </div>
  )
}
