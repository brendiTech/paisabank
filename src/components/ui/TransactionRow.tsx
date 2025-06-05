"use client"

import type { Transaction } from "@/types"
import { JSX } from "react"
import Image from "next/image"
import ArrowUp from "@/assets/arrow-up.svg"
import ArrowDown from "@/assets/arrow-down.svg"
import SubsIcon from "@/assets/Subs.svg"

const handleIcon = (type: unknown) => {
  switch (type) {
    case 'subs':
      return SubsIcon
    break;
  
    case 'cash-in':
      return ArrowDown
    break;

    case 'cash-out':
      return ArrowUp
    break;

    default: 
      return SubsIcon
    break;
  }
}

export default function TransactionRow({transactionDetail}): JSX.Element {
  return (
    <div className="bg-gray-50">
      <div className="py-2 overflow-y-auto">
            <div
                key={transactionDetail.id}
                className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-50"
            >
            <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center color-${transactionDetail.type}`}>
                    <Image src={handleIcon(transactionDetail.type)} alt="Transaction icon" />
                </div>
                <div>
                    <p className="font-semibold text-gray-900 text-base">{transactionDetail.name}</p>
                    <p className="text-sm text-gray-500">{transactionDetail.description}</p>
                </div>
            </div>
            <p className={`font-normal text-base color-${transactionDetail.type} bg-white`}>{transactionDetail.amount}</p>
            </div>
          </div>
      </div>
  )
}
