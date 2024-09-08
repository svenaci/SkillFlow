"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseInfo from "./_components/CourseInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterDetails from "./_components/ChapterDetails";

function CoursePage({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    params && GetCourse();
  }, [params, user]);

  const GetCourse = async () => {
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
  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>
      <CourseInfo course={course} />
      <CourseDetail course={course} />
      <ChapterDetails course={course} />
    </div>
  );
}

export default CoursePage;
