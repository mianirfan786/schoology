import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const BackArrow = ({width, height, color}) => {
  return (
    <Svg fill={color} height={height} viewBox="0 0 24 24" width={width}>
      <Path d="M10.957 12.354a.5.5 0 0 1 0-.708l4.586-4.585a1.5 1.5 0 0 0-2.121-2.122L8.836 9.525a3.505 3.505 0 0 0 0 4.95l4.586 4.586a1.5 1.5 0 0 0 2.121-2.122Z" />
    </Svg>
  );
};

export default BackArrow;
