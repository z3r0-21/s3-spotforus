import React from 'react';
import { useState } from 'react';

function CalendarTask({ task, handleStatusChange, deleteTask }) {
  return (
    <div className='flex flex-col sm:flex-row justify-between rounded-lg shadow-md p-2 m-2 gap-2'>
        <div className='flex flex-col text-center sm:text-left'>
            <div className='text-gray-700 mb-2'>
                <span className="font-bold">Type:</span> {task.type}
            </div>
            <div className='text-gray-700 mb-2'>
                <span className="font-bold">Due date:</span> {new Date(task.dueDate).toLocaleDateString()}
            </div>
            <div className='text-gray-700 mb-2'>
                <span className="font-bold">Assignee email:</span> {task.assignee.email}
            </div>
            <div className='text-gray-700 mb-2'>
                <span className="font-bold">Status:</span> {task.status}
            </div>
        </div>
        <div className='flex flex-col gap-2'>
            {task.status === "NotCompleted" &&
                <>
                    <button onClick={() => handleStatusChange(task, "c")} className="bg-green-500 hover:bg-green-700 text-white font-bold rounded-full py-1 px-4">
                        Mark as completed
                    </button>
                    <button onClick={() => handleStatusChange(task, "cl")} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold rounded-full py-1 px-4">
                        Mark as to be completed
                    </button>
                </>
            }
            {(task.status === "Completed" || task.status === "CompletedLate") &&
                <>
                    <button onClick={() => handleStatusChange(task, "nc")} className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-full py-1 px-4">
                        Mark as not completed
                    </button>
                    <button onClick={() => handleStatusChange(task, "cl")} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold rounded-full py-1 px-4">
                        Mark as to be completed
                    </button>
                </>
            }
            {task.status === "ToBeCompleted" &&
                <>
                    <button onClick={() => handleStatusChange(task, "c")} className="bg-green-500 hover:bg-green-700 text-white font-bold rounded-full py-1 px-4">
                        Mark as completed
                    </button>
                    <button onClick={() => handleStatusChange(task, "nc")} className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-full py-1 px-4">
                        Mark as not completed
                    </button>
                </>
            }
        </div>
    </div>
  )
}

export default CalendarTask;