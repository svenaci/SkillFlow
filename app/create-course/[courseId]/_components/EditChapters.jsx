import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
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
import { Button } from "@/components/ui/button";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";

function EditChapters({ course, index, refreshData }) {
  const chapters = course?.courseOutput?.chapters;
  const [name, setName] = useState();
  const [about, setAbout] = useState();

  const onUpdate = async () => {
    course.courseOutput.chapters[index].chapterName = name;
    course.courseOutput.chapters[index].about = about;

    await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList.courseOutput });

    refreshData(true);
  };

  useEffect(() => {
    setName(chapters[index]?.chapterName);
    setAbout(chapters[index]?.about);
  }, [course]);

  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label>Course Title</label>
              <Input
                defaultValue={chapters[index].chapterName}
                onChange={(e) => setName(e?.target.value)}
              />
            </div>
            <div className="mt-3">
              <label>Description</label>
              <Textarea
                className="h-auto"
                defaultValue={chapters[index].about}
                onChange={(e) => setAbout(e?.target.value)}
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

export default EditChapters;
