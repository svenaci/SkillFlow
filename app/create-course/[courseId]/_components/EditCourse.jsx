import React from "react";
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

function EditCourse({ course }) {
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
              <Input defaultValue={course?.courseOutput?.courseName} />
            </div>
            <div className="mt-3">
              <label>Description</label>
              <Textarea
                className="h-auto"
                defaultValue={course?.courseOutput?.description}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCourse;
