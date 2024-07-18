import { useState, useEffect } from "react";
import { icons } from "../../components/common/svg/icons";
import useDarkmode from "../../hooks/useDrakmode";
import useLogout from "../../hooks/useLogout";

const SettingsPage = () => {
  const [active, setActive] = useState(false);
  const isDarkMode = useDarkmode();
  const logout = useLogout();

  useEffect(() => {
    if (isDarkMode) {
      setActive(true);
    }
  }, [setActive, isDarkMode]);

  return (
    <div className="py-8 dark:text-[#f5f5f5] px-2">
      <h1 className="text-2xl font-bold">Account Settings</h1>
      <div className="mt-8">
        {/* Change Appearance */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-medium">Switch Appearance</span>
          </div>
          <span>{active ? icons.appearance : icons.sun}</span>
        </div>
        <div className="py-1 flex items-center justify-between outline-none px-2 dark:bg-[#252525] rounded-sm mt-2">
          <span>{active ? "Dark mode" : "Light mode"}</span>
          <div
            className="w-7 h-4 bg-[#D0D4D8] rounded-full relative flex items-center cursor-pointer"
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
        <h2 className="text-lg font-medium mt-4">Profile Settings</h2>
        <div className="flex items-center gap-2 mt-2">
          <label htmlFor="private_profile">Show my profile</label>
          <select
            name=""
            id=""
            className="outline-none py-1 px-2 dark:bg-[#252525] rounded-sm">
            <option value="everyone">Everyone</option>
            <option value="nobody">Nobody</option>
          </select>
        </div>

        {/* Security */}
        <h2 className="text-lg font-medium mt-4">Update Security Question</h2>
        <div className="flex items-center gap-2 mt-2">
          <label
            htmlFor="current_security_question"
            className="w-1/3 outline-none py-1 px-2 dark:bg-[#252525] rounded-sm">
            Current Security Question
          </label>
          <select
            className="flex-1  outline-none py-1 px-2 dark:bg-[#252525] rounded-sm"
            id="current_security_question">
            <option value="What's your pet's name?">
              What's your pet's name?
            </option>
            <option value="What's your favorite place?">
              What's your favorite place?
            </option>
            <option value="What's your favorite book?">
              What's your favorite book?
            </option>
          </select>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <label
            htmlFor="new_security_question"
            className="w-1/3  outline-none py-1 px-2 dark:bg-[#252525] rounded-sm">
            New Security Question
          </label>
          <select
            className="flex-1 outline-none py-1 px-2 dark:bg-[#252525] rounded-sm"
            id="new_security_question">
            <option value="What's your pet's name?">
              What's your pet's name?
            </option>
            <option value="What's your favorite place?">
              What's your favorite place?
            </option>
            <option value="What's your favorite book?">
              What's your favorite book?
            </option>
          </select>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <label
            htmlFor="current_security_answer"
            className="w-1/3  outline-none py-1 px-2 dark:bg-[#252525] rounded-sm">
            Current Security Answer
          </label>
          <input
            className="flex-1 outline-none py-1 px-2 dark:bg-[#252525] rounded-sm"
            placeholder="Current Security Answer"
          />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <label
            htmlFor="new_security_answer"
            className="w-1/3  outline-none py-1 px-2 dark:bg-[#252525] rounded-sm">
            New Security Answer
          </label>
          <input
            className="flex-1 outline-none py-1 px-2 dark:bg-[#252525] rounded-sm"
            placeholder="New Security Answer"
          />
        </div>
        <button className="block w-full px-2 py-[6px] outline-none bg-[#3797EF] text-white rounded-md hover:bg-[#4fabf1] transition-colors mt-2">
          Update Security Question
        </button>

        {/* Logout */}
        <h2 className="text-lg font-medium mt-4">Logout profile</h2>
        <div className="flex  items-center gap-x-3 mt-2">
          <p className="flex-1 outline-none py-1 px-2 dark:bg-[#252525] rounded-sm">
            Do you want to logout from profile?
          </p>
          <button
            className="block w-1/4 px-2 py-[6px] outline-none bg-[#3797EF] text-white rounded-md hover:bg-[#4fabf1] transition-colors "
            onClick={() => logout()}>
            Logout
          </button>
        </div>

        {/* Delete Account */}
        <h2 className="text-lg font-medium mt-4">Delete Account</h2>
        <div className="flex  items-center gap-x-3 mt-2">
          <p className="flex-1 outline-none py-1 px-2 dark:bg-[#252525] rounded-sm">
            Are you sure you want to delete your account?
          </p>
          <button className="block w-1/4 px-2 py-[6px] outline-none bg-[#ff0000] text-white rounded-md hover:bg-[#f94e4e] transition-colors ">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};
//   "dark:bg-[#363636] dark:text-[#f5f5f5] py-1 px-8 rounded-md hover:transition-colors dark:hover:bg-[#262626]";
// border border-[#DCDCDC] dark:border-[#545454]

export default SettingsPage;
