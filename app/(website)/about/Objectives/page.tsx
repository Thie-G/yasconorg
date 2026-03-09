import React from "react";
import Link from "next/link";
import { Section } from "lucide-react";

const Objectives = [
  {
    title: "",
    description:
      "Protection of nature and the environment through advocacy and policy influence.",
  },
  {
    title: "",
    description:
      "Restoration of 500 000 hectares of degraded landscapes by 2063 through sustainable innovation and research.",
  },
  {
    title: "",
    description:
      "Conservation of nature and the environment through community action and education of 5000 youth clubs by 2063.",
  },
  {
    title: "",
    description: "Creation of 3 million green jobs for the youth by 2063.",
  },
];

export default function Objective() {
  return (
    <section id="objective" className="mt-30 ">
      <div>
        <h2 className="text-2xl md:text-4xl font-bold text-[#1a2e1a] text-center mb-4 ">
          KEY OBJECTIVES
        </h2>
        <div className="w-17 h-[2px] bg-[#d4a017] mt-2 mx-auto rounded-sm" />

        <div className="max-w-6xl mx-auto my-6 bg-white rounded-xl overflow-hidden md:flex ">
          <div className="md:w-1/4 lg:brightness-50 md:brightness:60 ">
            <img
              className="h-full w-full object-cover"
              src="../hero/hero1.png"
              alt="Yascon in Action"
            />
          </div>

          <div className="p-8 md:w-3/4">
           <ol className="list-decimal list inside pl-5 ">
          
            {Objectives.map((Objective, idx) => (
              <div key={idx} className="group block list-disk pb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  <Link
                    href="#"
                    className="text-l font-bold text-gray-900 mb-3 block hover:text-green-700 transition-colors"
                  >
                    {Objective.title}
                  </Link>
                </h2>
               
                 
                    <p className="text-md text-gray-600 leading-relaxed">
                     <li> {Objective.description}  </li>
                    </p>
                
                
              </div>
            ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
