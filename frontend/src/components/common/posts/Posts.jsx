import { useState } from "react";
import { CommentModal, Post } from "../..";

const Posts = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="w-full mt-4 mb-16 sm:mb-0">
      <Post setShowModal={setShowModal} />
      <Post setShowModal={setShowModal} />
      <CommentModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default Posts;
