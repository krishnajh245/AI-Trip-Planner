"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader, Send } from "lucide-react"
import axios from "axios"
import { useState, useRef, useEffect } from "react"
import EmptyState from "./EmptyState"
import GroupSize from "./GroupSize"
import Budget from "./Budget"
import SelectDays from "./SelectDays"
import Final from "./Final"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useTripDetail, useUserDetail } from "@/app/provider"
import { v4 as uuidv4 } from "uuid"

type Message = {
    role: string
    content: string
    ui?: string
}


export type TripInfo = {
    budget: string,
    destination: string,
    duration: string,
    group_size: string,
    origin: string,
    hotels: Hotel[],
    itinerary: Itinerary[]
}

export type Hotel = {
    hotel_name: string,
    hotel_address: string,
    price_per_night: string,
    hotel_image_url: string,
    geo_coordinates: {
        latitude: number,
        longitude: number
    },
    rating: number,
    description: string
}

export type Activity = {
    place_name: string,
    place_details: string,
    place_image_url: string,
    geo_coordinates: {
        latitude: number,
        longitude: number
    },
    place_address: string,
    ticket_price: string,
    time_travel_each_location: string,
    best_time_to_visit: string
}

export type Itinerary = {
    day: number,
    day_plan: string,
    best_time_to_visit_day: string,
    activities: Activity[];
}


const ChatBox = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [userInput, setUserInput] = useState<string>("")
    const bottomRef = useRef<HTMLDivElement>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [isFinal, setIsFinal] = useState<boolean>(false)
    const [tripDetail, setTripDetail] = useState<TripInfo>()
    const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail)
    const { userDetail, setUserDetail } = useUserDetail()
    // @ts-ignore
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail()
    const onSend = async () => {
        if (!userInput.trim()) return

        const newMsg: Message = {
            role: "user",
            content: userInput,
        }

        // adiciona mensagem do usuário localmente
        setMessages((prev: Message[]) => [...prev, newMsg])
        setUserInput("")

        try {
            setLoading(true)
            const res = await axios.post("/api/aimodel", {
                messages: [...messages, newMsg],
                isFinal: isFinal
            })


            const data = res.data
            console.log("Resposta do backend:", data)

            !isFinal && setMessages((prev: Message[]) => [
                ...prev,
                { role: "assistant", content: data?.resp ?? "Error: invalid response", ui: data.ui },
            ])
            setLoading(false)


            if (isFinal) {
                setTripDetail(data?.trip_plan)
                setTripDetailInfo(data?.trip_plan)
                const id = uuidv4()
                const result = await SaveTripDetail({
                    tripDetail: data?.trip_plan,
                    tripId: id,
                    uid: userDetail?._id
                })
            }
        } catch (err) {
            console.error("Erro na requisição:", err)
            setMessages((prev: Message[]) => [
                ...prev,
                { role: "assistant", content: " An error has ocorred." },
            ])
        }
    }

    const RenderGenerativeUI = (ui: string) => {
        switch (ui) {
            case "budget":
                return <Budget onSelectOption={(v: string) => { setUserInput(v); onSend() }} />
            case "groupSize":
                return <GroupSize onSelectOption={(v: string) => { setUserInput(v); onSend() }} />
            case "tripDuration":
                return <SelectDays onSelectOption={(v: string) => { setUserInput(v); onSend() }} />
            case "final":
                return <Final onSelectOption={() => { }} disable={!tripDetail} />
            default:
                break;
        }
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
        const lastMsg = messages[messages.length - 1];
        if (lastMsg?.ui == 'final') {
            setIsFinal(true);
            setUserInput('Ok,Great!')

        }
    }, [messages])

    useEffect(() => {
        if (isFinal && userInput) {
            onSend();
        }
    }, [isFinal]);
    return (
        <div className="h-[70vh] md:h-[80vh] flex flex-col">
            {messages?.length === 0 && (
                <EmptyState onSelectedOption={(value: string) => { setUserInput(value); onSend() }} />
            )}
            {/* Área das mensagens */}
            <section className="flex-1 overflow-y-auto px-2 sm:px-4">
                {messages.map((msg: Message, idx) =>
                    msg.role === "user" ? (
                        <div className="flex justify-end mt-2" key={idx}>
                            <div className="max-w-xs sm:max-w-md md:max-w-lg bg-primary text-white px-4 py-2 rounded-2xl whitespace-pre-wrap">
                                {msg.content}
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-start mt-2" key={idx}>
                            <div className="max-w-xs sm:max-w-md md:max-w-lg bg-gray-100 text-black px-4 py-2 rounded-2xl whitespace-pre-wrap">
                                {msg.content}
                                {RenderGenerativeUI(msg.ui ?? '')}
                            </div>
                        </div>
                    )
                )}
                {loading && <div className='flex justify-start mt-2'>
                    <div className='max-w-lg bg-gray-200 text-black px-4 py-2 rounded-lg'>
                        <Loader className='animate-spin' />
                    </div>
                </div>
                }
                <div ref={bottomRef} />
            </section>

            {/* Área de input */}
            <section className="p-2 sm:p-4">
                <div className="border rounded-2xl p-4 relative shadow-sm bg-white/80 backdrop-blur-sm">
                    <Textarea
                        placeholder="Start typing here"
                        className="w-full h-24 md:h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
                        onChange={(e) => setUserInput(e.target.value)}
                        value={userInput}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                onSend()
                            }
                        }}
                    />

                    <Button
                        size="icon"
                        disabled={!userInput.trim()}
                        className="absolute bottom-4 right-4 hover:scale-110 transition-transform"
                        onClick={onSend}
                    >
                        <Send className="h-4 w-4 rotate-45" />
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default ChatBox
