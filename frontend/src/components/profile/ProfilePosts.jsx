import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";

const ProfilePosts = ({ setShowModal }) => {
  const posts = [1, 2, 3, 4, 5, 6];
  return (
    <div className="w-full grid grid-cols-3 place-content-center py-4 gap-1">
      {posts.map((post) => (
        <div
          className="max-h-[300px] relative before:w-0 before:h-full before:bg-[#0000008f] before:absolute before:top-0 before:left-0 hover:before:w-full transition-all cursor-pointer"
          onClick={() => setShowModal(true)}>
          <div className="overflow-hidden max-h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
              alt=""
              className="object-cover object-center"
            />
          </div>
          <div className="w-full h-full absolute bottom-0 left-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100 gap-x-10">
            <div className="text-white text-2xl font-medium flex items-center gap-x-2">
              <FaHeart />
              <span>0</span>
            </div>
            <div className="text-white text-2xl font-medium flex items-center gap-x-2">
              <FaComment />
              <span>0</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfilePosts;
