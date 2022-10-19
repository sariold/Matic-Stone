import { Fragment } from "react";

const Button = (props) => {
  return (
    <Fragment>
      <a
        href={props.path}
        className={`btn ${props.className}`}
        style={props.style}
      >
        {props.text}
      </a>
    </Fragment>
  );
};

export default Button;
