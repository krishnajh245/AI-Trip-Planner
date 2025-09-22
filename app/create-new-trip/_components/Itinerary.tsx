"use client"
import { Timeline } from '@/components/ui/timeline';
import React, { useEffect, useState } from 'react'
import { Hotel, TripInfo } from './ChatBox';
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';




const Itinerary = () => {
    // @ts-ignore 
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
    const [tripData, setTripData] = useState<TripInfo | null>(null);
    useEffect(() => {
        tripDetailInfo && setTripData(tripDetailInfo);
    }, [tripDetailInfo])
    const data = tripData ? [
        {
            title: "Recommended  Hotels",
            content: (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4' >
                    {tripData.hotels.map((hotel: Hotel, idx) => (
                        <HotelCardItem hotel={hotel} key={idx} />
                    ))}
                </div>
            ),
        },
        ...tripData.itinerary.map((dayData) => ({
            title: `Day ${dayData.day}`,
            content: (
                <div>
                    <p>Best Time: {dayData.best_time_to_visit_day}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {dayData.activities.map((activity, idx) => (
                            <PlaceCardItem activity={activity} key={idx} />
                        ))}
                    </div>
                </div>
            )
        }))

    ] : [];
    return (
        <div className="relative w-full h-[83vh] overflow-auto">
            {tripData ? <Timeline data={data} tripData={tripData} />
                :
                <div className="relative">
                    <h2 className="flex gap-2 text-3xl text-white items-center absolute left-5 bottom-8"><ArrowLeft /> Getting to know you to build perfect trip here...</h2>

                    <Image src={'/travel.png'} alt="travel" width={800} height={600}
                        className="w-full h-[83vh] object-cover rounded-3xl"></Image>
                </div>
            }
        </div>
    )
}

export default Itinerary