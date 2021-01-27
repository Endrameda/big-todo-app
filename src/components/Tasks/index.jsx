import React, { useRef } from 'react';
import axios from 'axios';

import './Tasks.scss'

import AddTasksForm from "./AddTasksForm";
import Task from "./Task";

const Tasks = ({ list, onEditTitle, onAddTask, withoutEmpty, onRemoveTasks, onTaskTextEdit }) => {
    const titleRef = useRef()

    const activeContentEditable = () => {
        titleRef.current.setAttribute('contenteditable', true)
        titleRef.current.focus()
    }

    const disableContentEditable = () => {
        titleRef.current.setAttribute('contenteditable', false)
    }

    const handleEditTitle = (e) => {
        activeContentEditable()
    }

    const handleBlurTitle = () => {
        const newTitle = titleRef.current.innerText.trim()
        if ( !newTitle ) return alert('Название листа задачи не может быть пустым, пожалуйста заполнитего его')
        onEditTitle(list.id, titleRef.current.innerText)
        axios.patch(`http://localhost:3001/lists/${ list.id }`, {
            name : newTitle
        }).catch(() => alert('При попытке изменения названия листа задач произошла ошибка, пожалуйста повторите попытку!'))
        disableContentEditable()
    }

    return (
        <div className="tasks">
            <h2 className="tasks__title" style={ { color : list.color.hex } }>
                <span ref={ titleRef } onBlur={ handleBlurTitle }>{ list.name }</span>
                <span className="tasks__edit-icon" onClick={ handleEditTitle }>
					<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
                            d="M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9338 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.6379 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825Z"
                            fill="#DFDFDF"/>
					</svg>
				</span>
            </h2>

            <div className="tasks__list">
                { withoutEmpty && !list.tasks.length && <h2 className={ 'tasks__no-tasks' }>Задачи отсутствуют</h2> }
                { list.tasks &&
                list.tasks.map(item => {
                    return (
                        <Task key={ item.id } { ...item } onRemove={ onRemoveTasks } onEditable={ onTaskTextEdit }/>
                    )
                })
                }
            </div>
            <AddTasksForm key={ list.id } list={ list } onAddTask={ onAddTask }/>
        </div>
    );
};

export default Tasks;
