'use client'

import Link from 'next/link'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className='min-h-screen-58 w-full flex flex-col justify-center items-center'>
            <h2>Something went wrong!</h2>
            <h2 className='mb-8'>{error.toString()}</h2>
            <button
                className='border bg-primary text-primary-foreground border-primary px-4 py-2 rounded-lg mb-8 duration-200 transition-all hover:bg-black'
                onClick={
                    () => reset()
                }
            >
                Try again
            </button>
            <Link href="/" className='text-primary duration-200 hover:brightness-75'>return to home page</Link>
        </div>
    )
}