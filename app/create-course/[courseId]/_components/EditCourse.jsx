import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

function EditCourse({ course }) {
  const [courseName, setCourseName] = useState();
  const [courseDescription, setCourseDescription] = useState();

  const onUpdate = async () => {
    course.courseOutput.courseName = courseName;
    course.courseOutput.description = courseDescription;

    const res = await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList.courseOutput });
  };

  useEffect(() => {
    setCourseName(course?.courseOutput?.courseName);
    setCourseDescription(course?.courseOutput?.courseDescription);
  }, [course]);

  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Title & Description</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label>Course Title</label>
              <Input
                defaultValue={course?.courseOutput?.courseName}
                onChange={(e) => setCourseName(e?.target.value)}
              />
            </div>
            <div className="mt-3">
              <label>Description</label>
              <Textarea
                className="h-auto"
                defaultValue={course?.courseOutput?.description}
                onChange={(e) => setCourseDescription(e?.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={onUpdate}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCourse;
