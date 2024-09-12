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

export const generateChapterContent = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Explain the concept in Detail on Topic: MERN stack, Chapter:Introduction to the MERN Stack in JSON format with field as title, description in detail, Code Example (HTML Code format) if applicable",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "```json\n{\n  \"title\": \"Introduction to the MERN Stack\",\n  \"description\": \"The MERN stack is a popular JavaScript-based technology stack for building modern web applications. It stands for MongoDB, Express.js, React.js, and Node.js. Each component plays a crucial role in creating a robust and scalable web application:\\n\\n* **MongoDB:** A NoSQL database that stores data in a flexible JSON-like document format. It's highly scalable, making it suitable for handling large amounts of data.\\n* **Express.js:** A fast and minimal web framework for Node.js. It simplifies the creation of RESTful APIs and server-side logic.\\n* **React.js:** A JavaScript library for building user interfaces. It uses a component-based architecture, which allows for modularity and reusability of code. Its virtual DOM efficiently updates the user interface.\\n* **Node.js:** A JavaScript runtime environment that allows you to execute JavaScript code outside of a web browser. It enables efficient server-side development and real-time applications.\\n\\nThe MERN stack offers several advantages, including:\\n\\n* **JavaScript Everywhere:** Using JavaScript across the entire stack simplifies development and reduces the need to learn multiple languages.\\n* **Scalability:** MongoDB and Node.js are designed for handling high volumes of data and users.\\n* **Fast Development:** React.js's component-based architecture promotes code reuse and rapid development.\\n* **Large Community:** The MERN stack boasts a vast and active community, providing ample resources and support.\\n\\n## How it Works\\n\\nThe MERN stack works together to build web applications as follows:\\n\\n1. **Client-Side (React.js):** The user interacts with the frontend built with React.js. User actions trigger requests to the backend.\\n2. **Server-Side (Node.js and Express.js):** Node.js handles the server logic, while Express.js provides a framework for creating routes and APIs.\\n3. **Database (MongoDB):** MongoDB stores and retrieves data that the backend needs to respond to requests from the frontend.\\n4. **Data Exchange:**  The frontend communicates with the backend using HTTP requests, sending data to the database and receiving data back. \\n\\n## Example:\\n\\nLet's consider a simple application that displays a list of users fetched from a database:\\n\\n* **Frontend (React.js):**\\n\\n```html\\n<div>\\n  <h1>User List</h1>\\n  <ul>\\n    {users.map((user) => (\\n      <li key={user._id}>{user.name}</li>\\n    ))}\\n  </ul>\\n</div>\\n```\\n\\n* **Backend (Node.js and Express.js):**\\n\\n```javascript\\nconst express = require('express');\\nconst app = express();\\nconst MongoClient = require('mongodb').MongoClient;\\n\\n// Connect to MongoDB\\nMongoClient.connect('mongodb://localhost:27017/your_database', (err, client) => {\\n  if (err) return console.log(err);\\n  const db = client.db('your_database');\\n  const collection = db.collection('users');\\n\\n  // Get all users\\n  app.get('/users', (req, res) => {\\n    collection.find({}).toArray((err, users) => {\\n      if (err) return res.status(500).send(err);\\n      res.send(users);\\n    });\\n  });\\n\\n  app.listen(3000, () => console.log('Server started on port 3000'));\\n});\\n```\\n\\nThis example demonstrates how React.js fetches user data from a MongoDB database through an Express.js API endpoint. The frontend receives the data and dynamically displays it on the user interface.\",\n  \"codeExample\": \"\"\n}\n```",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Explain the concept in Detail on Topic: MERN stack, Chapter:Introduction to the MERN Stack, in JSON format with list of array with field as title, explanation on given chapter in detail, Code Example(Code field in <precode> format) if applicable",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "```json\n[\n  {\n    \"title\": \"Introduction to the MERN Stack\",\n    \"explanation\": \"The MERN stack is a popular JavaScript-based technology stack for building modern web applications. It stands for MongoDB, Express.js, React.js, and Node.js. Each component plays a crucial role in creating a robust and scalable web application:\\n\\n* **MongoDB:** A NoSQL database that stores data in a flexible JSON-like document format. It's highly scalable, making it suitable for handling large amounts of data.\\n* **Express.js:** A fast and minimal web framework for Node.js. It simplifies the creation of RESTful APIs and server-side logic.\\n* **React.js:** A JavaScript library for building user interfaces. It uses a component-based architecture, which allows for modularity and reusability of code. Its virtual DOM efficiently updates the user interface.\\n* **Node.js:** A JavaScript runtime environment that allows you to execute JavaScript code outside of a web browser. It enables efficient server-side development and real-time applications.\\n\\nThe MERN stack offers several advantages, including:\\n\\n* **JavaScript Everywhere:** Using JavaScript across the entire stack simplifies development and reduces the need to learn multiple languages.\\n* **Scalability:** MongoDB and Node.js are designed for handling high volumes of data and users.\\n* **Fast Development:** React.js's component-based architecture promotes code reuse and rapid development.\\n* **Large Community:** The MERN stack boasts a vast and active community, providing ample resources and support.\\n\\n## How it Works\\n\\nThe MERN stack works together to build web applications as follows:\\n\\n1. **Client-Side (React.js):** The user interacts with the frontend built with React.js. User actions trigger requests to the backend.\\n2. **Server-Side (Node.js and Express.js):** Node.js handles the server logic, while Express.js provides a framework for creating routes and APIs.\\n3. **Database (MongoDB):** MongoDB stores and retrieves data that the backend needs to respond to requests from the frontend.\\n4. **Data Exchange:**  The frontend communicates with the backend using HTTP requests, sending data to the database and receiving data back. \\n\\n## Example:\\n\\nLet's consider a simple application that displays a list of users fetched from a database:\\n\\n* **Frontend (React.js):**\\n\\n```html\\n<div>\\n  <h1>User List</h1>\\n  <ul>\\n    {users.map((user) => (\\n      <li key={user._id}>{user.name}</li>\\n    ))}\\n  </ul>\\n</div>\\n```\\n\\n* **Backend (Node.js and Express.js):**\\n\\n```javascript\\nconst express = require('express');\\nconst app = express();\\nconst MongoClient = require('mongodb').MongoClient;\\n\\n// Connect to MongoDB\\nMongoClient.connect('mongodb://localhost:27017/your_database', (err, client) => {\\n  if (err) return console.log(err);\\n  const db = client.db('your_database');\\n  const collection = db.collection('users');\\n\\n  // Get all users\\n  app.get('/users', (req, res) => {\\n    collection.find({}).toArray((err, users) => {\\n      if (err) return res.status(500).send(err);\\n      res.send(users);\\n    });\\n  });\\n\\n  app.listen(3000, () => console.log('Server started on port 3000'));\\n});\\n```\\n\\nThis example demonstrates how React.js fetches user data from a MongoDB database through an Express.js API endpoint. The frontend receives the data and dynamically displays it on the user interface.\",\n    \"code\": \"\"\n  }\n]\n```",
        },
      ],
    },
  ],
});

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());
