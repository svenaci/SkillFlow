import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_context/UserInputContext";

function OptionPicker() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handlePickedOption = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-10">
        <div>
          🎓
          <label className="ml-2 text-sm">Difficulty Level</label>
          <Select
            onValueChange={(value) => handlePickedOption("level", value)}
            defaultValue={userCourseInput?.level}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          🕒
          <label className="ml-2 text-sm">Course Duration</label>
          <Select
            onValueChange={(value) => handlePickedOption("duration", value)}
            defaultValue={userCourseInput?.duration}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hours">1 Hours</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More than 3 hours">
                More than 3 hours
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          🎬
          <label className="ml-2 text-sm">Add Video</label>
          <Select
            onValueChange={(value) => handlePickedOption("hasVideo", value)}
            defaultValue={userCourseInput?.hasVideo}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          📖
          <label className="ml-2 text-sm">Number of Chapters</label>
          <Input
            type="number"
            className="h-9 text-lg"
            defaultValue={userCourseInput?.numberOfChapters}
            onChange={(event) =>
              handlePickedOption("numberOfChapters", event.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default OptionPicker;
