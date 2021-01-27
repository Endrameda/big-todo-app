import React from 'react';
import classNames from 'classname';
import axios from 'axios';

import Badge from '../Badge';

import './List.scss';

import removeSvg from '../../assets/img/remove.svg';


const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {
    const removeList = (item) => {
        if ( window.confirm('Вы дейтвительно хотите удалить?') ) {
            axios.delete(`http://localhost:3001/lists/${ item.id }`).then(() => {
                onRemove(item.id)
            })
        }
    }

    return (
        <ul className="list"
            onClick={ onClick ? onClick : null }>
            { items.map(item => {
                return <li key={ item.id }
                           className={ classNames(item.className, {
                               active : item.active
                                   ? item.active
                                   : activeItem && activeItem.id === item.id
                           }) }
                           onClick={ onClickItem ? () => onClickItem(item) : null }
                           title={ item.name }
                >
                    <i>{ item.icon
                        ? item.icon
                        : <Badge color={ item.color.name }/> }</i>
                    <span title={ `${ item.name } ${ item.tasks ? `(${ item.tasks.length })` : '(0)' }` }>
                        { item.name }
                        &nbsp;
                        { item.tasks && `(${ item.tasks.length })` }
                    </span>
                    { isRemovable &&
                    <img onClick={ () => removeList(item) }
                         className={ 'list__delete-icon' }
                         src={ removeSvg }
                         alt="Удалить элемент списка"/> }
                </li>
            }) }
        </ul>
    )
}

export default List;