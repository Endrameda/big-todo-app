import React, { useState, useEffect } from 'react';
import axios from "axios";

import List from "../List";
import Badge from "../Badge";

import './AddList.scss';

import closePopup from '../../assets/img/close-popup.svg';


const AddList = ({ colors, onAdd }) => {
    const [ visiblePopup, setVisiblePopup ] = useState(false)
    const [ selectedColor, setSelectedColor ] = useState(3)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ inputValue, setInputValue ] = useState('');

    useEffect(() => {
        if ( Array.isArray(colors) ) setSelectedColor(colors[0].id)
    }, [ colors ])

    const onClose = () => {
        setInputValue('')
        setVisiblePopup(false)
        setSelectedColor(colors[0].id)
    }

    const addList = () => {
        if ( !inputValue ) {
            alert('Введите названия для списка')
            return
        }
        setIsLoading(true)
        axios.post('http://localhost:3001/lists', {
            name : inputValue,
            colorId : selectedColor
        }).then(({ data }) => {
            const color = colors.find(color => color.id === selectedColor).name
            const listObj = { ...data, color : { name : color } }
            onAdd(listObj)
            onClose()
        }).catch(() => {
            alert('Ошибка при добавлении списка!')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div className={ 'add-list' }>
            <List onClick={ () => setVisiblePopup(!visiblePopup) } items={ [
                {
                    id : 'Добавить список',
                    icon : (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    ),
                    name : 'Добавить список',
                    className : 'list__add-button'
                }
            ] }/>
            { visiblePopup && (
                <div className={ 'add-list__popup' }>
                    <img onClick={ onClose }
                         src={ closePopup }
                         className={ 'add-list__close-popup' }
                         alt="Close popup"/>
                    <input
                        onChange={ (e) => setInputValue(e.target.value) }
                        value={ inputValue }
                        className={ 'field' }
                        type="text"
                        placeholder={ 'Название папки' }/>
                    <div className={ 'add-list__colors' }>
                        {
                            colors.map(color => {
                                return <Badge
                                    onClick={ () => setSelectedColor(color.id) }
                                    className={ selectedColor === color.id && 'active' }
                                    key={ color.id }
                                    color={ color.name }/>
                            })
                        }
                    </div>
                    <button onClick={ addList } className={ 'button button--100 button--mt10' }>
                        { isLoading ? 'Добавление...' : 'Добавить' }
                    </button>
                </div>
            ) }
        </div>
    )
}

export default AddList