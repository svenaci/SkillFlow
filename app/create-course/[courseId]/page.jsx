"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseInfo from "./_components/CourseInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterDetails from "./_components/ChapterDetails";
import { Button } from "@/components/ui/button";

function CoursePage({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    params && getCourse();
  }, [params, user]);

  const getCourse = async () => {
    const response = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params?.courseId),
          eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    setCourse(response[0]);
    console.log(response);
  };

  const generateChapterContent = () => {
    const chapters = course?.courseOutput?.chapters;
    chapters.forEach((chapter, index) => {
      const PROMPT =
        "Explain the concept in Detail on Topic: " +
        course?.name +
        ", Chapter:" +
        chapter?.name +
        " in JSON format with field as title, description in detail, Code Example (HTML Code format) if applicable";
    });
  };
  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>
      <CourseInfo course={course} refreshData={() => getCourse()} />
      <CourseDetail course={course} />
      <ChapterDetails course={course} refreshData={() => getCourse()} />
      <Button className="my-10">Generate Chapter Content</Button>
    </div>
  );
}

export default CoursePage;
