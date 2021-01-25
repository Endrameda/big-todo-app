import React, { useState } from 'react';
import axios from "axios";

function AddTasksForm ({ list, onAddTask }) {
    const [ isVisibleForm, setIsVisibleForm ] = useState(false)
    const [ inputValue, setInputValue ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)

    const toggleVisibleForm = () => {
        setIsVisibleForm(!isVisibleForm)
        setInputValue('')
    }

    const addTask = () => {
        if (inputValue === '') {
            return alert('Нужно заполнить поле')
        }
        const taskObj = {
            listId : list.id,
            text : inputValue,
            completed : false
        }
        setIsLoading(true)
        axios.post(`http://localhost:3001/tasks/`, taskObj).then(({ data }) => {
            console.log(data)
            onAddTask(list.id, data)
            toggleVisibleForm()
        }).catch(() => {
            alert('Ошибка при добавлении задачи!')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div className={ 'tasks__form' }>
            { !isVisibleForm
                ? <div onClick={ toggleVisibleForm } className="tasks__form-new">
                    <div className="tasks__form-new-icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M8 0C8.55228 0 9 0.447715 9 1V15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15V1C7 0.447715 7.44772 0 8 0Z"
                                  fill="#B4B4B4"/>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M0 8C0 7.44772 0.447715 7 1 7H15C15.5523 7 16 7.44772 16 8C16 8.55228 15.5523 9 15 9H1C0.447715 9 0 8.55228 0 8Z"
                                  fill="#B4B4B4"/>
                        </svg>
                    </div>
                    Новая задача
                </div>
                : <div className="tasks__form-block">
                    <div className="tasks__form-row">
                        <input
                            onChange={ (e) => setInputValue(e.target.value) }
                            value={ inputValue }
                            className={ 'field' }
                            type="text"
                            placeholder={ 'Название папки' }/>
                    </div>
                    <div className="tasks__form-row">
                        <button disabled={ isLoading } onClick={ addTask } className={ 'button button--mr10' }>
                            Добавить задачу
                        </button>
                        <button onClick={ toggleVisibleForm }
                                className={ 'button button--grey' }>
                            Отмена
                        </button>
                    </div>
                </div> }


        </div>
    );
}

export default AddTasksForm;