'use client'
import React, { useState } from "react";
import { Waves } from "lucide-react";




type Location = {
  id: number;
  name: string;
  category: string;
  description: string;
  icon: string;
};

const locations: Location[] = [
  {
    id: 1,
    name: "Chilomoni Primary School",
    category: "School",
    description: "Provides education for children in the community.",
    icon: "🏫",
  },
  
  {
    id: 2,
    name: "Blantyre Market",
    category: "Market",
    description: "A busy place where people buy food and goods.",
    icon: "🛒",
  },
  {
    id: 3,
    name: "Michiru Forest",
    category: "Forest",
    description: "Natural forest used for conservation and tourism.",
    icon: "🌳",
  },
  {
    id: 4,
    name: "Lake Malawi",
    category: "Lakes",
    description: "Provide civic education for conservation of aquatic animals",
     icon: "💧",
  },
  {
    id: 5,
    name: "Community Borehole",
    category: "Water",
    description: "Source of clean water for residents.",
    icon: "💧",
  },
  {
    id: 6,
    name: "Blanytre Secondary School",
    category: "School",
    description: "Provides education for children in the community.",
    icon: "🏫",
  },
];

const categories = ["All", "School", "Market", "Forest", "Lakes", "Water"];

export default function LocationPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredLocations = locations.filter((location) => {
    const matchesSearch = location.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      filter === "All" || location.category === filter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8 mt-20">
      
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Our Work Locations
        </h1>
        <p className="text-gray-500">
        Places we operate
        </p>
      </div>

    

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === cat
                ? "bg-green-600 text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredLocations.map((location) => (
          <div
            key={location.id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="text-4xl">{location.icon}</div>

            <h2 className="text-xl font-semibold mt-3">
              {location.name}
            </h2>

            <span className="text-sm text-blue-500">
              {location.category}
            </span>

            <p className="text-gray-600 mt-2">
              {location.description}
            </p>

            
          </div>
        ))}
      </div>

     
    </div>
  );
}