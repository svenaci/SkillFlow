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
import { generateChapterContent_ai } from "@/configs/AIModel";
import youtubeService from "@/configs/youtubeService";

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
    chapters.forEach(async (chapter, index) => {
      const PROMPT =
        "Explain the concept in Detail on Topic: " +
        course?.name +
        ", Chapter:" +
        chapter?.chapterName +
        ", in JSON format with list of array with field as title, explanation on given chapter in detail, Code Example(Code field in <precode> format) if applicable";
      console.log(PROMPT);

      /*
        15 RPM (requests per minute)
        1 million TPM (tokens per minute)
        1,500 RPD (requests per day)
      */
      try {
        const response = await generateChapterContent_ai.sendMessage(PROMPT);
        console.log(response?.response?.text());

        youtubeService
          .getVideos(course?.name + ":" + chapter?.chapterName)
          .then((response) => {
            console.log(response);
          });
      } catch (e) {
        console.log(e);
      }
    });
  };
  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>
      <CourseInfo course={course} refreshData={() => getCourse()} />
      <CourseDetail course={course} />
      <ChapterDetails course={course} refreshData={() => getCourse()} />
      <Button onClick={generateChapterContent} className="my-10">
        Generate Chapter Content
      </Button>
    </div>
  );
}

export default CoursePage;
