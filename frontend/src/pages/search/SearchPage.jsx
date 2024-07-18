import { useState, useEffect } from "react";
import defaultImage from "../../assets/default.png";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const users = [
    { username: "John Doe", fullname: "John Doe" },
    { username: "Jane Doe", fullname: "Jane Doe" },
    { username: "Mike Doe", fullname: "Mike Doe" },
  ];
  useEffect(() => {
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchedUsers(filteredUsers);
  }, [searchText]);

  return (
    <div className="dark:text-[#f5f5f5] py-8">
      <h1 className="text-[24px] font-[600] px-2">Search</h1>
      {/* Search Bar */}
      <div className="pt-10 pb-7 border-b border-[#DCDCDC] dark:border-[#545454]">
        <input
          className="outline-none py-2 px-2 dark:bg-[#252525] rounded-sm w-full mx-2"
          placeholder="Search for people..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        {searchText && (
          <div className="w-full dark:bg-[#252525] h-[200px] mx-2 mt-2 py-3">
            {searchedUsers.length === 0 && (
              <h1 className="text-center">No user found</h1>
            )}
            {searchedUsers.map((user) => (
              <div
                key={user.username}
                className="flex items-center justify-between px-2 mb-2">
                <div className="flex items-center gap-x-2">
                  <img
                    src={defaultImage}
                    alt={user.username}
                    className="w-[40px] h-[40px] rounded-full"
                  />
                  <div className="text-[14px] font-[600]">
                    <p>{user.fullname}</p>
                    <p className="font-[400] text-[#a8a8a8]">
                      @{user.username}
                    </p>
                  </div>
                </div>
                <button className="text-[14px] font-[600] text-blue-500 mr-2">
                  Follow
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Search */}
      <h2 className="text-[20px] font-[600] px-2 mt-10">Recent</h2>
      <div className="border-b border-[#DCDCDC] dark:border-[#545454] py-2">
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

export default SearchPage;
