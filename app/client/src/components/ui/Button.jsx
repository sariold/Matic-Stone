import React, { Fragment } from "react"

const Button = (props) => {


    return (
        <Fragment>
            <div className={`btn btn-secondary shadow-lg ${props.className}`}>
                {props.text}
            </div>
        </Fragment>
    )
}

export default Button