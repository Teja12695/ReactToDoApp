import React, { useState } from 'react';
import './ToDo.css';

export default function ToDo() {

  // for tasks
  const [tasks, setTasks] = useState([]);

  //for title of Task
  const [title, setTitle] = useState('');

  //for Description of Title
  const [description, setDescription] = useState('');

  //for filtering of the status of tasks
  const [filter, setFilter] = useState('all');
  const [filteredTasks, setFilteredTasks] = useState([]);


  //to add Tasks from top
  const addTask = () => {
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setTitle('');
    setDescription('');
  };

  // to make changes for completion of task
  const completeTask = (taskId) => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  //to remove task from Task list
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  //user can show his completion tasks or incompletion tasks or all tasks
  const filterTasks = () => {
    switch (filter) {
      case 'incomplete':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  // Update filtered tasks whenever tasks or filter change
  React.useEffect(() => {
    setFilteredTasks(filterTasks());
  }, [tasks, filter]);

  return (

    
    <div className='app'>
      <h1>To do</h1>

      <div className='wrapper'>
        <div className='wrapper-input'>
          <div className='wrapper-input-item'>
            <label>Title</label>
            <input
              type='text'
              placeholder='Add the title of the task'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='wrapper-input-item'>
            <label>Description</label>
            <input
              type='text'
              placeholder='Add the Description of the task'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='wrapper-input-item'>
            <button onClick={addTask} type='button' className='btnprimary'>
              Add
            </button>
          </div>
        </div>

        <div className='btnarea'>
          <button className='btnsecondary' onClick={() => setFilter('all')}>
            All tasks
          </button>
          <button
            className='btnsecondary'
            onClick={() => setFilter('incomplete')}
          >
            Incomplete
          </button>
          <button
            className='btnsecondary'
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <div className='todo-list'>
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`task ${task.completed ? 'completed' : ''}`}
            >
              <div>
                <h4 className={task.completed ? 'completed' : ''}>
                  {task.title}
                </h4>
                <p className={task.completed ? 'completed' : ''}>
                  {task.description}
                </p>
              </div>
              <div>
                <i
                  className={`bx bxs-message-check complete ${task.completed ? '' : ''
                    }`}
                  onClick={() => completeTask(task.id)}
                ></i>
                <i
                  className='bx bxs-message-x delete'
                  onClick={() => deleteTask(task.id)}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
