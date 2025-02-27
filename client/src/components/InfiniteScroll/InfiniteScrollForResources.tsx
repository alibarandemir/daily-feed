'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/Redux'
import React, { useEffect, useState } from 'react'
import ResourceCard from '../Card/ResourceCard'
import { Button, Spin } from 'antd'
import { getAllResources } from '@/stores/Resource/actions'

export default function InfiniteScrollForResources() {
    const dispatch = useAppDispatch()
    const { loading, hasMore, sources } = useAppSelector((state) => state.source)
    const [page, setPage] = useState(1)
   
    useEffect(() => {
        dispatch(getAllResources({ page }))
    }, [dispatch, page])

    const displayMore = () => {
        setPage((prev) => prev + 1)
    }

    return (
        <div className="w-full flex flex-col items-center px-4 sm:mt-5">
            {/* Flexbox ile responsive listeleme */}
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
                {sources.map((source) => (
                    <ResourceCard key={source.name} name={source.name} sourceImg={source.sourceImg}  />
                ))}
            </div>
            {hasMore ? (
                <Button onClick={displayMore} loading={loading} className="mt-6">
                    {loading ? <Spin /> : 'Daha fazla göster'}
                </Button>
            ) : (
                <p className="text-gray-400 text-lg mt-6">Daha fazla gösterilecek kaynak yok</p>
            )}
        </div>
    )
}
