import React from "react";

const Button = ({ disable, children, className, onClickHandler, type }) => {
  return (
    <button
      disabled={disable}
      type={type}
      className={className}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default Button;
