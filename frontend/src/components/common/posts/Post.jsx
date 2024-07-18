import { useState } from "react";
import defaultImage from "../../../assets/default.png";
import { BsThreeDots } from "react-icons/bs";
import { icons } from "../svg/icons";
import { MdEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import useDarkmode from "../../../hooks/useDrakmode";

const Post = ({ setShowModal }) => {
  const [showMore, setShowMore] = useState(false);
  const [comment, setComment] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const isDarkMode = useDarkmode();

  window.addEventListener("click", () => setShowEmoji(false));

  const isPostImage = true;
  const isPostText = false;

  return (
    <div className="w-[468px] mx-auto dark:text-[#f5f5f5] relative mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="overflow-hidden">
            <img
              src={defaultImage}
              className="w-10 h-10 rounded-full object-cover object-center"
              alt=""
            />
          </div>
          <span className="text-[14px] font-[600] text-[#f5f5f5] ml-2">
            isprofficial1
          </span>
          <span className="ml-2 text-[#a8a8a8] font-[400] text-[14px]">
            - 10h
          </span>
        </div>
        <div className="text-lg">
          <BsThreeDots />
        </div>
      </div>
      {isPostImage && (
        <div className="image border border-[#dbdbdb] dark:border-[#262626] mt-3 overflow-hidden rounded-md">
          <img
            src={
              "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1720569600&semt=sph"
            }
            alt=""
            className="h-[468px] object-cover object-center rounded-md"
          />
        </div>
      )}
      {isPostText && (
        <div className="image border border-[#dbdbdb] dark:border-[#262626] mt-3 rounded-md h-[468px] bg-pink-500">
          <p>Awesome Post</p>
        </div>
      )}
      {/* Buttons */}
      <div className="flex items-center justify-between mt-3 mb-1">
        <div className="flex items-center gap-x-4">
          <button className="hover:transition-colors hover:text-[#a8a8a8]">
            {icons.notifications}
          </button>
          <button className="hover:transition-colors hover:text-[#a8a8a8]">
            {icons.comment}
          </button>
          <button className="hover:transition-colors hover:text-[#a8a8a8]">
            {icons.messages}
          </button>
        </div>
        <div>
          <button className="hover:transition-colors hover:text-[#a8a8a8]">
            {icons.save}
          </button>
        </div>
      </div>
      {/* Likes */}
      <span className="text-[14px] font-[600]">1,229 likes</span>
      <div>
        <span className="text-[14px] font-[600] text-[#f5f5f5]">
          isprofficial1
        </span>
        {showMore && (
          <div className="text-[14px] mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            cumque at, adipisci, obcaecati sapiente a accusantium aliquam
            nesciunt nostrum quo facere eligendi. Accusamus, sapiente. Ullam
            earum dolorem sunt tenetur ducimus.
            <br />
            <br />
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor
            beatae iure veniam inventore totam! Iusto quaerat voluptatibus
            atque, inventore sed asperiores provident doloremque iste facilis
            aliquid aperiam deserunt ipsa fugiat?
          </div>
        )}
        {!showMore && (
          <button onClick={() => setShowMore(true)}>
            ... <span className="text-[14px] text-[#a8a8a8]">more</span>
          </button>
        )}
      </div>
      {/* Comments */}
      <span
        className="text-[14px] text-[#a8a8a8] font-[400] cursor-pointer"
        onClick={() => setShowModal(true)}>
        View all 178 comments
      </span>
      <div className="border-b border-[#dbdbdb] dark:border-[#262626] flex justify-between items-center py-3">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 bg-transparent outline-none px-1 placeholder:text-[14px] placeholder:text-[#a8a8a8] placeholder:font-[400]"
          placeholder="Add a comment..."
        />
        <div className="flex items-center">
          {comment && (
            <button className="text-[14px] text-blue-500 hover:transition-colors hover:text-white mr-2">
              Post
            </button>
          )}
          <MdEmojiEmotions
            className="text-[#a8a8a8] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setShowEmoji(true);
            }}
          />
        </div>
      </div>
      <div
        className={`emoji_picker absolute ${
          showEmoji ? "bottom-12" : "bottom-0"
        } -right-[120px] transition-all`}
        onClick={(e) => e.stopPropagation()}>
        <EmojiPicker
          theme={isDarkMode ? "dark" : "light"}
          onEmojiClick={(e) => {
            setComment((prev) => prev + e.emoji);
          }}
          searchDisabled={true}
          skinTonesDisabled={true}
          previewConfig={{
            showPreview: false,
          }}
          open={showEmoji}
          height={"300px"}
          width={"270px"}
        />
      </div>
    </div>
  );
};

export default Post;
