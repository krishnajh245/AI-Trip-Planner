"use client"
import { Button } from "@/components/ui/button"
import { Clock, ExternalLink, Ticket } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Activity } from "./ChatBox"
import { useEffect, useState } from "react"
import axios from "axios"

type Props = {
  activity: Activity
}

const PlaceCardItem = ({ activity }: Props) => {
  const [placeImage, setPlaceImage] = useState("/placeholder.jpg")
  const [imageLoading, setImageLoading] = useState(false)

  useEffect(() => {
    if (activity) fetchPlaceImage()
  }, [activity])

  const fetchPlaceImage = async () => {
    setImageLoading(true)
    try {
      const result = await axios.post("/api/google-place-detail", {
        placeName: activity?.place_name
      })
      setPlaceImage(result.data.imageUrl || "/placeholder.jpg")
    } catch (error) {
      console.error("Error fetching place details:", error)
      setPlaceImage("/placeholder.jpg")
    } finally {
      setImageLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Image
          src={placeImage}
          alt={activity.place_name}
          width={400}
          height={200}
          className="object-cover rounded-xl"
          onError={() => setPlaceImage("/placeholder.jpg")}
        />
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 rounded-xl flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
      <h2 className="font-semibold text-lg">{activity.place_name}</h2>
      <p className="text-gray-500 line-clamp-2">{activity.place_details}</p>
      <h3 className="flex gap-2 text-blue-500 line-clamp-1">
        <Ticket /> {activity.ticket_price}
      </h3>
      <p className="flex text-orange-400 gap-2">
        <Clock /> {activity.best_time_to_visit}
      </p>
      <Link
        href={"https://www.google.com/maps/search/?api=1&query=" + activity?.place_name}
        target="_blank"
      >
        <Button size="sm" variant="outline" className="w-full mt-2">
          View <ExternalLink />
        </Button>
      </Link>
    </div>
  )
}

export default PlaceCardItem
