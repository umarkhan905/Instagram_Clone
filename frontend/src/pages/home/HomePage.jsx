import React from "react";
import { Homebar, Posts, Stories } from "../../components";

const HomePage = () => {
  const stories = [
    { _id: 1, image: "image1.jpg", username: "user1" },
    { _id: 2, image: "image2.jpg", username: "user2" },
    { _id: 3, image: "image3.jpg", username: "user3" },
    { _id: 4, image: "image4.jpg", username: "user4" },
    { _id: 5, image: "image5.jpg", username: "user5" },
    { _id: 6, image: "image6.jpg", username: "user6" },
  ];
  return (
    <div className=" sm:py-6">
      <Homebar />
      <div className="stories pt-4 sm:py-2 px-4">
        <Stories stories={stories} />
      </div>
      <div>
        <Posts />
      </div>
    </div>
  );
};

export default HomePage;
