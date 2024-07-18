import React from "react";
import { NavLink } from "react-router-dom";
import { icons } from "../svg/icons";

const CreateBar = ({
  routes,
  className,
  isProfileRoute,
  isMoreIcon,
  showModal,
  setShowModal,
}) => {
  return (
    <ul className={`${className}`}>
      {routes.map((route) => (
        <NavLink to={route.path} key={route.path}>
          <li className="flex items-center hover:transition-all dark:hover:bg-[#ffffff1a] hover:bg-[#0000000d] py-[0.6rem] px-2 rounded-md mb-2 scale-span ">
            <span className="text-3xl font-extralight span">{route.icon}</span>
            <span className="hidden lg:block lg:text-[18px] lg:ml-3">
              {route.name}
            </span>
          </li>
        </NavLink>
      ))}
      {isProfileRoute && (
        <NavLink to={"/profile/umarkhan"}>
          <li className="sm:flex sm:items-center hover:transition-all hover:bg-[#ffffff1a] sm:py-[0.6rem] sm:px-2 rounded-md scale-image">
            <div className="overflow-hidden ">
              <img
                className=" rounded-full w-7 h-7 object-cover object-center image"
                src="https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="User Image"
              />
            </div>
            <span className="hidden lg:block lg:text-[18px] lg:ml-3">
              Profile
            </span>
          </li>
        </NavLink>
      )}
      {isMoreIcon && (
        <li
          className="sm:flex items-center hover:transition-all hover:bg-[#ffffff1a] py-[0.6rem] px-2 rounded-md mb-2 scale-span hidden cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(!showModal);
          }}>
          <span className="text-3xl font-extralight span">{icons.more}</span>
          <span className="hidden lg:block lg:text-[18px] lg:ml-3">More</span>
        </li>
      )}
    </ul>
  );
};

export default CreateBar;
