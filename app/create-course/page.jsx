"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from "react-icons/hi2";
import CategoryPicker from "./_components/CategoryPicker";
import TopicDescription from "./_components/TopicDescription";

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
      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {currentStepperIndex == 0 ? (
          <CategoryPicker />
        ) : currentStepperIndex == 1 ? (
          <TopicDescription />
        ) : null}
        <div className="flex justify-between mt-10">
          <Button
            disabled={currentStepperIndex == 0}
            onClick={() => setCurrentStepperIndex(currentStepperIndex - 1)}
            variant="outline"
          >
            Previous
          </Button>
          {currentStepperIndex < 2 && (
            <Button
              onClick={() => setCurrentStepperIndex(currentStepperIndex + 1)}
            >
              Next
            </Button>
          )}

          {currentStepperIndex == 2 && (
            <Button
              onClick={() => setCurrentStepperIndex(currentStepperIndex + 1)}
            >
              Generate Course
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
