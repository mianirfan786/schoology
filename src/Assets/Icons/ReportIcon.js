import React from 'react';
import Svg, { G, Path } from "react-native-svg";

const ReportIcon = ({width, height, color})  => {
  return (
    <Svg fill={color} height={height} viewBox="0 0 24 24" width={width}>
      <Path d="M16 16a1 1 0 0 1-1 1h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2v-2a1 1 0 0 1 2 0v2h2a1 1 0 0 1 1 1Zm6-5.515V19c0 2.757-2.243 5-5 5H7c-2.757 0-5-2.243-5-5V5c0-2.757 2.243-5 5-5h4.515c1.87 0 3.627.728 4.95 2.05l3.485 3.485a6.954 6.954 0 0 1 2.05 4.95Zm-6.95-7.021A5.031 5.031 0 0 0 14 2.659V7c0 .551.449 1 1 1h4.341a5.005 5.005 0 0 0-.805-1.05l-3.485-3.485ZM20 10.485c0-.163-.008-.325-.023-.485H15c-1.654 0-3-1.346-3-3V2.023A5.198 5.198 0 0 0 11.515 2H7C5.346 2 4 3.346 4 5v14c0 1.654 1.346 3 3 3h10c1.654 0 3-1.346 3-3v-8.515Z" />

    </Svg>
  );
};

export default ReportIcon;
