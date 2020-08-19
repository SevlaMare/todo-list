import { renderTasks, renderProjects } from './renderTasks';

// debug options - will reset the arrray on reload!
localStorage.setItem('options', ['all', 'Todo', 'In progress', 'Done']);

// GET NEW TASKS
document.body.querySelector('#submit').addEventListener('click', (event) => {
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const dueDate = document.querySelector('#dueDate').value;

  const priority = document.querySelector('#priority');
  const prioritySelected = priority.options[ priority.selectedIndex].text;

  const project = document.querySelector('#project');
  const projectSelected = project.options[project.selectedIndex].text;

  // NEED CREATE TASK ARRAY KEY, WITH ALL TASKS INSIDE
  const taskKey = title.toLowerCase().replace(/\s/g, '') + projectSelected.toLowerCase().replace(/\s/g, '');
  const existKey = localStorage.getItem(taskKey);
  if (existKey === null) {
    localStorage.setItem(taskKey, [title, description, dueDate, prioritySelected, projectSelected]);
    const existProject = localStorage.getItem(projectSelected);
    // Create a key for each project, if it is already there,
    // retrieve the tasks keys and add it the new task key. 
    // Then replace and save again the new project keys. 
    if(existProject === null) {
      localStorage.setItem(projectSelected, [taskKey]);
    } else {
      const projectKeys = localStorage.getItem(projectSelected).split(',');
      projectKeys.push(taskKey);
      localStorage.setItem(projectSelected, projectKeys);
    }
  } else {
    document.querySelector('#error').innerHTML = 'name already taken for this project.';
  }

  // renderProjects();
  event.preventDefault();
});

const fillOptions = () => {
  const all = localStorage.getItem('options').split(',');

  let elementsToAppend = '';
  for (let index = 0; index < all.length; index += 1) {
    const element = all[index];
    elementsToAppend += `<option>${element}</option>`;
  }
  document.querySelector('#project').innerHTML += elementsToAppend;
  // renderTasks();
};

const addNewOption = (cap) => {
  const x = document.createElement('option', cap);
  x.innerHTML = cap;
  document.querySelector('#project').append(x);
};


// get new project as option from form
document.querySelector('#newProjBtn')
  .addEventListener('click', (event) => {
    // 1 get value form input
    const newProj = document.querySelector('#newProject').value;

    // 2 copy the current array from cache
    const newProjUpdate = localStorage.getItem('options').split(',');
    newProjUpdate.push(newProj);

    // 3 replace by the new array with new element
    localStorage.setItem('options', newProjUpdate);

    addNewOption(newProj);

    // prevents reload
    event.preventDefault();
  });

document.body.onload = fillOptions;

renderProjects();
// renderTasks();