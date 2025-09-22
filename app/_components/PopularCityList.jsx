"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-10 md:py-20">
      <h2 className="max-w-7xl mx-auto text-center md:text-left pl-0 md:pl-4 text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Popular Destinations to Visit
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = ({ title, highlights, tip, image }) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-10 rounded-3xl mb-4 hover:scale-105 transition-transform duration-300">
      <h3 className="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-3">
        {title}
      </h3>
      <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400 text-sm md:text-lg">
        {highlights.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <p className="mt-4 text-sm italic text-neutral-500 dark:text-neutral-400">
        💡 {tip}
      </p>
      <img
        src={image}
        alt={title}
        className="mt-6 md:w-1/2 w-full  mx-auto rounded-xl object-cover shadow-md"
      />
    </div>
  );
};

const data = [
  {
    category: "Paris, France",
    title: "Explore the City of Lights – Eiffel Tower, Louvre & more",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",
    content: (
      <DummyContent
        title="3-Day Paris Itinerary"
        highlights={[
          "Day 1: Eiffel Tower, Seine River Cruise, Montmartre",
          "Day 2: Louvre Museum, Notre-Dame, Latin Quarter",
          "Day 3: Versailles Palace & Gardens"
        ]}
        tip="Buy tickets online for the Eiffel Tower to skip long queues."
        image="https://images.unsplash.com/photo-1507666664345-c49223375e33?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    ),
  },
  {
    category: "New York, USA",
    title: "Experience NYC – Times Square, Central Park, Broadway.",
    src: "https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?q=80&w=1170&auto=format&fit=crop",
    content: (
      <DummyContent
        title="5-Day New York Highlights"
        highlights={[
          "Day 1: Times Square & Broadway Show",
          "Day 2: Central Park & Museum Mile",
          "Day 3: Statue of Liberty & Ellis Island",
          "Day 4: Brooklyn Bridge & DUMBO",
          "Day 5: 9/11 Memorial & One World Observatory"
        ]}
        tip="Get a MetroCard for unlimited subway rides — cheapest way to explore."
        image="https://images.unsplash.com/photo-1627607502033-3e3637d2b77f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    ),
  },
  {
    category: "Tokyo, Japan",
    title: "Discover Tokyo – Shibuya, Cherry Blossoms, Temples.",
    src: "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=735&auto=format&fit=crop",
    content: (
      <DummyContent
        title="7-Day Tokyo & Beyond"
        highlights={[
          "Day 1-2: Shibuya Crossing, Harajuku, Meiji Shrine",
          "Day 3: Asakusa & Senso-ji Temple",
          "Day 4: Day trip to Nikko",
          "Day 5: Tsukiji Fish Market & Odaiba",
          "Day 6-7: Kyoto or Hakone excursion"
        ]}
        tip="Buy a Suica card for easy train and bus travel."
        image="https://images.unsplash.com/photo-1549693578-d683be217e58?q=80&w=800"
      />
    ),
  },
  {
    category: "Rome, Italy",
    title: "Walk through History – Colosseum, Vatican, Roman Forum",
    src: "https://plus.unsplash.com/premium_photo-1675975678457-d70708bf77c8?q=80&w=1170&auto=format&fit=crop",
    content: (
      <DummyContent
        title="4-Day Rome Adventure"
        highlights={[
          "Day 1: Colosseum, Roman Forum & Palatine Hill",
          "Day 2: Vatican Museums & St. Peter's Basilica",
          "Day 3: Pantheon, Trevi Fountain, Spanish Steps",
          "Day 4: Trastevere neighborhood & local cuisine"
        ]}
        tip="Book Vatican tickets in advance to avoid long waits."
        image="https://images.unsplash.com/photo-1529154036614-a60975f5c760?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    ),
  },
  {
    category: "Dubai, UAE",
    title: "Luxury and Innovation – Burj Khalifa, Desert Safari",
    src: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=687&auto=format&fit=crop",
    content: (
      <DummyContent
        title="3-Day Dubai Experience"
        highlights={[
          "Day 1: Burj Khalifa & Dubai Mall",
          "Day 2: Desert Safari & Camel Riding",
          "Day 3: Dubai Marina & Jumeirah Beach"
        ]}
        tip="Visit Burj Khalifa at sunset for breathtaking views."
        image="https://images.unsplash.com/photo-1489516408517-0c0a15662682?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    ),
  },
  {
    category: "India",
    title: "Golden Triangle – Delhi, Agra & Jaipur",
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1171&auto=format&fit=crop",
    content: (
      <DummyContent
        title="5-Day Golden Triangle Tour"
        highlights={[
          "Day 1: Delhi – Red Fort, Qutub Minar, India Gate",
          "Day 2: Agra – Taj Mahal & Agra Fort",
          "Day 3: Fatehpur Sikri stopover",
          "Day 4-5: Jaipur – Amber Fort, City Palace, Hawa Mahal"
        ]}
        tip="Travel early in the morning to Taj Mahal for best light and fewer crowds."
        image="https://images.unsplash.com/photo-1573398643956-2b9e6ade3456?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    ),
  },
];

