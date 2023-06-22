import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { fetchGallery } from "../redux/slices/gallery";

export const Gallery = () => {
  const dispatch = useDispatch();
  const { gallery } = useSelector((state) => state.gallery);
  const isGalleryLoading = gallery.status === "loading";

  React.useEffect(() => {
    dispatch(fetchGallery());
  }, []);

  return (
    <div style={{ padding: "50px" }}>
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
                  src={`${process.env.REACT_APP_API_URL}${obj.imageUrl}`}
                  style={{
                    width: "100%",
                    display: "block",
                    borderRadius: "10px",
                  }}
                />
              )
          )}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};
