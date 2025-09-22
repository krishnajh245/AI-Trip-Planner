'use client'
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useUserDetail } from '../provider';
import { TripInfo } from '../create-new-trip/_components/ChatBox';
import { ArrowBigRightIcon } from 'lucide-react';
import Image from 'next/image';
import MyTripCardItem from './_components/MyTripCardItem';

export type Trip = {
    tripId: any,
    tripDetail: TripInfo,
    _id: string
}

const MyTrips = () => {
    const [myTrips, setMyTrips] = useState<Trip[]>([]);
    const { userDetail, setUserDetail } = useUserDetail();
    const convex = useConvex();

    useEffect(() => {
        userDetail && GetUserTrip();
    }, [userDetail])

    const GetUserTrip = async () => {
        const result = await convex.query(api.tripDetail.GetUserTrips,
            { uid: userDetail?._id }
        )
        setMyTrips(result);

    }
    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-10">
            <h2 className="font-bold text-2xl sm:text-3xl">My Trips</h2>

            {myTrips?.length === 0 && (
                <div className="p-6 border rounded-2xl flex flex-col items-center justify-center gap-5 mt-6 text-center">
                    <h2 className="text-gray-600 text-lg">You don't have any trip plan created!</h2>
                    <Link href="/create-new-trip">
                        <Button>Create New Trip</Button>
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {myTrips?.map((trip, index) => (
                    <MyTripCardItem trip={trip} key={index} />
                ))}
            </div>
        </div>


    )
}

export default MyTrips