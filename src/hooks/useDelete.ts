import {useState} from "react";
import axios, {AxiosError} from "axios";

export const useDelete = (url: string) => {
    const [error, setError] = useState<string | null>(null)

    const del = async (id: string) => {
        try {
            const response = await axios.delete(`${url}/${id}`)
            console.log(response.data)
        } catch (err: unknown) {
            setError((err as AxiosError).message)
        }
    }

    return {del, error}
}