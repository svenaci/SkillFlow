import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function EditChapters({ course, index }) {
  const chapters = course?.courseOutput?.chapters;

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
                onChange={(e) => setCourseName(e?.target.value)}
              />
            </div>
            <div className="mt-3">
              <label>Description</label>
              <Textarea
                className="h-auto"
                defaultValue={chapters[index].about}
                onChange={(e) => setCourseDescription(e?.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default EditChapters;
