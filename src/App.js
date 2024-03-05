import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showUpdate, setShowUpdate] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showUpdateDeleteIndex, setShowUpdateDeleteIndex] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleAddTask = () => {
    // Check if both title and description are non-empty
    if (title.trim() !== '' && description.trim() !== '') {
      if (updateMode) {
        // Update existing task
        const updatedTasks = [...tasks];
        updatedTasks[deleteIndex] = { title, description };
        setTasks(updatedTasks);
        setUpdateMode(false);
      } else {
        // Add new task
        const newTask = { title, description };
        setTasks([...tasks, newTask]);
      }
      setTitle('');
      setDescription('');
    } else {
      // Display an alert or handle the validation error as needed
      
    }
  };
  

  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((task, index) => index !== deleteIndex);
    setTasks(updatedTasks);
    setShowUpdate(false); // Hide update/delete buttons
    setShowDeleteConfirmation(false); // Hide delete confirmation modal
  };

  const handleUpdateTask = () => {
    // Prefill input fields with the task to be updated
    const updatedTasks = tasks.filter((task, index) => index !== deleteIndex);
    setTasks(updatedTasks);
    setShowUpdate(false);
    setTitle(tasks[deleteIndex].title);
    setDescription(tasks[deleteIndex].description);
    setShowUpdate(true); // Display input fields for editing
    setUpdateMode(true);
  };

  return (
    <div className="App">
      <div className="title-bar">
        <div className="left-div">
          <div style={{ backgroundColor: '#242320' }}>
            <div style={{ fontWeight: 'bold', backgroundColor: '#242320' }}>GYIZER</div>
            <ul style={{ listStyleType: 'none', backgroundColor: '#242320', padding: 0 }}>
              <li style={{ fontSize: '0.8em', backgroundColor: '#242320' }}>TODO APP</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="add-task">
        <div className="input-container">
          <input
            type="text"
            value={title}
            placeholder=" title.."
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={description}
            placeholder=" input.."
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='add-task-button'>
          <button onClick={handleAddTask}>
            {updateMode ? 'Update' : '+'}
          </button>
        </div>
      </div>
      <div className="task-container">
        {tasks.length === 0 ? (
          <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', backgroundColor: '#242320' }}>
            <p style={{ backgroundColor: '#242320' }}>No tasks</p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <div className="task" key={index} style={{ backgroundColor: '#242320', border: 'px solid #A35709' }}>
              <div className='task-content'>
                <div style={{ fontWeight: 'bold', backgroundColor: '#242320' }}>{task.title}</div>
                <div style={{ fontSize: '0.8em', backgroundColor: '#242320' }}>{task.description}</div>
              </div>
              <div className='update-delete'>
                {showUpdateDeleteIndex === index ? (
                  <div>
                    <button onClick={handleUpdateTask}><svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.5" y="0.5" width="35" height="35" rx="5.5" fill="#2B2A27" stroke="#A35709" />
                      <g clip-path="url(#clip0_23_318)">
                        <path d="M12 21.5V24H14.5L21.8733 16.6267L19.3733 14.1267L12 21.5ZM23.8067 14.6933C24.0667 14.4333 24.0667 14.0133 23.8067 13.7533L22.2467 12.1933C21.9867 11.9333 21.5667 11.9333 21.3067 12.1933L20.0867 13.4133L22.5867 15.9133L23.8067 14.6933Z" fill="#D9D9D9" />
                      </g>
                      <defs>
                        <clipPath id="clip0_23_318">
                          <rect width="16" height="16" fill="white" transform="translate(10 10)" />
                        </clipPath>
                      </defs>
                    </svg>
                    </button>
                    <button onClick={() => setShowDeleteConfirmation(true)}><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="1" width="30" height="30" rx="4" fill="#23221F" stroke="#A35709" stroke-width="2" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0908 12.121C12.823 11.8532 12.3888 11.8532 12.1211 12.121C11.8533 12.3888 11.8533 12.8229 12.1211 13.0907L14.3232 15.2929C14.7138 15.6834 14.7138 16.3166 14.3232 16.7071L12.1211 18.9093C11.8533 19.1771 11.8533 19.6112 12.1211 19.879C12.3889 20.1468 12.8231 20.1468 13.0909 19.879L15.293 17.6769C15.6835 17.2864 16.3167 17.2864 16.7072 17.6769L18.9093 19.879C19.1771 20.1467 19.6112 20.1467 19.879 19.879C20.1468 19.6112 20.1468 19.177 19.879 18.9092L17.6769 16.7071C17.2864 16.3166 17.2864 15.6834 17.6769 15.2929L19.8791 13.0908C20.1469 12.823 20.1469 12.3888 19.8791 12.121C19.6113 11.8533 19.1771 11.8533 18.9093 12.121L16.7072 14.3232C16.3167 14.7137 15.6835 14.7137 15.293 14.3232L13.0908 12.121Z" fill="#FF8303" />
                    </svg>
                    </button>
                  </div>
                ) : (
                  <button onClick={() => {
                    setDeleteIndex(index);
                    setShowUpdateDeleteIndex(index);
                  }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.5" y="0.5" width="35" height="35" rx="5.5" fill="#2B2A27" stroke="#A35709" />
                      <path d="M19.6328 14.5469V23H17.375V14.5469H19.6328ZM17.2344 12.3438C17.2344 12.0156 17.349 11.7448 17.5781 11.5312C17.8073 11.3177 18.1146 11.2109 18.5 11.2109C18.8802 11.2109 19.1849 11.3177 19.4141 11.5312C19.6484 11.7448 19.7656 12.0156 19.7656 12.3438C19.7656 12.6719 19.6484 12.9427 19.4141 13.1562C19.1849 13.3698 18.8802 13.4766 18.5 13.4766C18.1146 13.4766 17.8073 13.3698 17.5781 13.1562C17.349 12.9427 17.2344 12.6719 17.2344 12.3438Z" fill="white" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {showDeleteConfirmation && (
        <div className="delete-confirmation-modal">
          <div className="modal-background">
            <div className="button-container">
              <div className="no-button">
                <div onClick={() => setShowDeleteConfirmation(false)} className="button-text">No</div>
              </div>
              <div className="yes-button">
                <div onClick={handleDeleteTask} className="button-text">Yes</div>
              </div>
            </div>
          </div>
          <div className="confirmation-text">Delete this task?</div>
          <div className="confirmation-background"></div>
        </div>

      )}
    </div>
  );
}

export default App;
