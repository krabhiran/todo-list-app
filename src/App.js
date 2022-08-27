import React, { useState } from 'react';
import NavBar from './components/NavBar';
import ListTask from './components/ListTask';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  const [currentTheme, setCurrentTheme] = useState(false);

  const [taskData, setTaskData] = useState([
    {
      id: 'TL1',
      title: 'Frontend development',
      status: 'In Progress',
      deadline: '2022-08-24T12:15:55.000Z',
      priority: 'High',
      progress: 60,
      description: 'Develop the UI for the todo list application',
      workflow: [
        {
          dateOfChange: '2022-08-20T12:30:55.000Z',
          workflowData: [
            {
              fieldValue: 'Title',
              oldValue: 'Not avaliable',
              newValue: 'Frontend development',
              remarks: 'Task created'
            },
            {
              fieldValue: 'Status',
              oldValue: 'Not avaliable',
              newValue: 'In Progress',
              remarks: 'Task created'
            },
            {
              fieldValue: 'Deadline',
              oldValue: 'Not avaliable',
              newValue: '2022-08-24T12:15:55.000Z',
              remarks: 'Task created'
            },
            {
              fieldValue: 'Priority',
              oldValue: 'Not avaliable',
              newValue: 'High',
              remarks: 'Task created'
            },
            {
              fieldValue: 'Progress',
              oldValue: 'Not avaliable',
              newValue: 60,
              remarks: 'Task created'
            },
            {
              fieldValue: 'Description',
              oldValue: 'Not avaliable',
              newValue: 'Develop the UI for the todo list application',
              remarks: 'Task created'
            }
          ]
        }
      ]
    },
    {
      id: 'TL2',
      title: 'Backend development',
      status: 'Completed',
      deadline: '2022-08-15T05:00:02.000Z',
      priority: 'Critical',
      progress: 100,
      description: 'Develop the services for the todo list application',
      workflow: [
        {
          dateOfChange: '2022-08-10T05:45:27.000Z',
          workflowData: [
            {
              fieldValue: 'Title',
              oldValue: 'Not avaliable',
              newValue: 'Backend development',
              remarks: 'Task created'
            },
            {
              fieldValue: 'Status',
              oldValue: 'Not avaliable',
              newValue: 'Not Started',
              remarks: 'Task created'
            },
            {
              fieldValue: 'Deadline',
              oldValue: 'Not avaliable',
              newValue: '2022-08-15T05:00:02.000Z',
              remarks: 'Task created'
            },
            {
              fieldValue: 'Priority',
              oldValue: 'Not avaliable',
              newValue: 'Critical',
              remarks: 'Task created'
            },
            {
              fieldValue: 'Progress',
              oldValue: 'Not avaliable',
              newValue: 0,
              remarks: 'Task created'
            },
            {
              fieldValue: 'Description',
              oldValue: 'Not avaliable',
              newValue: 'Develop the services for the todo list application',
              remarks: 'Task created'
            }
          ]
        },
        {
          dateOfChange: '2022-08-12T10:00:12.000Z',
          workflowData: [
            {
              fieldValue: 'Status',
              oldValue: 'Not Started',
              newValue: 'Completed',
              remarks: 'Task updated'
            },
            {
              fieldValue: 'Progress',
              oldValue: 0,
              newValue: 100,
              remarks: 'Task updated'
            }
          ]
        }
      ]
    }
  ]);

  const taskDataCreate = (data) => {

    const newId = `TL${taskData.length + 1}`;
    const presentDate = new Date();
    const workflowDetails = [
      {
        dateOfChange: presentDate.toISOString(),
        workflowData: [
          {
            fieldValue: 'Title',
            oldValue: 'Not avaliable',
            newValue: data.title,
            remarks: 'Task created'
          },
          {
            fieldValue: 'Status',
            oldValue: 'Not avaliable',
            newValue: data.status,
            remarks: 'Task created'
          },
          {
            fieldValue: 'Deadline',
            oldValue: 'Not avaliable',
            newValue: data.deadline,
            remarks: 'Task created'
          },
          {
            fieldValue: 'Priority',
            oldValue: 'Not avaliable',
            newValue: data.priority,
            remarks: 'Task created'
          },
          {
            fieldValue: 'Progress',
            oldValue: 'Not avaliable',
            newValue: data.progress,
            remarks: 'Task created'
          },
          {
            fieldValue: 'Description',
            oldValue: 'Not avaliable',
            newValue: data.description,
            remarks: 'Task created'
          }
        ]
      }
    ]

    const taskDetail = {
      'id': newId,
      ...data,
      'workflow': workflowDetails
    }
    setTaskData(prev => [...prev, taskDetail]);
  }

  const taskDataEdit = (data) => {

    const newTaskData = [];
    const taskDetail = data.taskElement;

    for (let i = 0; i < taskData.length; i++) {
      if (taskData[i].id === data.taskId) {
        const workflowDataDetails = [];

        if (taskDetail.title !== taskData[i].title) {
          const flowElement = {
            fieldValue: 'Title',
            oldValue: taskData[i].title,
            newValue: taskDetail.title,
            remarks: 'Task updated'
          }
          workflowDataDetails.push(flowElement);
        }
        if (taskDetail.status !== taskData[i].status) {
          const flowElement = {
            fieldValue: 'Status',
            oldValue: taskData[i].status,
            newValue: taskDetail.status,
            remarks: 'Task updated'
          }
          workflowDataDetails.push(flowElement);
        }
        if (taskDetail.deadline !== taskData[i].deadline) {
          const flowElement = {
            fieldValue: 'Deadline',
            oldValue: taskData[i].deadline,
            newValue: taskDetail.deadline,
            remarks: 'Task updated'
          }
          workflowDataDetails.push(flowElement);
        }
        if (taskDetail.priority !== taskData[i].priority) {
          const flowElement = {
            fieldValue: 'Priority',
            oldValue: taskData[i].priority,
            newValue: taskDetail.priority,
            remarks: 'Task updated'
          }
          workflowDataDetails.push(flowElement);
        }
        if (taskDetail.progress !== taskData[i].progress) {
          const flowElement = {
            fieldValue: 'Progress',
            oldValue: taskData[i].progress,
            newValue: taskDetail.progress,
            remarks: 'Task updated'
          }
          workflowDataDetails.push(flowElement);
        }
        if (taskDetail.description !== taskData[i].description) {
          const flowElement = {
            fieldValue: 'Description',
            oldValue: taskData[i].description,
            newValue: taskDetail.description,
            remarks: 'Task updated'
          }
          workflowDataDetails.push(flowElement);
        }

        const worlflowDataElement = [];

        if (workflowDataDetails.length !== 0) {
          const presentDate = new Date();
          worlflowDataElement.push(
            {
              dateOfChange: presentDate.toISOString(),
              workflowData: workflowDataDetails
            }
          )
        }

        const workflowElement = [...taskData[i].workflow, ...worlflowDataElement];

        const tempData = {
          id: data.taskId,
          title: taskDetail.title,
          status: taskDetail.status,
          deadline: taskDetail.deadline,
          priority: taskDetail.priority,
          progress: taskDetail.progress,
          description: taskDetail.description,
          workflow: workflowElement
        }
        newTaskData.push(tempData);
      } else {
        newTaskData.push(taskData[i]);
      }
    }

    setTaskData(newTaskData);
  }

  return (
    <div className="App">
      <ThemeProvider theme={currentTheme ? darkTheme : lightTheme}>
        <CssBaseline />

        {/* Navbar component */}
        <NavBar setCurrentTheme={setCurrentTheme} taskDataCreate={taskDataCreate} />

        {/* Task list component */}
        <ListTask taskData={taskData} taskDataEdit={taskDataEdit} />

      </ThemeProvider>
    </div>
  );
}

export default App;