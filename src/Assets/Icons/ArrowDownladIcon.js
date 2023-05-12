import React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowDownIcon = props => {
    return (
        <Svg height={props.height} width={props.width} viewBox="0 0 122.88 63.9">
            <Path
                fill={props.iconColor}
                fillRule="evenodd"
                d="M61.44 63.9 122.88 0H0l61.44 63.9z"
            />
        </Svg>
    );
};


export default ArrowDownIcon;
