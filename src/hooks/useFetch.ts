import { useEffect, useState } from 'react'
import axios from 'axios'

export const useFetch = <T>(url: string, limit?: number, reload?: string) => {
    const [data, setData] = useState<T[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    console.log(url)

    useEffect(() => {
        const fetchData = async () => {
            const cancelToken = axios.CancelToken.source()
            setIsLoading(true)
            try {
                await new Promise((resolve) => setTimeout(resolve, 20))
                const response = await axios.get<T[]>(limit ? `${url}?_limit=${limit}` : url, {
                    cancelToken: cancelToken.token
                })

                if (response?.status !== 200) {
                    throw new Error(`Error: Request failed with status code: ${response.status}`)
                }

                console.log(response.data)
                setData(response.data)
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled:', err.message)
                } else {
                    setError(`Error fetching data, ${(err as Error).message}`)
                }
            } finally {
                setIsLoading(false)
            }
        }
        fetchData().catch((err) => console.error('Error fetching data', err.message))
    }, [url, limit, reload])

    return { data, error, isLoading }
}