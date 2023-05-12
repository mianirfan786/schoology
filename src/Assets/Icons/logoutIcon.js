import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const LogoutIcon = ({width, height, color}) => {
  return (
    <Svg fill={color} height={height} viewBox="0 0 24 24" width={width}>
      <Path d="M21 12h-3c-1.103 0-2 .897-2 2s-.897 2-2 2h-4c-1.103 0-2-.897-2-2s-.897-2-2-2H3c-1.654 0-3 1.346-3 3v4c0 2.757 2.243 5 5 5h14c2.757 0 5-2.243 5-5v-4c0-1.654-1.346-3-3-3Zm1 7c0 1.654-1.346 3-3 3H5c-1.654 0-3-1.346-3-3v-4a1 1 0 0 1 1-1l3-.002V14c0 2.206 1.794 4 4 4h4c2.206 0 4-1.794 4-4h3a1 1 0 0 1 1 1v4ZM7.293 7.121a.999.999 0 1 1 1.414-1.414L11 8V1a1 1 0 1 1 2 0v7l2.293-2.293a.999.999 0 1 1 1.414 1.414l-3.293 3.293a1.993 1.993 0 0 1-1.405.584L12 11l-.009-.002a1.993 1.993 0 0 1-1.405-.584L7.293 7.121Z" />

    </Svg>
  );
};

export default LogoutIcon;
