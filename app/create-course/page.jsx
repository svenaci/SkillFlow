"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from "react-icons/hi2";

function CreateCourse() {
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 2,
      name: "Options",
      icon: <HiLightBulb />,
    },
    {
      id: 3,
      name: "Check",
      icon: <HiClipboardDocumentCheck />,
    },
  ];

  const [currentStepperIndex, setCurrentStepperIndex] = useState(0);

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl text-primary font-medium">Create Course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((element, index) => (
            <div className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white ${
                    currentStepperIndex >= index && "bg-purple-400"
                  }`}
                >
                  {element.icon}
                </div>
                <h2 className="hidden md:block md:text-sm">{element.name}</h2>
              </div>
              {index != StepperOptions.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${
                    currentStepperIndex - 1 >= index && "bg-purple-500"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <Button onClick={() => setCurrentStepperIndex(currentStepperIndex + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default CreateCourse;
