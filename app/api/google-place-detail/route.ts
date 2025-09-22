import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const BASE_URL = "https://places.googleapis.com/v1/places:searchText";
  const { placeName } = await req.json();

  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": process.env.GOOGLE_PLACE_API_KEY!,
      "X-Goog-FieldMask": "places.photos,places.displayName,places.id"
    }
  };

  try {
    const res = await axios.post(BASE_URL, { textQuery: placeName }, config);
    const places = res.data.places;

    if (!places || places.length === 0) {
      return NextResponse.json({ imageUrl: "/placeholder.jpg" });
    }

    const photoName = places[0]?.photos?.[0]?.name;

    if (!photoName) {
      return NextResponse.json({ imageUrl: "/placeholder.jpg" });
    }

    const photoUrl = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=1000&maxWidthPx=1000&key=${process.env.GOOGLE_PLACE_API_KEY}`;

    return NextResponse.json({ imageUrl: photoUrl });
  } catch (error) {
    console.error("Google API error:", error);
    return NextResponse.json({ imageUrl: "/placeholder.jpg" });
  }
}
