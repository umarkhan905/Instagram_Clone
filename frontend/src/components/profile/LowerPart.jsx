import { useState } from "react";
import { icons } from "../common/svg/icons";
import { CommentModal, ProfilePosts } from "../";

const LowerPart = () => {
  const [feedType, setFeedType] = useState("Posts");
  const [showModal, setShowModal] = useState(false);
  const feeds = [
    {
      name: "Posts",
      icon: icons.postsSmall,
      feedType: "Posts",
    },
    {
      name: "Saved",
      icon: icons.savedSmall,
      feedType: "Saved",
    },
    {
      name: "Following",
      icon: icons.followingSmall,
      feedType: "Following",
    },
    {
      name: "Liked",
      icon: icons.likedSmall,
      feedType: "Liked",
    },
  ];
  return (
    <div className="w-full border-t mt-4  border-[#dbdbdb] dark:border-[#262626] dark:text-[#f5f5f5]">
      <div className="flex items-center justify-center py-1 gap-x-4">
        {feeds.map((feed) => (
          <div
            className="flex items-center text-[14px] gap-x-1 cursor-pointer relative"
            key={feed.feedType}
            onClick={() => setFeedType(feed.feedType)}>
            {feed.icon}
            <span>{feed.name}</span>
            {feedType === feed.feedType && (
              <div className="absolute w-12 h-[1px] bg-white -top-2 left-0"></div>
            )}
          </div>
        ))}
      </div>
      <ProfilePosts setShowModal={setShowModal} />
      <CommentModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default LowerPart;
