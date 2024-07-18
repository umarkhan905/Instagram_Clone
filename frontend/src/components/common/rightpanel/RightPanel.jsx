import React from "react";
import { Card } from "../../index";
import { Link } from "react-router-dom";

const RightPanel = () => {
  const suggestedUsers = [
    { _id: 1, name: "John Doe", username: "john_doe" },
    { _id: 2, name: "Jane Smith", username: "jane_smith" },
    { _id: 3, name: "Mike Johnson", username: "mike_johnson" },
    { _id: 4, name: "Mike Tyson", username: "mike_tyson" },
  ];
  return (
    <div className="hidden lg:block px-5 py-8 h-screen dark:text-white">
      <Card isMyProfile username={"umar_905"} fullname={"Umar Khan"} />

      <div className="flex justify-between items-center mt-6">
        <p className="font-[600]  dark:text-[#A8A8A8]">Suggested for you</p>
        <Link
          to={"/suggested/all"}
          className="text-[12px] dark:text-[#f5f5f5] transition-colors hover:dark:text-[#A8A8A8]">
          See all
        </Link>
      </div>

      <div className="mt-3">
        {suggestedUsers.map((user) => (
          <Card
            username={user.username}
            fullname={user.name}
            key={user._id}
            className={"mb-3"}
          />
        ))}
      </div>
    </div>
  );
};

export default RightPanel;
