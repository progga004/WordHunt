import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-900"></div>
      <p className="text-green-700 font-bold text-3xl mt-4">
        Waiting for other player to choose word...
      </p>
    </div>
  );
};

export default Loader;
