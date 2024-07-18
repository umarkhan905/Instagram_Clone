import { useState } from "react";
import font from "../../assets/font.png";
import invert from "../../assets/invert.png";
import phone from "../../assets/phone.png";
import { Link } from "react-router-dom";
import useDarkmode from "../../hooks/useDrakmode";
import { useQueryClient } from "@tanstack/react-query";
import { LoadingSpinner } from "../index";
import useMutationFunction from "../../hooks/useMutation";

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    question: "What's your pet's name?",
    answer: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const isDarkMode = useDarkmode();
  const queryClient = useQueryClient();

  // Request Handler Hook
  const {
    mutate: signup,
    isPending,
    error,
  } = useMutationFunction(
    "/api/auth/signup",
    "POST",
    {
      username: data.username,
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      question: data.question,
      answer: data.answer,
    },
    () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setData({
        username: "",
        fullname: "",
        email: "",
        password: "",
        question: "What's your pet's name?",
        answer: "",
      });
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(data);
  };
  return (
    <div className="h-screen flex justify-center items-center gap-6 dark:text-[#f5f5f5]">
      <div className="hidden h-full md:flex md:items-center md:justify-center">
        <img
          src={phone}
          alt=""
          className="object-cover object-center lg:h-[95%]"
        />
      </div>
      <div className="signup">
        <div className="w-52 mx-auto">
          {isDarkMode ? (
            <img src={invert} alt="Instagram White Text Logo" />
          ) : (
            <img src={font} alt="Instagram Black Text Logo" />
          )}
        </div>
        <div className=" w-fit mx-auto px-3 py-2">
          <form onSubmit={handleSubmit}>
            <input
              required
              className="block w-96 mx-auto mb-2 px-2 py-[5px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#252525] dark:text-[#f2f2f2]"
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              placeholder="@username"
            />
            <input
              required
              className="block w-96 mx-auto mb-2 px-2 py-[5px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#252525] dark:text-[#f2f2f2]"
              type="text"
              name="fullname"
              value={data.fullname}
              onChange={handleChange}
              placeholder="Fullname"
            />
            <input
              required
              className="block w-96 mx-auto mb-2 px-2 py-[5px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#252525] dark:text-[#030303]"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              required
              className="block w-96 mx-auto mb-2 px-2 py-[8px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#252525] dark:text-[#f2f2f2]"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <p className="text-sm mb-2 text-blue-500">
              Security Question
              <span className="text-red-500">*</span>
            </p>
            <select
              required
              className="block w-96 mx-auto mb-2 px-2 py-[8px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#252525] dark:text-[#f2f2f2]"
              name="question"
              value={data.question}
              onChange={handleChange}>
              <option value="What's your pet's name?">
                What&apos;s your pet&apos;s name?
              </option>
              <option value="What's your favorite place?">
                What&apos;s your favorite place?
              </option>
              <option value="What's your favorite book?">
                What&apos;s your favorite book?
              </option>
            </select>
            <input
              autoComplete="off"
              required
              className="block w-96 mx-auto mb-2 px-2 py-[8px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#252525] dark:text-[#f2f2f2]"
              type="text"
              name="answer"
              value={data.answer}
              onChange={handleChange}
              placeholder="Security Answer"
            />
            {error && (
              <div className="text-red-500 ml-2 text-[12px] font-[400]">
                **{error?.message}
              </div>
            )}
            <button className="block w-96 mx-auto px-2 py-[6px] outline-none bg-[#3797EF] text-white rounded-md hover:bg-[#4fabf1] transition-colors mt-4 mb-1">
              {isPending ? (
                <LoadingSpinner className={"w-5 h-5 mx-auto"} />
              ) : (
                "Signup"
              )}
            </button>
          </form>
        </div>
        <div className="w-fit mx-auto relative before after mt-6">
          <span className="text-[#00000050] dark:text-[#f2f2f2]">OR</span>
        </div>
        <div className="text-center mt-6">
          <span className="text-sm dark:text-[#f2f2f2]">
            Already have an account?
          </span>
          <Link to={"/login"} className="text-sm text-blue-500 ml-2">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
