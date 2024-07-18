import { useState } from "react";
import { icons } from "../svg/icons";
import { CreateBar, SidebarModal } from "../..";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  window.addEventListener("click", () => setShowModal(false));
  const sideBarRoutes = [
    {
      path: "/",
      name: "Home",
      icon: icons.home,
    },
    {
      path: "/search",
      name: "Search",
      icon: icons.search,
    },
    {
      path: "/explore",
      name: "Explore",
      icon: icons.explore,
    },
    {
      path: "/reels",
      name: "Reels",
      icon: icons.reels,
    },
    {
      path: "/messages",
      name: "Chat With AI",
      icon: icons.messages,
    },
    {
      path: "/notifications",
      name: "Notifications",
      icon: icons.notifications,
    },
    {
      path: "/create",
      name: "Create",
      icon: icons.create,
    },
  ];

  const bottomBarRoutes = [
    {
      path: "/",
      name: "Home",
      icon: icons.home,
    },
    {
      path: "/explore",
      name: "Explore",
      icon: icons.explore,
    },
    {
      path: "/reels",
      name: "Reels",
      icon: icons.reels,
    },
    {
      path: "/create",
      name: "Create",
      icon: icons.create,
    },
    {
      path: "/messages",
      name: "Chat With AI",
      icon: icons.messages,
    },
  ];
  return (
    <div className="dark:text-white w-auto lg:w-[19%] sm:border-r border-[#dbdbdb] dark:border-[#262626] sm:px-3 lg:px-5 sm:py-8 sm:h-screen">
      <div className="hidden lg:block mb-8">{icons.instagram}</div>
      <div className="w-7 hidden sm:block lg:hidden mb-14 mx-auto ">
        {icons.logo}
      </div>
      <CreateBar
        routes={sideBarRoutes}
        isMoreIcon
        isProfileRoute
        className={"hidden sm:flex flex-col"}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <CreateBar
        routes={bottomBarRoutes}
        isProfileRoute
        className={
          "flex justify-around items-center sm:hidden fixed bottom-0 w-full border-t border-[#dbdbdb] dark:border-[#262626] py-3 z-50 dark:bg-black"
        }
      />
      {showModal && <SidebarModal />}
    </div>
  );
};

export default Sidebar;
