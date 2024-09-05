import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

function TopicDescription() {
  return (
    <div className="mx-20 lg:mx-44">
      <div className="mt-5">
        💡
        <label className="ml-2">
          Write the topic for which you want to generate a course (e.g. Java
          Course, Yoga, etc.):
        </label>
        <Input placeholder={"Topic of your choice"} />
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
        />
      </div>
    </div>
  );
}

export default TopicDescription;
