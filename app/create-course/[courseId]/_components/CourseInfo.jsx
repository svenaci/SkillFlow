import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import EditCourse from "./EditCourse";

export default function CourseInfo({ course, refreshData }) {
  const [selectedFile, setSelectedFile] = useState();

  const onFileSelected = (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
  };

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="flex font-bold text-3xl items-center gap-2">
            {course?.courseOutput?.courseName}
            <EditCourse course={course} refreshData={() => refreshData(true)} />
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            {course?.courseOutput?.description}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            <HiOutlinePuzzlePiece />
            {course?.category}
          </h2>
          <Button className="w-full mt-5">Start</Button>
        </div>
        <div>
          <label htmlFor="upload-image">
            <Image
              src={selectedFile ? selectedFile : "/book.png"}
              width={300}
              height={300}
              className=" w-[200px] h-[200px] object-cover cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="upload-image"
            className="opacity-0"
            onChange={onFileSelected}
          />
        </div>
      </div>
    </div>
  );
}
