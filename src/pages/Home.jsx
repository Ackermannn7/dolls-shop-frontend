import React from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { responsive } from "../assets/data/carousel";
import { Product } from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/dolls";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { dolls } = useSelector((state) => state.dolls);
  const isProductLoading = dolls.status === "loading";

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="wrapper">
      <div className="content">
        <div className="recommended">
          <div className="recommended__header">
            <div className="section_header">
              <h3>Recommended Dolls</h3>
            </div>
          </div>
          <Carousel
            responsive={responsive}
            swipeable={false}
            draggable={false}
            showDots={true}
            ssr={true} // means to render carousel on server-side.
            slidesToSlide={2}
            infinite={true}
            // autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5s"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            // deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {(isProductLoading ? [...Array(5)] : dolls.items).map(
              (obj, index) =>
                isProductLoading ? (
                  <Product key={index} isLoading={true} />
                ) : (
                  <Product key={obj.id} {...obj} />
                )
            )}
          </Carousel>
        </div>
        <div className="whyUs">
          <div className="section_header">
            <h3>Why Dolls For All?</h3>
          </div>
          <p className="description">
            <ul>
              <li>
                <h4 className="description__header">
                  Exquisite Craftsmanship:
                </h4>{" "}
                Each doll in our shop is meticulously handcrafted by skilled
                artisans who pour their heart and soul into every creation. From
                the delicate stitching to the intricately painted features, our
                dolls reflect the dedication and artistry of our talented
                craftsmen.
              </li>
              <li>
                <h4 className="description__header">Uniquely Personalized:</h4>{" "}
                We understand that every customer is looking for something
                special and one-of-a-kind. That's why we offer a range of
                customization options to make your doll truly unique. From
                choosing hair color and style to selecting outfits and
                accessories, you have the opportunity to create a doll that
                perfectly captures your vision.
              </li>
              <li>
                <h4 className="description__header">Quality Materials:</h4> We
                believe in using only the finest materials to ensure that our
                dolls are of the highest quality. From premium fabrics to
                non-toxic paints, we prioritize safety and durability, ensuring
                that your doll can be cherished for years to come.
              </li>
              <li>
                <h4 className="description__header">Attention to Detail:</h4> We
                believe that it's the little details that make a doll truly
                special. Our artisans pay close attention to every tiny detail,
                from the intricate facial expressions to the carefully chosen
                embellishments. These details bring our dolls to life and add an
                extra touch of magic.
              </li>
              <li>
                <h4 className="description__header">
                  Imaginative Play and Emotional Connection:
                </h4>{" "}
                Our dolls are not just toys; they are companions that inspire
                imaginative play and foster emotional connections. Whether it's
                a doll for a child to play with or a special keepsake for
                collectors, our dolls have the power to ignite imagination and
                create lasting memories.
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
