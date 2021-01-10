import React from 'react';
import classNames from 'classname';
import Badge from "../Badge";

import './List.scss';

const List = ({ items, isRemovable, onClick }) => {
	return (
		<ul className="list"
		    onClick={ onClick }>
			{ items.map(item => (
				<li key={ item.name }
				    className={ classNames(item.className, { 'active': item.active }) }
				    title={ item.name }>
					<i>{ item.icon
						? item.icon
						: <Badge color={ item.color }/> }</i>
					<span>{ item.name }</span>
				</li>
			)) }
		</ul>
	)
}

export default List;