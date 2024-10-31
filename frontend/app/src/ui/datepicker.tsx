"use client";

import React from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select";
import { ScrollArea } from "./scroll-area";
import { useState } from "react";

interface ShadcnDatePickerProps {
  startYear: number;
  endYear: number;
  selected: Date;
  // eslint-disable-next-line no-unused-vars
  onSelect: (date: Date) => void;
  placeholder?: {
    day?: string;
    month?: string;
    year?: string;
  };
}

const ShadcnDatePicker: React.FC<ShadcnDatePickerProps> = ({
  startYear,
  endYear,
  selected,
  onSelect,
  placeholder = { day: "Day", month: "Month", year: "Year" },
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleDayChange = (day: string) => {
    const year = selected.getFullYear();
    const month = selected.getMonth();
    const newDate = new Date(year, month, parseInt(day));

    if (newDate.getDate() !== parseInt(day)) {
      setError("Invalid date selected");
    } else {
      setError(null);
      onSelect(newDate);
    }
  };

  const handleMonthChange = (month: string) => {
    const year = selected.getFullYear();
    const day = selected.getDate();
    const newDate = new Date(year, months.indexOf(month), day);

    if (newDate.getMonth() !== months.indexOf(month)) {
      setError("Invalid date selected");
    } else {
      setError(null);
      onSelect(newDate);
    }
  };

  const handleYearChange = (year: string) => {
    const month = selected.getMonth();
    const day = selected.getDate();
    const newDate = new Date(parseInt(year), month, day);

    if (newDate.getFullYear() !== parseInt(year)) {
      setError("Invalid date selected");
    } else {
      setError(null);
      onSelect(newDate);
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );
  return (
    <div className="grid grid-cols-3 gap-4 max-w-[360px] dark:text-white ">
      <Select onValueChange={handleDayChange}>
        <SelectTrigger className="h-auto  shadow-sm focus:outline-0 focus:ring-0 focus:ring-offset-0 min-h-[60px]">
          <SelectValue
            placeholder={
              <div className="flex flex-col items-start">
                <span className="font-semibold uppercase text-[0.65rem] text-muted-foreground dark:text-white ">
                  {placeholder.day}
                </span>
                <span className="font-normal dark:text-white">
                  {selected.getDate() || placeholder.day}
                </span>
              </div>
            }
          />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-48">
            {Array.from({ length: 31 }, (_, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()}>
                {i + 1}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <Select onValueChange={handleMonthChange}>
        <SelectTrigger className="h-auto  shadow-sm focus:outline-0 focus:ring-0 focus:ring-offset-0">
          <SelectValue
            placeholder={
              <div className="flex flex-col items-start">
                <span className="font-semibold uppercase text-[0.65rem] text-muted-foreground dark:text-white">
                  {placeholder.month}
                </span>
                <span className="font-normal dark:text-white">
                  {months[selected.getMonth()] || placeholder.month}
                </span>
              </div>
            }
          />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-48">
            {months.map((month, index) => (
              <SelectItem key={index} value={month}>
                {month}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <Select onValueChange={handleYearChange}>
        <SelectTrigger className="h-auto shadow-sm focus:outline-0 focus:ring-0 focus:ring-offset-0">
          <SelectValue
            placeholder={
              <div className="flex flex-col items-start">
                <span className="font-semibold uppercase text-[0.65rem] text-muted-foreground dark:text-white">
                  {placeholder.year}
                </span>
                <span className="font-normal dark:text-white">
                  {selected.getFullYear() || placeholder.year}
                </span>
              </div>
            }
          />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-48">
            {Array.from({ length: endYear - startYear + 1 }, (_, i) => (
              <SelectItem
                key={i + startYear}
                value={(i + startYear).toString()}
              >
                {i + startYear}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default ShadcnDatePicker;