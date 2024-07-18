import { useState } from "react";
import font from "../../assets/font.png";
import invert from "../../assets/invert.png";
import phone from "../../assets/phone.png";
import { Link } from "react-router-dom";
import useDarkmode from "../../hooks/useDrakmode";
import { useQueryClient } from "@tanstack/react-query";
import { LoadingSpinner } from "../index";
import useMutationFunction from "../../hooks/useMutation";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const isDarkMode = useDarkmode();
  const queryClient = useQueryClient();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const {
    mutate: login,
    isPending,
    error,
  } = useMutationFunction(
    "/api/auth/login",
    "POST",
    { email: data.email, password: data.password },
    () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setData({ email: "", password: "" });
    }
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    login(data);
  };
  return (
    <div className="h-screen flex justify-center items-center gap-6">
      <div className="hidden h-full md:flex md:items-center md:justify-center">
        <img
          src={phone}
          alt=""
          className="object-cover object-center lg:h-[95%]"
        />
      </div>
      <div className="login">
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
              className="block w-96 mx-auto mb-2 px-2 py-[5px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#121212] dark:text-[#f2f2f2]"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              required
              className="block w-96 mx-auto mb-2 px-2 py-[8px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#121212] dark:text-[#f2f2f2]"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <div className="text-end my-2">
              <Link to={"/verify"} className="text-sm text-blue-500 ">
                Forgot Password?
              </Link>
            </div>
            {error && (
              <div className="text-red-500 ml-2 text-[12px] font-[400]">
                **{error?.message}
              </div>
            )}
            <button className="block w-96 mx-auto px-2 py-[6px] outline-none bg-[#3797EF] text-white rounded-md hover:bg-[#4fabf1] transition-colors mt-4 mb-1">
              {isPending ? (
                <LoadingSpinner className={"w-5 h-5 mx-auto"} />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
        <div className="w-fit mx-auto relative before after mt-6">
          <span className="text-[#00000050] dark:text-[#f2f2f2]">OR</span>
        </div>
        <div className="text-center mt-6">
          <span className="text-sm dark:text-[#f2f2f2]">
            Don&apos;t have an account?
          </span>
          <Link to={"/signup"} className="text-sm text-blue-500 ml-2">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
