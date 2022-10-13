import React, { Fragment } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Footer from "../ui/Footer";
import Header from "../ui/Header";

const Home = () => {
  return (
    <Fragment>
      <Header />
      <div className="container text-center">
        <div className="row ">
          <div className="col ">
            <Card className={"m-3 p-3"}>
                <p>
                    Matic Stone is a Web3 based game using Ethereum based tokens! Also known as NFT's!
                </p>
                <p>
                    Connect with your Meta Mask Wallet to import or buy cards!
                </p>
                
            </Card>
            <Button text={"Play Game!"} />
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Home;
