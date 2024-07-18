import React from "react";
import defaultImage from "../../assets/default.png";

const NotificationsPage = () => {
  return (
    <div className="dark:text-[#f5f5f5] py-8">
      <h1 className="text-[24px] font-[600] px-2">Notifications</h1>
      {/* Notifications */}
      <div className="border-y border-[#DCDCDC] dark:border-[#545454] py-2 my-2">
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="flex items-center gap-x-2">
            <img
              src={defaultImage}
              alt="John Doe"
              className="w-[40px] h-[40px] rounded-full"
            />
            <div className="text-[14px] font-[600]">
              <p>John Doe</p>
              <p className="font-[400] text-[#a8a8a8]">@johndoe</p>
            </div>
          </div>
          <button className="text-[14px] font-[600] text-blue-500 mr-2">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
