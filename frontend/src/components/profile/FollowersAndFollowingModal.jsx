import React from "react";
import { HiMiniXMark } from "react-icons/hi2";

const FollowersAndFollowingModal = ({
  showFollowersAndFollowingModal,
  setShowFollowersAndFollowingModal,
  followType,
}) => {
  const followers = [1, 2, 4, 3, 5, 6, 7, 8];
  return (
    <div
      className={`${
        showFollowersAndFollowingModal ? "block" : "hidden"
      }  w-full h-full fixed top-0 left-0 z-50 dark:bg-[#00000090] flex items-center justify-center dark:text-[#f5f5f5]`}>
      <div className="min-w-[400px] h-[440px] overflow-y-scroll dark:bg-[#252525] rounded-2xl relative">
        <div className="text-[16px] font-[600] py-2 border-b  border-[#454545] sticky top-0 bg-inherit flex items-center">
          <span className="flex-1 text-center">
            {followType === "followers" ? "Followers" : "Following"}
          </span>
          <button
            className="text-3xl font-extrabold mx-2"
            onClick={() => setShowFollowersAndFollowingModal(false)}>
            <HiMiniXMark />
          </button>
        </div>
        {/* Followers Or Following */}
        <div className="w-full mt-2">
          {followers.map((follower) => (
            <div className="flex items-center justify-between mb-3  px-2">
              <div className="flex items-center">
                <div className="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
                    className="w-12 h-12 rounded-full object-cover object-center"
                    alt=""
                  />
                </div>
                <div className="ml-2">
                  <p className="text-[14px] font-[600] text-[#f5f5f5]">
                    isprofficial1
                  </p>
                  <p className="text-[14px] font-[400] text-[#a8a8a8]">
                    isprofficial1
                  </p>
                </div>
              </div>

              {followType === "followers" && (
                <button className="dark:bg-[#363636] dark:text-[#f5f5f5] py-1 px-8 rounded-md hover:transition-colors dark:hover:bg-[#262626]">
                  Follow
                </button>
              )}
              {followType === "following" && (
                <button className="dark:bg-[#363636] dark:text-[#f5f5f5] py-1 px-8 rounded-md hover:transition-colors dark:hover:bg-[#262626]">
                  Unfollow
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowersAndFollowingModal;
