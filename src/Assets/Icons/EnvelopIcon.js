import React from 'react';
import Svg, { G, Path } from "react-native-svg";

const EnvelopIcon = ({width, height, color})  => {
  return (
    <Svg fill={color} height={height} viewBox="0 0 24 24" width={width}>
      <Path d="m22.306 7.827-6.545-6.27a5.319 5.319 0 0 0-7.5-.021L1.694 7.827A5.527 5.527 0 0 0 0 11.8v6.7A5.506 5.506 0 0 0 5.5 24h13a5.506 5.506 0 0 0 5.5-5.5v-6.7a5.527 5.527 0 0 0-1.694-3.973ZM10.36 3.68a2.329 2.329 0 0 1 3.3.021l5.382 5.156-5.276 5.411a2.56 2.56 0 0 1-3.536 0L4.887 8.923ZM21 18.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-6.7a2.41 2.41 0 0 1 .049-.473l5.062 5.063a5.524 5.524 0 0 0 7.791-.013l5.024-5.151A2.454 2.454 0 0 1 21 11.8Z" />
    </Svg>
  );
};

export default EnvelopIcon;
