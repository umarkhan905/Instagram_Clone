import { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoAdd } from "react-icons/io5";
import { RiInformation2Fill } from "react-icons/ri";
import { FaMinus } from "react-icons/fa6";

const EditModal = ({ setShowEditModal, showEditModal }) => {
  const [links, setLinks] = useState([
    {
      id: Date.now(),
      title: "",
      url: "",
    },
  ]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowEditModal(false);
    console.log(links);
  };
  return (
    <div
      className={`${
        showEditModal ? "block" : "hidden"
      } fixed top-0 left-0 w-full h-screen dark:bg-[#00000090] z-50`}>
      <div className="w-[98%] sm:w-[80%] dark:bg-black mx-auto  my-3 border  border-[#dbdbdb] dark:border-[#262626] dark:text-[#f5f5f5]">
        <div className="flex items-center justify-end pt-2 px-2">
          <button
            className="text-3xl font-extrabold text-[#f5f5f5]"
            onClick={() => setShowEditModal(false)}>
            <HiOutlineXMark />
          </button>
        </div>
        <div className="px-2 pb-2">
          <h1 className="font-medium text-lg">Edit Profile</h1>
          <form action="" onSubmit={handleSubmit}>
            <input
              className="block w-full px-2 py-[6px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#121212] dark:text-[#f2f2f2] mb-2"
              type="text"
              placeholder="Fullname"
            />
            <input
              className="block w-full px-2 py-[6px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#121212] dark:text-[#f2f2f2] mb-2"
              type="text"
              placeholder="Username"
            />
            <input
              className="block w-full px-2 py-[6px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#121212] dark:text-[#f2f2f2] mb-2"
              type="email"
              placeholder="Email"
            />
            <div className="flex gap-x-3">
              <input
                className="block w-1/2 px-2 py-[6px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#121212] dark:text-[#f2f2f2] mb-2"
                type="password"
                placeholder="Current Password"
              />
              <input
                className="block w-1/2 px-2 py-[6px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#121212] dark:text-[#f2f2f2] mb-2"
                type="password"
                placeholder="New Password"
              />
            </div>
            <textarea
              className="block w-full px-2 py-[6px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#121212] dark:text-[#f2f2f2] resize-none"
              type="text"
              placeholder="Bio"></textarea>
            <div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h2 className="font-medium text-lg mb-2">
                    Social Media Links
                  </h2>
                  <span className="ml-2 cursor-pointer">
                    <RiInformation2Fill />
                  </span>
                </div>
                <button
                  className="bg-gray-500 p-1 rounded-full text-lg cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setLinks(
                      links.length < 3
                        ? [...links, { id: Date.now(), title: "", url: "" }]
                        : links
                    );
                  }}>
                  <IoAdd />
                </button>
              </div>
              {links.map((link, ind) => (
                <div className="flex gap-x-2 mb-2" key={link.id}>
                  <input
                    className="block w-1/2 px-2 py-[6px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#121212] dark:text-[#f2f2f2]"
                    type="text"
                    placeholder="Title"
                    value={link.title}
                    onChange={(e) =>
                      setLinks(
                        links.map((item, index) =>
                          index === ind
                            ? { ...item, title: e.target.value }
                            : item
                        )
                      )
                    }
                  />
                  <input
                    className="block w-1/2 px-2 py-[6px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#121212] dark:text-[#f2f2f2]"
                    value={link.url}
                    type="text"
                    placeholder="URL"
                    onChange={(e) =>
                      setLinks(
                        links.map((item, index) =>
                          index === ind
                            ? { ...item, url: e.target.value }
                            : item
                        )
                      )
                    }
                  />
                </div>
              ))}
            </div>
            <button className="block w-full px-2 py-[6px] outline-none bg-[#3797EF] text-white rounded-md hover:bg-[#4fabf1] transition-colors mt-4 mb-1">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
