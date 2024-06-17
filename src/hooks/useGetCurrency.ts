/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Currency } from '../components/Dropdown'
import {getCurrency} from '../api/currency'
import { toast } from 'react-toastify';

interface HooksReturn {
    currency: Currency[]
    handleGetCurrency: (cb?: (e?: any) => void) => Promise<void>
}

const useGetCurrency = (): HooksReturn => {
  const [currency, setCurrency] = useState<Currency[]>([])


  const handleGetCurrency = async (
    cb?: (e?: any) => void
  ) => {
    try {
        const data = await getCurrency()
        if (data) {
            setCurrency(data?.map((v: Currency) => {
                v.icon = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${v.currency}.svg`
                if (v.currency === "STEVMOS") {
                    v.icon = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/stEVMOS.svg`
                }
                if (v.currency === "RATOM") {
                    v.icon = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/rATOM.svg`
                }
                if (v.currency === "STOSMO") {
                    v.icon = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/stOSMO.svg`
                }
                if (v.currency === "STATOM") {
                    v.icon = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/stATOM.svg`
                }
                if (v.currency === "STLUNA") {
                    v.icon = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/stLUNA.svg`
                }
                return v
            }))
            toast.success('successfully')
        }
    } catch (err: any) {
        const data = await err?.response?.json()
        setCurrency([])
        toast.error(data?.message || 'Somthing went wrong')
    }
  }

  useEffect(() => {
    handleGetCurrency()
  }, [])

  return { currency, handleGetCurrency }
}

export default useGetCurrency
