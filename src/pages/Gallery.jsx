import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { fetchGallery } from "../redux/slices/gallery";

export const Gallery = () => {
  const dispatch = useDispatch();
  const { gallery } = useSelector((state) => state.gallery);
  const isGalleryLoading = gallery.status === "loading";

  React.useEffect(() => {
    dispatch(fetchGallery());
  }, []);
  console.log(gallery.items);
  return (
    <div className="wrapper">
      <Header />
      <div style={{ padding: "20px" }}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="20px">
            {(isGalleryLoading ? [...Array(15)] : gallery.items).map(
              (obj, index) =>
                isGalleryLoading ? (
                  <div
                    style={{
                      width: "400px",
                      height: "400px",
                      backgroundColor: "#eee",
                    }}
                  />
                ) : (
                  <img
                    key={index}
                    alt=""
                    src={`http://localhost:4444/${obj.imageUrl}`}
                    style={{ width: "100%", display: "block" }}
                  />
                )
            )}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      <Footer />
    </div>
  );
};
