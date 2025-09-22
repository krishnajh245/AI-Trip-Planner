import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { auth, currentUser } from "@clerk/nextjs/server";
import { aj } from "@/lib/arcjet";

const PROMPT = `
You are an AI Trip Planner Agent.

⚠️ IMPORTANT: You must respond ONLY with a valid JSON object. 
Do not add greetings, explanations, or text outside of the JSON. 
No markdown fences, no commentary, no extra text.

Your goal is to ask one relevant trip-related question at a time, in this order:
1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip duration (number of days)
6. Travel interests (adventure, sightseeing, cultural, food, nightlife, relaxation)
7. Special requirements or preferences (if any)

Return responses strictly following this JSON schema:

{
  "resp": "Question or message to the user",
   "ui": "startingLocation | destination | groupSize | budget | tripDuration | interests | specialRequirements | final"
}
`;

const FINAL_PROMPT = ` Generate Travel Plan with give details, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place image Url, Geo Coordinates, Place address, ticket Pricing, Time travel each of the location, with each day plan with best time to visit in JSON format.
Output Schema:
{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_price": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}`


export async function POST(req: NextRequest) {
  const { messages, isFinal } = await req.json();
  const user = await currentUser()
  const { has } = await auth()
  const hasPremiumAccess = has({ plan: 'monthly' })
  const decision = await aj.protect(req, { userId: user?.primaryEmailAddress?.emailAddress ?? '', requested: isFinal ? 5 : 0 });

  if (decision.isDenied() && decision.reason.isRateLimit() && !hasPremiumAccess) {
    return NextResponse.json({
      resp: 'No free credit Remaining',
      ui: 'limit'
    })
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


    const chatHistory = messages
      .map((m: any) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n");

    const result = await model.generateContent(`${isFinal ? FINAL_PROMPT : PROMPT}\n\n${chatHistory}`);
    let text = result.response.text().trim();
    console.log(text)

    if (text.startsWith("```")) {
      text = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    }

    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (e) {
    console.error("Gemini error:", e);
    return NextResponse.json({ resp: "Something went wrong", ui: "" });
  }
}
