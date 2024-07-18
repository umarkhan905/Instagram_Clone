import defaultImage from "../../../assets/default.png";

const Card = ({ isMyProfile, username, fullname, image, className }) => {
  return (
    <div
      className={`flex justify-between items-center relative ${className} gap-x-[6.3rem]`}>
      <div className="flex items-center">
        <div className="overflow-hidden">
          <img
            src={image || defaultImage}
            alt="User Image"
            className="w-[44px] h-[44px] rounded-full object-cover object-center"
          />
        </div>
        <div className="ml-3 text-[14px]">
          <h2 className="font-[600] dark:text-[#f5f5f5]">{fullname}</h2>
          <p className="font-[400] dark:text-[#A8A8A8]">{username}</p>
        </div>
      </div>

      {isMyProfile && (
        <button className="text-blue-500 text-[12px] transition-colors dark:hover:text-white">
          Switch
        </button>
      )}
      {!isMyProfile && (
        <button className="text-blue-500 text-[12px] transition-colors dark:hover:text-white">
          Follow
        </button>
      )}
    </div>
  );
};

export default Card;
