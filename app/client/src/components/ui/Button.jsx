import React, { Fragment } from "react";

const Button = (props) => {
 

  return (
    <Fragment>
      <a
        href="/game"
        className={`btn shadow-lg ${props.className}`}
        style={props.style}
      >
        {props.text}
      </a>
    </Fragment>
  );
};

export default Button;
