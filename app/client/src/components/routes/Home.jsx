import { Fragment } from "react";
import Button from "../ui/Button";
import Header from "../ui/Header";

const Home = () => {
  return (
    <Fragment>
      <div>
        <Header />
        <div
          className="background text-center"
          style={{ backgroundImage: "url(/assets/Background.jpg)" }}
        >
          <div className="row-lm">
            <Button
              className={"btn-primary m-5"}
              text={"Play Game!"}
              path={"/game"}
            />
          </div>
          <div className="row-lm">
            <Button
              className={"btn-primary m-5"}
              text={"Tutorial!"}
              path={"/"}
            />
          </div>
          <div className="row-lm">
            <Button
              className={"btn-primary m-5"}
              text={"Card Carousel!"}
              path={"/"}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
