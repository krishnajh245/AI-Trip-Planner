"use client"
import HeroVideoDialog from '@/components/magicui/hero-video-dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs'
import { ArrowDown, Car, Globe2, Landmark, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
export const suggestions = [
    {
      title: "Plan a 5-day trip to Japan in April",
      icon: <Globe2 className="text-blue-400 h-5 w-5" />
    },
    {
      title: "Weekend getaway in Rome",
      icon: <Landmark className="text-orange-500 h-5 w-5" />
    },
    {
      title: "Road trip across California",
      icon: <Car className="text-green-500 w-5 h-5" />
    }
  ]

const Hero = () => {


  const router = useRouter()
  const {user} = useUser()

  const onSend = () => {
    if(!user){
      router.push('/sign-in')
      return
    }
    router.push('/create-new-trip')
  }
  return (
    <section className="mt-24 flex justify-center px-4">
      <div className="max-w-4xl w-full text-center space-y-6">

        {/* Título */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Hey, I'm your personal <span className="text-primary">Trip Planner</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
          Tell me what you want, and I'll handle the rest: flights, hotels, and trip planning — all in seconds.
        </p>

        {/* Caixa de input */}
        <div className="border rounded-2xl p-4 relative shadow-sm bg-white/80 backdrop-blur-sm">
          <Textarea
            placeholder="Create a trip for Paris from New York"
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
          />

          <Button
            size="icon"
            className="absolute bottom-4 right-4 hover:scale-110 transition-transform"
            onClick={() => onSend()}
          >
            <Send className="h-4 w-4 rotate-45" />
          </Button>
        </div>

        {/* Lista de sugestões */}
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {suggestions.map((suggestion, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 border rounded-full py-1.5 px-3 cursor-pointer 
                         hover:bg-secondary hover:scale-105 transition-transform whitespace-nowrap"
            >
              {suggestion.icon}
              <span className="text-sm">{suggestion.title}</span>
            </div>
          ))}
        </div>

        <h2 className='my-7 mt-14 flex gap-2 text-center'>Not sure where to start? <strong>See how it works</strong><ArrowDown /> </h2>
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.example.com/dummy-video"
          thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
          thumbnailAlt="Dummy Video Thumbnail"
        />

      </div>
    </section>
  )
}

export default Hero
