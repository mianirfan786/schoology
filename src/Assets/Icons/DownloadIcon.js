import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const DownloadIcon = ({width, height, color}) => (
  <Svg height={height} width={width} fill={color} viewBox="0 0 24 24">
    <Path d="M24 22.5c0 .83-.67 1.5-1.5 1.5h-21C.67 24 0 23.33 0 22.5S.67 21 1.5 21h21c.83 0 1.5.67 1.5 1.5ZM2.99 11.74c-.96-.96-1.25-2.4-.73-3.66A3.352 3.352 0 0 1 5.36 6H7V3.5C7 1.57 8.57 0 10.5 0h3C15.43 0 17 1.57 17 3.5V6h1.64c1.37 0 2.58.83 3.1 2.08.52 1.26.23 2.7-.73 3.66l-5.97 5.99c-.84.84-1.94 1.25-3.04 1.25s-2.2-.42-3.04-1.25l-5.97-5.99Zm2.12-2.12 5.98 6c.5.5 1.32.5 1.83 0l5.97-6c.12-.12.14-.25.08-.4s-.17-.23-.34-.23H15.5c-.83 0-1.5-.67-1.5-1.5V3.5c0-.27-.23-.5-.5-.5h-3c-.28 0-.5.22-.5.5v4C10 8.33 9.33 9 8.5 9H5.36c-.16 0-.27.08-.33.23-.06.15-.04.28.08.4Z" />
  </Svg>
);

export default DownloadIcon;
