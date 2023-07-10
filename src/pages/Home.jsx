import React from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { responsive } from "../assets/data/carousel";
import { Product } from "../components/Product";
import axios from "../axios";
import { WhyUs } from "../components/WhyUs";
import { useTranslation } from "react-i18next";
const Home = () => {
  const [t, i18n] = useTranslation("global");

  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [deviceType, setDeviceType] = React.useState("");
  React.useEffect(() => {
    axios
      .get(`/dollsCarousel`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error getting doll!");
      });
    const getDeviceType = () => {
      const { userAgent } = navigator;

      if (/mobile/i.test(userAgent)) {
        return "mobile";
      } else if (/tablet/i.test(userAgent)) {
        return "tablet";
      } else {
        return "desktop";
      }
    };
    // Set the device type in the state
    setDeviceType(getDeviceType());
  }, []);
  if (isLoading) {
    return (
      <div className="carousel-container">
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={false}
          showDots={true}
          ssr={true} // means to render carousel on server-side.
          slidesToSlide={2}
          infinite={true}
          autoPlay={deviceType !== "mobile" ? true : false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5s"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {[...Array(5)].map((obj, index) => (
            <Product key={index} isLoading={true} />
          ))}
        </Carousel>
      </div>
    );
  }
  return (
    <div className="content">
      <div className="recommended">
        <div className="recommended__header">
          <div className="section_header">
            <h3>{t("homepage.recommendedTitle")}</h3>
          </div>
        </div>
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={false}
          showDots={true}
          ssr={true} // means to render carousel on server-side.
          slidesToSlide={2}
          infinite={true}
          autoPlay={deviceType !== "desktop" ? true : false}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all .5s"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {data.map((obj, index) => (
            <Product key={obj.id} {...obj} />
          ))}
        </Carousel>
      </div>
      <WhyUs />
    </div>
  );
};

export default Home;
