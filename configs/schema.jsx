import { boolean, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CourseList = pgTable("courseList", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(),
  level: varchar("level").notNull(),
  hasVideo: varchar("hasVideo").notNull().default("Yes"),
  courseOutput: json("courseOutput").notNull(),
  createdBy: varchar("createdBy").notNull(),
  userName: varchar("userName"),
  userProfileImage: varchar("userProfileImage"),
  courseBanner: varchar("courseBanner"),
  isCoursePublished: boolean("isCoursePublished").default(false),
});
