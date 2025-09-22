'use client'
import GlobalMap from '@/app/create-new-trip/_components/GlobalMap'
import Itinerary from '@/app/create-new-trip/_components/Itinerary'
import { Trip } from '@/app/my-trips/page'
import { useTripDetail, useUserDetail } from '@/app/provider'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ViewTrip = () => {
  const { tripid } = useParams()
  const { userDetail } = useUserDetail()
  const convex = useConvex()
  const [tripData, setTripData] = useState<Trip>()
  const tripContext = useTripDetail()
  const tripDetailInfo = tripContext?.tripDetailInfo
  const setTripDetailInfo = tripContext?.setTripDetailInfo

  useEffect(() => {
    userDetail && GetTrip()
  }, [userDetail])

  const GetTrip = async () => {
    const result = await convex.query(api.tripDetail.GetTripById, {
      uid: userDetail?._id,
      tripid: tripid + '',
    })
    setTripData(result)
    setTripDetailInfo?.(result?.tripDetail)
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
      {/* Itinerary Section */}
      <div className="md:col-span-3 order-2 md:order-1">
        <Itinerary />
      </div>

      {/* Map Section */}
      <div className="md:col-span-2 order-1 md:order-2">
        <GlobalMap />
      </div>
    </div>
  )
}

export default ViewTrip
