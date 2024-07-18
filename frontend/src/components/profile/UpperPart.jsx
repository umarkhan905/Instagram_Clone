import { useState } from "react";
import coverImage from "../../assets/cover.jpeg";
import defaultImage from "../../assets/default.png";
import { icons } from "../common/svg/icons";
import { EditModal, FollowersAndFollowingModal } from "../index";

const UpperPart = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFollowersAndFollowingModal, setShowFollowersAndFollowingModal] =
    useState(false);
  const [followType, setFollowType] = useState("followers");
  const isMyProfile = true;
  const isBlueTick = true;
  const links = [
    {
      title: "Tiktok",
      url: "https://tiktok.com",
    },
    {
      title: "Instagram",
      url: "https://instagram.com",
    },
    {
      title: "Facebook",
      url: "https://facebook.com",
    },
  ];
  return (
    <div className="w-full">
      <div className="cover_image w-full max-h-[220px] overflow-hidden">
        <img
          src={coverImage}
          alt="cover_image"
          className="object-cover object-center w-full"
        />
      </div>
      <div className="w-24 h-24 overflow-hidden -mt-14 ml-1">
        <img
          src={defaultImage}
          alt="Default Image"
          className="rounded-full object-cover object-center"
        />
      </div>
      <div className="flex items-start justify-between px-3">
        <div className="w-1/2">
          {/* Fullname */}
          <h1 className="flex items-center text-[24px] font-[600] text-[#363636] dark:text-[#f5f5f5]">
            IsProfficial1
            {isBlueTick && <span className="ml-1">{icons.blueTickLarge}</span>}
          </h1>

          {/* Username */}
          <p className="text-[14px] text-[#636363] dark:text-[#a8a8a8]">
            @isprofficial1
          </p>

          {/* Followers */}
          <div className="text-[14px] text-[#636363] dark:text-[#a8a8a8] my-1 flex gap-x-1">
            <div>
              <span className="dark:text-[#f5f5f5] font-bold">10 </span>posts •
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowFollowersAndFollowingModal(true);
                setFollowType("followers");
              }}>
              <span className="dark:text-[#f5f5f5] font-bold">100 </span>
              followers •
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowFollowersAndFollowingModal(true);
                setFollowType("following");
              }}>
              <span className="dark:text-[#f5f5f5] font-bold">0 </span>
              following
            </div>
          </div>

          {/* Bio */}
          <p className="text-[14px] text-[#636363] dark:text-[#f5f5f5] mb-1">
            I'm a professional photographer and travel blogger. I love sharing
            my experiences and capturing the beauty of the places I visit.
          </p>

          {/* Links */}
          <div className="profile_links text-[#f5f5f5]">
            {links.map((link) => (
              <div className="flex items-center" key={link.title}>
                <span className="title font-[600]">{link.title}</span>
                <a href={link.url} className="text-blue-500 ml-3 text-[14px]">
                  {link.url}
                </a>
              </div>
            ))}
          </div>
        </div>
        {isMyProfile && (
          <button
            className="dark:bg-[#363636] dark:text-[#f5f5f5] py-1 px-8 rounded-md hover:transition-colors dark:hover:bg-[#262626]"
            onClick={() => setShowEditModal(true)}>
            Edit Profile
          </button>
        )}
        {!isMyProfile && (
          <button className="dark:bg-[#363636] dark:text-[#f5f5f5] py-1 px-8 rounded-md hover:transition-colors dark:hover:bg-[#262626]">
            Follow
          </button>
        )}
      </div>
      <EditModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
      />
      <FollowersAndFollowingModal
        showFollowersAndFollowingModal={showFollowersAndFollowingModal}
        setShowFollowersAndFollowingModal={setShowFollowersAndFollowingModal}
        followType={followType}
      />
    </div>
  );
};

export default UpperPart;
