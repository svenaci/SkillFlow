import { UserButton } from "@clerk/nextjs";
import React from "react";
import CourseList from "./_components/CourseList";

function Dashboard() {
  return (
    <div>
      <CourseList />
    </div>
  );
}

export default Dashboard;
