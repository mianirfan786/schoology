import React from 'react';
import Svg, {Path} from 'react-native-svg';

const CrossIcon = ({color}) => {
  return (
    <Svg height="25" width="30" viewBox="0 0 122.87 122.87">
      <Path
        style={{
          fill: color,
        }}
        d="M18 18A61.45 61.45 0 1 1 0 61.44 61.28 61.28 0 0 1 18 18Zm59.38 21 6.53 6.54a4 4 0 0 1 0 5.63L73.6 61.44l10.31 10.31a4 4 0 0 1 0 5.63l-6.53 6.53a4 4 0 0 1-5.63 0L61.44 73.6 51.13 83.91a4 4 0 0 1-5.63 0L39 77.38a4 4 0 0 1 0-5.63l10.28-10.31L39 51.13a4 4 0 0 1 0-5.63l6.5-6.5a4 4 0 0 1 5.63 0l10.31 10.28L71.75 39a4 4 0 0 1 5.63 0ZM61.44 10.54a50.91 50.91 0 1 0 36 14.91 50.83 50.83 0 0 0-36-14.91Z"
      />
    </Svg>
  );
};

export default CrossIcon;
