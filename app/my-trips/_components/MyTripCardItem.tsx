import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Trip } from "../page";
import { ArrowBigRightIcon } from "lucide-react";
import axios from "axios";
import Link from "next/link";
type Props = {
    trip: Trip;
};
const MyTripCardItem = ({ trip }: Props) => {
    const [destinationImage, setDestinationImage] = useState("/placeholder.jpg");
    const [imageLoading, setImageLoading] = useState(false);

    useEffect(() => {
        trip?.tripDetail?.destination && GetDestinationImage();
    }, [trip]);

    const GetDestinationImage = async () => {
        setImageLoading(true);
        try {
            const result = await axios.post('/api/google-place-detail', {
                placeName: trip.tripDetail?.destination,
            });
            console.log(result)

            if (result.status === 200) {
                const imageUrl = result.data.imageUrl;
                setDestinationImage(imageUrl);
            }
        } catch (error) {
            console.error('Error fetching destination image:', error);
            setDestinationImage("/placeholder.jpg");
        } finally {
            setImageLoading(false);
        }
    };

    return (
        <Link
            href={`/view-trip/${trip?.tripId}`}
            className="p-4 shadow rounded-2xl hover:shadow-lg transition-all"
        >
            <div className="relative w-full aspect-[4/3]">
                <Image
                    src={destinationImage}
                    alt={trip?.tripDetail?.destination || trip.tripId}
                    fill
                    className="rounded-xl object-cover"
                    onError={() => setDestinationImage("/placeholder.jpg")}
                />
                {imageLoading && (
                    <div className="absolute inset-0 bg-gray-200 rounded-xl flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    </div>
                )}
            </div>

            <h2 className="flex flex-wrap items-center gap-2 font-semibold text-lg sm:text-xl mt-3">
                {trip?.tripDetail?.origin} <ArrowBigRightIcon className="h-5 w-5" /> {trip?.tripDetail?.destination}
            </h2>

            <h2 className="mt-1 text-gray-500 text-sm sm:text-base">
                {trip?.tripDetail?.duration} Trip with {trip?.tripDetail?.budget} Budget
            </h2>
        </Link>

    );
};

export default MyTripCardItem;