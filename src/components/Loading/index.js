import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="loading">
      <h3>
        <AiOutlineLoading3Quarters className="icon-loading" />
      </h3>
    </div>
  );
};

export default Loading;
