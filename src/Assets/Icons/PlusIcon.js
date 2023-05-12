import React from 'react';
import Svg, {  Path } from "react-native-svg";

const PlusIcon = ({width, height, color})  => {
  return (
    <Svg fill={color} height={height} viewBox="0 0 24 24" width={width}>
      <Path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm4 13h-3v3a1 1 0 0 1-2 0v-3H8a1 1 0 0 1 0-2h3V8a1 1 0 0 1 2 0v3h3a1 1 0 0 1 0 2z" />

    </Svg>
  );
};

export default PlusIcon;
