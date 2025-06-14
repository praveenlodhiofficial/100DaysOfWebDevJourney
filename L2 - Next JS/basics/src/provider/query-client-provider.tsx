'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"

export default function ClientProvider({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState(
        () => new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                    staleTime: 1000 * 60 * 5,
                    gcTime: 1000 * 60 * 10,
                }
            }
        })
    )

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} /> 
        </QueryClientProvider>
    )

}
