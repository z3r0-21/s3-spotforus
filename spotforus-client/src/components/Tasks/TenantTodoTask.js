import React from 'react';
import { useState } from 'react';

function TenantTodoTask({ task, completeTask }) {
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
                <span className="font-bold">Status:</span> {task.status}
            </div>
        </div>
        <div className='flex flex-col gap-2 justify-center'>
            {task.status === "ToBeCompleted" &&
                <>
                    <button onClick={() => completeTask(task)} className="bg-green-500 hover:bg-green-700 text-white font-bold rounded-full py-2 px-4">
                        Mark as completed
                    </button>
                </>
            }
        </div>
    </div>
  )
}

export default TenantTodoTask;