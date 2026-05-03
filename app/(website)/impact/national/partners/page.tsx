import React from 'react';

function page() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 mt-20">
      Partners page coming soon!
    </div>
  );
}

export default page;



// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";

// const partners = [
//   {
//     partner: "Ministry of Natural Resources and Climate Change",
//     description:
//       "Supports national environmental policies, climate action programs, and conservation initiatives.",
//     image: "/Images/mangochi.jpg",
//   },
//   {
//     partner: "Non-governmental Organizations",
//     description:
//       "Provides funding and technical support for environmental conservation projects.",
//     image: "/Images/USAID.jpg",
//   },
//   {
//     partner: "Department of Forestry",
//     description:
//       "Collaborates on tree planting, forest restoration, and community forestry initiatives.",
//     image: "/Images/zomba1.jpg",
//   },
//   {
//     partner: "Coordination union for the Rehabilitation of the Environment",
//     description:
//       "A network of NGOs working on environmental protection and advocacy.",
//     image: "/Images/machinga.jpg",
//   },
// ];

// export default function NationalPartners() {
//   return (
//     <section id="partners" className="max-w-6xl mt-20 mx-auto px-6 py-12">
//       <h2 className="text-4xl font-bold text-[#1a2e1a]">Our Partners</h2>
//       <div className="w-11 h-[3px] bg-[#d4a017] mt-5  rounded-sm" />
//       <p className="text-[#2e3d35] mt-3 mb-8">
//         National partners supporting Nature and Environmental conservation.
//       </p>

//       <div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {partners.map((p, i) => (
//             <div
//               key={i}
//               className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//             >
//               {/* Partner image */}
//               <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
//                 <img
//                   src={p.image}
//                   alt={p.partner}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).style.display = "none";
//                     (e.target as HTMLImageElement).parentElement!.innerHTML =
//                       "{p.partner.charAt(0)}";
//                   }}
//                 />
//               </div>
//               <div className="p-6">
//                 <h3 className="font-bold text-[#0f1a0f] text-lg mt-3 mb-2">
//                   {p.partner}
//                 </h3>
//                 <p className="text-sm text-gray-600 leading-relaxed">
//                   {p.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

