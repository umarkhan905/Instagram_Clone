import { useEffect, useState } from "react";
import { icons } from "../svg/icons";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import useDarkmode from "../../../hooks/useDrakmode";
import useLogout from "../../../hooks/useLogout";

const SidebarModal = () => {
  const [active, setActive] = useState(false);
  const isDarkMode = useDarkmode();
  const [showAppearance, setShowAppearance] = useState(false);
  const logout = useLogout();
  useEffect(() => {
    if (isDarkMode) {
      setActive(true);
    }
  }, [setActive, isDarkMode]);
  return (
    <div
      className={`hidden sm:block w-[220px] dark:bg-[#252525] absolute bottom-20 left-3 rounded-xl p-2 text-[#f5f5f5] transition`}
      onClick={(e) => e.stopPropagation()}>
      {showAppearance && (
        <div className="show_appearance">
          <div className="flex items-center justify-between py-3 border-b border-[#DCDCDC] dark:border-[#545454]">
            <div className="flex items-center gap-x-2">
              <span
                className="text-[#a8a8a8] cursor-pointer"
                onClick={() => setShowAppearance(false)}>
                <IoIosArrowBack />
              </span>
              <span>Switch Appearance</span>
            </div>
            <span>{active ? icons.appearance : icons.sun}</span>
          </div>
          <div className="px-2 py-3 hover:bg-[#3C3C3C] rounded-lg flex items-center justify-between cursor-pointer mt-2">
            <span>{active ? "Dark mode" : "Light mode"}</span>
            <div
              className="w-7 h-4 bg-[#D0D4D8] rounded-full relative flex items-center"
              onClick={() => {
                setActive(!active);
                const html = document.querySelector("html");
                if (html.classList.contains("dark")) {
                  html.classList.remove("dark");
                } else {
                  html.classList.add("dark");
                }
              }}>
              <div
                className={`w-[.75rem] h-[.75rem] rounded-full ${
                  active ? "ml-[.9rem] bg-[#272C30]" : "ml-[.1rem] bg-[#F2F2F2]"
                } transition-all`}></div>
            </div>
          </div>
        </div>
      )}

      {!showAppearance && (
        <div
          className="px-2 py-3 hover:bg-[#3C3C3C] rounded-lg flex items-center gap-x-2 cursor-pointer"
          onClick={() => setShowAppearance(true)}>
          {icons.appearance} Switch Appearance
        </div>
      )}

      {!showAppearance && (
        <Link to={"/profile/umarkhan"}>
          <div className="cursor-pointer px-2 py-3 hover:bg-[#3C3C3C] rounded-lg flex items-center gap-x-2">
            {icons.saveMedium} Saved
          </div>
        </Link>
      )}

      {!showAppearance && (
        <Link to="/profile/umarkhan/settings">
          <div className="cursor-pointer px-2 py-3 hover:bg-[#3C3C3C] rounded-lg flex items-center gap-x-2">
            {icons.settings} Settings
          </div>
        </Link>
      )}

      {!showAppearance && (
        <div
          className="cursor-pointer px-2 py-3 hover:bg-[#3C3C3C] rounded-lg flex items-center gap-x-2"
          onClick={() => logout()}>
          <AiOutlineLogout className="text-[22px]" />
          Log out
        </div>
      )}
    </div>
  );
};

export default SidebarModal;
