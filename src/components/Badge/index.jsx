import React from 'react';
import classNames from 'classname';

import './Badge.scss';

const Badge = ({ color, onClick, className }) => (
	<i
		onClick={ onClick }
		className={ classNames('badge', { [`badge--${ color }`]: color }, className) }
	/>
);

export default Badge;