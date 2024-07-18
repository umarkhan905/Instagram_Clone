import React from "react";
import { icons } from "../svg/icons";
import { Link } from "react-router-dom";

const Homebar = () => {
  return (
    <div className="sm:hidden py-3 px-4 border-b border-[#dbdbdb] dark:border-[#262626] dark:text-white">
      <div className="homebar flex sm:hidden justify-between items-center">
        <div className="homebar_icon">{icons.instagram}</div>
        <div className="flex items-center">
          <input
            className="mr-4 block w-64  px-2 py-[5px] outline-none bg-[#f2f2f2] rounded-md placeholder:text-gray-400 dark:bg-[#262626] dark:text-[#f2f2f2]"
            type="text"
            placeholder="Search for users..."
          />
          <Link className="hover:scale-105 hover:transition-colors">
            <span className="text-3xl font-extralight">
              {icons.notifications}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homebar;
