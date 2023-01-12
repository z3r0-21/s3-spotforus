import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HouseholdSchedulePage = ({ householdId }) => {
  const [schedule, setSchedule] = useState([
    [
      {
        type: 'Grocery Shopping',
        assignee: 'John',
        dueDate: 'Monday, January 11th'
      },
      {
        type: 'Laundry',
        assignee: 'Jane',
        dueDate: 'Tuesday, January 12th'
      },
      {
        type: 'Dishwashing',
        assignee: 'John',
        dueDate: 'Wednesday, January 13th'
      }
    ],
    [
      {
        type: 'Yard Work',
        assignee: 'Jane',
        dueDate: 'Monday, January 18th'
      },
      {
        type: 'Cleaning',
        assignee: 'John',
        dueDate: 'Tuesday, January 19th'
      },
      {
        type: 'Babysitting',
        assignee: 'Jane',
        dueDate: 'Saturday, January 23rd'
      }
    ]
  ]);
  const [week, setWeek] = useState(0);

//   useEffect(() => {
//     axios.get(`/api/households/${householdId}/schedule`)
//       .then(res => setSchedule(res.data))
//       .catch(err => console.log(err));
//   }, [householdId]);

  const prevWeek = () => {
    if (week > 0) {
      setWeek(week - 1);
    }
  }
  const nextWeek = () => {
    if (week < schedule.length - 1) {
      setWeek(week + 1);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l" onClick={prevWeek}>Previous Week</button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r" onClick={nextWeek}>Next Week</button>
      </div>
      <div className="flex flex-col">
        {schedule.length > 0 && schedule[week].map((task, index) => (
          <div key={index} className="bg-white rounded-lg p-4 my-2">
            <p className="text-lg font-medium">{task.type}</p>
            <p className="text-gray-600">Assigned To: {task.assignee}</p>
            <p className="text-gray-600">Due Date: {task.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HouseholdSchedulePage;
