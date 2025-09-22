"use client"
import { Button } from "@/components/ui/button"
import { Star, Wallet } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Hotel } from "./ChatBox"
import { useEffect, useState } from "react"
import axios from "axios"

type Props = {
  hotel: Hotel
}

const HotelCardItem = ({ hotel }: Props) => {
  const [hotelImage, setHotelImage] = useState("/placeholder.jpg")
  const [imageLoading, setImageLoading] = useState(false)

  useEffect(() => {
    if (hotel) fetchHotelImage()
  }, [hotel])

  const fetchHotelImage = async () => {
    setImageLoading(true)
    try {
      const result = await axios.post("/api/google-place-detail", {
        placeName: hotel?.hotel_name
      })
      setHotelImage(result.data.imageUrl || "/placeholder.jpg")
    } catch (error) {
      console.error("Error fetching place details:", error)
      setHotelImage("/placeholder.jpg")
    } finally {
      setImageLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <Image
          src={hotelImage}
          alt={hotel?.hotel_name}
          width={400}
          height={200}
          className="rounded-xl shadow object-cover mb-2"
          onError={() => setHotelImage("/placeholder.jpg")}
        />
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 rounded-xl flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
      <h3 className="font-semibold">{hotel.hotel_name}</h3>
      <h4 className="text-gray-500">{hotel.hotel_address}</h4>
      <div className="flex justify-between items-center">
        <p className="flex gap-2 text-green-600">
          <Wallet />{hotel.price_per_night}
        </p>
        <p className="text-yellow-500 flex gap-2">
          <Star />{hotel.rating}
        </p>
      </div>
      <Link href={"https://www.google.com/maps/search/?api=1&query=" + hotel?.hotel_name} target="_blank">
        <Button variant="outline" className="mt-1 w-full">View</Button>
      </Link>
    </div>
  )
}

export default HotelCardItem
