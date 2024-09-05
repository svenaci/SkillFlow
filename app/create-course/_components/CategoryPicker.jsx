import { UserInputContext } from "@/app/_context/UserInputContext";
import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import React, { useContext } from "react";

function CategoryPicker() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handlePickedCategory = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
    }));
  };

  return (
    <div className=" px-10 md:px-20">
      <h2 className="my-5">Select the course category</h2>
      <div className="grid grid-cols-3 gap-10">
        {CategoryList.map((element, index) => (
          <div
            className={`flex flex-col p-5 border items-center rounded-xl hover:border-primary hover:bg-blue-50 cursor-pointer 
            ${
              userCourseInput?.category == element.name &&
              "border-primary bg-blue-100"
            }`}
            onClick={() => handlePickedCategory(element.name)}
            key={index}
          >
            <Image src={element.icon} width={100} height={100} alt="category" />
            <h2>{element.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPicker;
