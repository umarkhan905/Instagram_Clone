import { useState } from "react";
import { icons } from "../../components/common/svg/icons";
import lockWhite from "../../assets/lock_w.png";
import lockDark from "../../assets/lock.png";
import useDarkmode from "../../hooks/useDrakmode";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { LoadingSpinner } from "../../components";
import useMutationFunction from "../../hooks/useMutation";

const ForgetPage = () => {
  const isDarkmode = useDarkmode();
  const [formData, setFormData] = useState({
    email: "",
    answer: "",
    password: "",
  });
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const queryClient = useQueryClient();

  const {
    mutate: verifyUser,
    isPending,
    error,
  } = useMutationFunction(
    "/api/auth/verify",
    "POST",
    { email: formData.email },
    (data) => {
      setSecurityQuestion(data);
      setIsVerify(true);
    }
  );
  const {
    mutate: resetPassword,
    isPending: isLoading,
    error: isError,
  } = useMutationFunction(
    "/api/auth/reset-password",
    "PATCH",
    {
      email: formData.email,
      newPassword: formData.password,
      answer: formData.answer,
    },
    () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setFormData({ email: "", answer: "", password: "" });
      setIsVerify(false);
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isVerify ? resetPassword(formData) : verifyUser(formData.email);
  };
  return (
    <div className="dark:text-[#f5f5f5] ">
      <div className="w-full py-3 px-20 border-b border-[#DCDCDC] dark:border-[#545454] sticky top-0 dark:bg-black bg-white">
        {icons.instagram}
      </div>
      <div className="w-full py-12">
        <div className="w-[400px] border border-[#DCDCDC] dark:border-[#545454] mx-auto">
          <div className="rounded-full border-2 w-fit h-fit p-3 mx-auto  mt-4">
            <img
              className="w-14 h-14 object-cover object-center"
              src={isDarkmode ? lockWhite : lockDark}
              alt="lock"
            />
          </div>
          <h1 className="font-[600] text-center mt-3">Trouble logging in?</h1>
          <p className="text-[14px] text-center text-[#a8a8a8] mt-1">
            {isVerify
              ? "Enter you security answer and new password."
              : "Enter your email to verify your identity."}
          </p>
          <form onSubmit={handleSubmit} className="mt-2">
            <input
              required
              readOnly={isVerify}
              className="block w-96 mx-auto mb-2 px-2 py-[5px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#252525] dark:text-[#f2f2f2]"
              type="email"
              name="email"
              value={isVerify ? securityQuestion.email : formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {isVerify && (
              <input
                readOnly={isVerify}
                className="block w-96 mx-auto mb-2 px-2 py-[5px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#252525] dark:text-[#f2f2f2]"
                type="text"
                value={securityQuestion?.question}
              />
            )}
            {isVerify && (
              <input
                autoComplete="off"
                required
                className="block w-96 mx-auto mb-2 px-2 py-[5px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#252525] dark:text-[#f2f2f2]"
                type="text"
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                placeholder="Security answer"
              />
            )}
            {isVerify && (
              <input
                required
                className="block w-96 mx-auto mb-2 px-2 py-[5px] outline-none bg-[#f2f2f2] rounded-sm placeholder:text-gray-400 dark:bg-[#252525] dark:text-[#f2f2f2]"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="New password"
              />
            )}
            {error ||
              (isError && (
                <div className="text-red-500 ml-2 text-[12px] font-[400]">
                  **{error?.message || isError?.message}
                </div>
              ))}
            <button className="block w-96 mx-auto px-2 py-[6px] outline-none bg-[#3797EF] text-white rounded-md hover:bg-[#4fabf1] transition-colors mt-2 mb-1">
              {isPending || isLoading ? (
                <LoadingSpinner className={"w-5 h-5 mx-auto"} />
              ) : isVerify ? (
                "Change Password"
              ) : (
                "Verify"
              )}
            </button>
          </form>
          <div className="w-fit mx-auto relative before after mt-6">
            <span className="text-[#00000050] dark:text-[#f2f2f2]">OR</span>
          </div>
          <div className="text-center mt-6">
            <Link to={"/signup"} className="text-sm text-blue-500 ml-2">
              Create new account
            </Link>
          </div>
          <Link
            className="block dark:bg-[#252525] mt-3 py-2 text-center font-medium"
            to={"/login"}>
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPage;
