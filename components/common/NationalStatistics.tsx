"use client";
import { Trees } from "lucide-react";
import React, { useState, useEffect } from "react";

interface NationalStat {
  title: string;
  value: number;
  description: string;
  icon?: React.ReactNode;
  id: number;
  suffix: string;
}
interface StatItemProps {
  value: number;
  suffix?: string;
}

const NationalStatistics: NationalStat[] = [
  {
    title: "Central Region",
    value: 879,
    description: "12% more trees planted",
    icon: <Trees className="text-green-500" />,
    id: 1,
    suffix: "",
  },
  {
    title: "Northern Region",
    value: 768,
    description: "5.4% more trees planted",
    icon: <Trees className="text-green-500" />,
    id: 2,
    suffix: "",
  },
  {
    title: "Eastern Region",
    value: 491,
    description: "4.75% more trees planted",
    icon: <Trees className="text-green-500" />,
    id: 3,
    suffix: "",
  },
  {
    title: "Southern Region",
    value: 691,
    description: "9.75% more trees planted",
    icon: <Trees className="text-green-500" />,
    id: 4,
    suffix: "",
  },
];
const AnimatedStat: React.FC<StatItemProps> = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = value / (duration / 16); // 60 frames per second

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div>
      <p>
        {count}
        {suffix}
      </p>
    </div>
  );
};

export default function NationalStati() {
  return (
    <section id="statistics">
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          NATIONAL STATISTICS
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {NationalStatistics.map((stat) => (
            <div
              key={stat.id}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                {stat.icon}
              </div>

              <div className="mt-2 text-3xl font-semibold text-gray-900">
                <AnimatedStat
                  key={stat.id}
                  value={stat.value}
                  suffix={stat.suffix}
                />
              </div>

              <p className="mt-2 text-sm text-gray-500">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
