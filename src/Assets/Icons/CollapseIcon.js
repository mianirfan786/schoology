import React from 'react';
import Svg, {Path} from 'react-native-svg';

const CollapseIcon = ({ color }) => {
  return (
    <Svg height="30" width="40" viewBox="0 0 512 512">
      <Path
        style={{
          fill: color,
        }}
        d="M256 512c70.68 0 134.7-28.66 181.02-74.98C483.34 390.7 512 326.69 512 256c0-70.69-28.66-134.7-74.98-181.02C390.7 28.66 326.69 0 256 0 185.31 0 121.3 28.66 74.98 74.98 28.66 121.3 0 185.31 0 256c0 70.69 28.66 134.7 74.98 181.02C121.3 483.34 185.31 512 256 512zM146.96 284.09 256 175.06l109.04 109.03-40.51 40.52-68.52-68.51-68.52 68.52-40.53-40.53z"      />
    </Svg>
  );
};

export default CollapseIcon;
