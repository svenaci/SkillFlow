const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const generateCourse = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a course tutorial on following detail with field as Course Name, Description, along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Level: Basic, Duration: 1 hours, numberOfChapter: 5, in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "courseName": "Python Programming Fundamentals",\n  "description": "This course provides a comprehensive introduction to Python programming for beginners. Learn the essential concepts and syntax of Python, including variables, data types, operators, control flow, functions, and more. By the end of this course, you will be able to write simple Python programs and understand the foundations of programming.",\n  "chapters": [\n    {\n      "chapterName": "Introduction to Python",\n      "about": "This chapter covers the basics of Python, including its history, applications, and installation. You\'ll also learn how to run your first Python program.",\n      "duration": "30 minutes"\n    },\n    {\n      "chapterName": "Variables and Data Types",\n      "about": "This chapter explores the fundamental concepts of variables and data types in Python. You\'ll learn how to declare variables, assign values, and work with different data types like integers, floats, strings, and booleans.",\n      "duration": "15 minutes"\n    },\n    {\n      "chapterName": "Operators and Expressions",\n      "about": "This chapter focuses on operators and expressions in Python. You\'ll learn about arithmetic, comparison, logical, and assignment operators, and how to build complex expressions.",\n      "duration": "15 minutes"\n    },\n    {\n      "chapterName": "Control Flow and Looping",\n      "about": "This chapter covers the essential concepts of control flow and looping in Python. You\'ll learn how to use conditional statements (if-else) and looping constructs (for and while) to control the flow of your programs.",\n      "duration": "15 minutes"\n    },\n    {\n      "chapterName": "Functions and Modules",\n      "about": "This chapter introduces the concepts of functions and modules in Python. You\'ll learn how to define and call functions, and how to use modules to organize and reuse your code.",\n      "duration": "10 minutes"\n    }\n  ],\n  "category": "Programming",\n  "topic": "Python",\n  "level": "Basic",\n  "duration": "1 hour",\n  "numberOfChapters": 5\n}\n```\n',
        },
      ],
    },
  ],
});

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());
