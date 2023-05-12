import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const DocumentIcons = ({width, height, color}) => (
  <Svg height={height} width={width} fill={color} viewBox="0 0 24 24">
    <Path d="M15.5 0h-7A5.507 5.507 0 0 0 3 5.5v13C3 21.532 5.468 24 8.5 24h7c3.032 0 5.5-2.468 5.5-5.5v-13C21 2.468 18.532 0 15.5 0ZM18 18.5c0 1.379-1.121 2.5-2.5 2.5h-7A2.502 2.502 0 0 1 6 18.5v-13C6 4.121 7.121 3 8.5 3h7C16.879 3 18 4.121 18 5.5v13Zm-2-12A1.5 1.5 0 0 1 14.5 8h-5a1.5 1.5 0 0 1 0-3h5A1.5 1.5 0 0 1 16 6.5Zm0 5a1.5 1.5 0 0 1-1.5 1.5h-5a1.5 1.5 0 0 1 0-3h5a1.5 1.5 0 0 1 1.5 1.5Zm-3 5a1.5 1.5 0 0 1-1.5 1.5h-2a1.5 1.5 0 0 1 0-3h2a1.5 1.5 0 0 1 1.5 1.5Z" />

  </Svg>
);

export default DocumentIcons;
