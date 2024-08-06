import { useEffect, useState } from "react"
import axios from "axios"

export const useFetch = <T>(url: string, limit?: number, reload?: string) => {
    const [data, setData] = useState<T[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchData = async () => {
            setIsLoading(true)
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const response = await axios.get<T[]>(limit ? `${url}?_limit=${limit}` : url, {
                    cancelToken: cancelToken.token,
                })
                if (response.status !== 200) {
                    throw new Error(`Помилка завантаження постів: ${response.status}`)
                }
                setData(response.data)
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Запит на отримання постів було скасовано')
                } else {
                    setError(`Помилка завантаження постів: ${(err as Error).message}`)
                }
                setData([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData().catch((err) => console.error('Помилка завантаження постів:', err.message))

        return () => {
            cancelToken.cancel()
        };
    }, [url, limit, reload])

    return { data, error, isLoading }
}