import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={532}
    viewBox="0 0 315 532"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="52" y="80" rx="2" ry="2" width="259" height="236" /> 
    <rect x="125" y="323" rx="0" ry="0" width="109" height="25" /> 
    <rect x="138" y="353" rx="0" ry="0" width="84" height="31" /> 
    <rect x="52" y="389" rx="0" ry="0" width="259" height="33" /> 
    <rect x="52" y="423" rx="0" ry="0" width="259" height="33" />
  </ContentLoader>
)

export default MyLoader

