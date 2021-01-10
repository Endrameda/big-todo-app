import React, { useState } from 'react';
import List from "../List";

import './AddList.scss';
import Badge from "../Badge";

import closePopup from '../../assets/img/close-popup.svg';

const AddList = ({ colors }) => {
	const [ visiblePopup, setVisiblePopup ] = useState(false)
	const [ selectedColor, setSelectedColor ] = useState(colors[0].id)
	
	let colorsArray = colors.map(color => {
		return <Badge
			onClick={ () => setSelectedColor(color.id) }
			className={ selectedColor === color.id && 'active' }
			key={ color.id }
			color={ color.name }/>
	})
	
	return (
		<div className={ 'add-list' }>
			<List onClick={ () => setVisiblePopup(!visiblePopup) } items={ [
				{
					icon: (
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round"
							      strokeLinejoin="round"/>
							<path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round"
							      strokeLinejoin="round"/>
						</svg>
					),
					name: 'Добавить список',
					className: 'list__add-button'
				}
			] }/>
			{ visiblePopup && (
				<div className={ 'add-list__popup' }>
					<img onClick={ () => setVisiblePopup(false) }
					     src={ closePopup }
					     className={ 'add-list__close-popup' }
					     alt="Close popup"/>
					<input className={ 'field' } type="text" placeholder={ 'Название папки' }/>
					<div className={ 'add-list__colors' }>
						{ colorsArray }
					</div>
					<button className={ 'button button--100 button--mt10' }>Добавить</button>
				</div>
			) }
		</div>
	)
}

export default AddList