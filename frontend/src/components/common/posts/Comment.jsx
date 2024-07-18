import React from "react";
import defaultImage from "../../../assets/default.png";

const Comment = ({ username, comment, date }) => {
  return (
    <div className="flex w-full mb-2">
      <div className="flex">
        <div className="overflow-hidden">
          <img
            src={defaultImage}
            className="w-10 h-10 rounded-full object-cover object-center"
            alt=""
          />
        </div>
      </div>
      <div className="ml-2 flex-1 text-[14px]  text-[#f5f5f5]">
        <p className=" font-[600]">
          {username}
          <span className="font-[400] text-[#a8a8a8]"> - {date}</span>
        </p>
        <p className="font-[400]">{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
