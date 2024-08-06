import {useState} from "react";
import {ProductInterface} from "../types/Product.Interface.ts";
import axios, {AxiosError} from "axios";

export const useAdd = (url: string) => {
    const [error, setError] = useState<string | null>(null)
    const add = async (product: Partial<ProductInterface>) => {
        try {
            const response = await axios.post(url, product)
            return response.data
        } catch (err: unknown) {
            setError(`Error: ${(err as AxiosError).message}`)
        }
    }
    return {error, add}
}