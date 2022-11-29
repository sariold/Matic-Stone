import { Fragment, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// @ts-ignore
import { Carousel } from "react-responsive-carousel";

const CarouselCards = ({ items }) => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    setIngredients(items);
  }, [items]);

  return (
    <Fragment>
      <Carousel
        autplay
        useKeyboardArrows={true}
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
        emulateTouch={true}
      >
        {ingredients.map((c) => (
          <div key={c}>
            <img
              alt=""
              src={
                process.env.REACT_APP_HOMEPAGE +
                "assets/creatures/" +
                c[0] +
                ".png"
              }
            />
            <div className="carousel-badge">
              <p>{"Damage: " + c[2] + " / Health: " + c[3]}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </Fragment>
  );
};

export default CarouselCards;
