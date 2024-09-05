import { UserInputContext } from "@/app/_context/UserInputContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";

function TopicDescription() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleTopicChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  return (
    <div className="mx-20 lg:mx-44">
      <div className="mt-5">
        💡
        <label className="ml-2">
          Write the topic for which you want to generate a course (e.g. Java
          Course, Yoga, etc.):
        </label>
        <Input
          placeholder={"Topic of your choice"}
          className="h-14 text-xl"
          onChange={(e) => handleTopicChange("topic", e.target.value)}
        />
      </div>
      <div className="mt-5">
        📝
        <label className="ml-2">
          Tell us more about your course, what you want to include in the course
          (Optional)
        </label>
        <Textarea
          placeholder={
            "Add some description about the course you want to generate"
          }
          className="h-24 text-xl"
          onChange={(e) => handleTopicChange("description", e.target.value)}
        />
      </div>
    </div>
  );
}

export default TopicDescription;
