import React, { useRef, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import defaultImage from "../../../assets/default.png";
import { Comment } from "../../";
import { icons } from "../svg/icons";
import EmojiPicker from "emoji-picker-react";
import useDarkmode from "../../../hooks/useDrakmode";

const CommentModal = ({ showModal, setShowModal }) => {
  const commentRef = useRef(null);
  const [comment, setComment] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const isDarkMode = useDarkmode();
  window.addEventListener("click", () => setShowEmoji(false));
  const comments = [
    {
      id: 1,
      username: "isprofficial1",
      comment: "Nice post!",
      createdAt: "2h",
    },
    {
      id: 2,
      username: "isprofficial2",
      comment: "This is amazing!",
      createdAt: "Just now",
    },
    {
      id: 3,
      username: "isprofficial3",
      comment: "I agree!",
      createdAt: "10h",
    },
    {
      id: 4,
      username: "isprofficial4",
      comment:
        "Me too!  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste consequuntur illo non adipisci perspiciatis vitae, numquam magni totam sapiente quibusdam ea iusto dignissimos dicta! Dolorum, dolor. Asperiores veniam repudiandae non odit eos, saepe vero nostrum. Saepe recusandae mollitia ad veritatis!",
      createdAt: "10h",
    },
    {
      id: 5,
      username: "isprofficial5",
      comment:
        " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste consequuntur illo non adipisci perspiciatis vitae, numquam magni totam sapiente quibusdam ea iusto dignissimos dicta! Dolorum, dolor. Asperiores veniam repudiandae non odit eos, saepe vero nostrum. Saepe recusandae mollitia ad veritatis!",
      createdAt: "10h",
    },
  ];
  return (
    <div
      className={`${
        showModal ? "block" : "hidden"
      } w-screen h-screen fixed top-0 left-0 bg-[#00000090] z-50  dark:text-[#f5f5f5]`}>
      <div className="flex justify-end dark:text-[#f5f5f5] sm:pt-5 px-5 text-3xl font-extrabold">
        <HiOutlineXMark
          className="cursor-pointer"
          onClick={() => setShowModal(false)}
        />
      </div>
      <div className="max-w-[80%] mx-auto max-h-[500px] dark:bg-black flex">
        <div className="w-1/2 bg-red-100 h-[500px] lg:block hidden"></div>
        <div className="w-full lg:w-1/2  lg:border-l border-[#dbdbdb] dark:border-[#262626] relative">
          <div className="flex items-center border-b  p-2 border-[#dbdbdb] dark:border-[#262626]">
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

          {/* Comments */}
          <div className="flex flex-col w-full h-[65%] overflow-y-scroll p-2">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                username={comment.username}
                comment={comment.comment}
                date={comment.createdAt}
              />
            ))}
          </div>
          <div className=" px-2 border-[#dbdbdb] dark:border-[#262626] border-y py-3">
            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <button className="hover:transition-colors hover:text-[#a8a8a8]">
                  {icons.notifications}
                </button>
                <button
                  className="hover:transition-colors hover:text-[#a8a8a8]"
                  onClick={() => commentRef.current.focus()}>
                  {icons.comment}
                </button>
              </div>
              <div>
                <button className="hover:transition-colors hover:text-[#a8a8a8]">
                  {icons.save}
                </button>
              </div>
            </div>
            {/* Likes */}
            <span className="text-[14px] font-[600] px-2">1,229 likes</span>
          </div>
          {/* Write a comment */}
          <div className="flex items-center px-2 h-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowEmoji(true);
              }}>
              {icons.emoji}
            </button>
            <input
              type="text"
              className="flex-1 outline-none bg-transparent ml-2 h-full"
              placeholder="Add a comment..."
              ref={commentRef}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {comment && (
              <button className="text-[14px] text-blue-500 hover:transition-colors hover:text-white ml-2">
                Post
              </button>
            )}
          </div>
          <div
            className={`emoji_picker absolute bottom-12 left-0 transition-all`}
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
      </div>
    </div>
  );
};

export default CommentModal;
