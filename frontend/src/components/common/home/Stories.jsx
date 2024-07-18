import React from "react";
import defaultImage from "../../../assets/default.png";

const Stories = ({ stories }) => {
  const isWatched = false;
  return (
    <div className="flex items-center gap-x-5 flex-wrap">
      {stories.map((story) => (
        <div className="user_story" key={story._id}>
          <div className="user_image">
            <img
              src={defaultImage}
              alt="Story"
              className={` w-[60px] h-[60px] rounded-full object-cover object-center ${
                isWatched ? "" : "outline-rounded"
              }`}
            />
          </div>
          <p className="text-[12px] text-center text-[#f5f5f5] mt-1">
            {story.username}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Stories;
