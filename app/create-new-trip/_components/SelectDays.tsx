import { Button } from "@/components/ui/button";
import { FC } from "react";

interface SelectDaysProps {
  onSelectOption: (value: string) => void;
}

const daysOptions = [
  { label: "1-3 days", value: "1-3 days" },
  { label: "4-7 days", value: "4-7 days" },
  { label: "8-14 days", value: "8-14 days" },
  { label: "15+ days", value: "15+ days" },
];

const SelectDays:FC<SelectDaysProps> = ({ onSelectOption }) => {
  return (
     <div className="flex flex-col items-center gap-4 mt-4">
      <h3 className="text-lg font-semibold">How many days do you want your trip to last?</h3>
      <div className="flex flex-wrap gap-3 justify-center">
        {daysOptions.map((opt) => (
          <Button
            key={opt.value}
            variant="outline"
            onClick={() => onSelectOption(opt.value)}
            className="min-w-[100px] w-full sm:w-auto"
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default SelectDays