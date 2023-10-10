import React from "react";

const CredentialsInput: React.FC = () => {
  return (
    <div className="relative">
      <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-base-content bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 peer" placeholder=" " />
      <label htmlFor="floating_outlined" className="absolute text-sm text-base-content duration-300 bg-base-100 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
        Floating outlined
      </label>
    </div>
  );
};

export default CredentialsInput;
