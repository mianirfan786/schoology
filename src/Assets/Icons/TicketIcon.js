import React from 'react';
import Svg, { G, Path } from "react-native-svg";

const TicketIcon = ({width, height, color})  => {
  return (
    <Svg fill={color} height={height} viewBox="0 0 24 24" width={width}>
      <Path d="M14.5 7h-5a1.5 1.5 0 0 0 0 3h5a1.5 1.5 0 0 0 0-3ZM12.5 12h-3a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 0 0-3Z" />
      <Path d="M15.5 0h-7A5.506 5.506 0 0 0 3 5.5v17a1.5 1.5 0 0 0 2.171 1.342L8.453 22.2l2.8 1.6a1.5 1.5 0 0 0 1.488 0l2.8-1.6 3.282 1.642A1.5 1.5 0 0 0 21 22.5v-17A5.506 5.506 0 0 0 15.5 0ZM18 20.073l-1.83-.915a1.5 1.5 0 0 0-1.415.039L12 20.772 9.245 19.2a1.5 1.5 0 0 0-1.415-.039L6 20.073V5.5A2.5 2.5 0 0 1 8.5 3h7A2.5 2.5 0 0 1 18 5.5Z" />
    </Svg>
  );
};

export default TicketIcon;
