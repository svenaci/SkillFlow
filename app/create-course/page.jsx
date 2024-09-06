"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useContext } from "react";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from "react-icons/hi2";
import CategoryPicker from "./_components/CategoryPicker";
import TopicDescription from "./_components/TopicDescription";
import OptionPicker from "./_components/OptionPicker";
import { UserInputContext } from "@/app/_context/UserInputContext";
import { generateCourse } from "@/configs/AIModel";
import LoadingDialog from "./_components/LoadingDialog";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const { user } = useUser();
  const [currentStepperIndex, setCurrentStepperIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isNextButtonDisabled = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }
    if (
      currentStepperIndex == 1 &&
      (userCourseInput?.topic?.length == 0 ||
        userCourseInput?.topic == undefined)
    ) {
      return true;
    }
    if (
      currentStepperIndex == 2 &&
      (userCourseInput?.topic?.length == 0 ||
        userCourseInput?.level == undefined ||
        userCourseInput?.duration == undefined ||
        userCourseInput?.hasVideo == undefined ||
        userCourseInput?.numberOfChapters == undefined)
    ) {
      return true;
    }
    return false;
  };

  const handleGenerateCourse = async () => {
    const BASIC_PROMPT =
      "Generate a course tutorial on following detail with field as Course Name, Description, along with Chapter Name, about, Duration: ";
    const USER_INPUT_PROMPT =
      "Category: " +
      userCourseInput?.category +
      ", Topic: " +
      userCourseInput?.topic +
      ", Level: " +
      userCourseInput?.level +
      ", Duration: " +
      userCourseInput?.duration +
      ", numberOfChapter: " +
      userCourseInput?.numberOfChapters +
      ", in JSON format";
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
    try {
      setIsLoading(true);
      const response = await generateCourse.sendMessage(FINAL_PROMPT);
      SaveCourseInDB(JSON.parse(response?.response?.text()));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const SaveCourseInDB = async (course) => {
    var id = uuid4();
    try {
      await db.insert(CourseList).values({
        courseId: id,
        name: userCourseInput?.topic,
        level: userCourseInput?.level,
        category: userCourseInput?.category,
        category: userCourseInput?.category,
        courseOutput: course,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        userProfileImage: user?.imageUrl,
      });
      router.replace("/create-course/" + id);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  return (
    <div>
      <LoadingDialog loading={isLoading} />
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl text-primary font-medium">Create Course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((element, index) => (
            <div className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white ${
                    currentStepperIndex >= index && "bg-purple-500"
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
        ) : (
          <OptionPicker />
        )}
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
              disabled={isNextButtonDisabled()}
            >
              Next
            </Button>
          )}

          {currentStepperIndex == 2 && (
            <Button
              onClick={() => handleGenerateCourse()}
              disabled={isNextButtonDisabled()}
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
