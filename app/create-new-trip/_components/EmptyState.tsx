import { suggestions } from '@/app/_components/Hero'
import React from 'react'

const EmptyState = ({onSelectedOption}:any) => {
    return (
        <div className='mt-7'>
            <h2 className='font-bold text-xl text-center'>Start Planing new trip using AI</h2>
            <p className="text-center text-gray-400">Discover personalized travel itineraries, find the best detinations, and plan your dream vacation effortlessy with power of AI. Let our smart assistant  do the hard work while you enjoy the journey. </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
                {suggestions.map((suggestion, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-2 border rounded-full py-1.5 px-3 cursor-pointer 
                                     hover:bg-secondary hover:scale-105 transition-transform whitespace-nowrap"
                                     onClick={() => onSelectedOption(suggestion.title)}
                    >
                        {suggestion.icon}
                        <span className="text-sm">{suggestion.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EmptyState