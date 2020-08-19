import { renderProjects } from './renderTasks';

// debug options - will reset the arrray on reload!
localStorage.setItem('options', ['all', 'Todo', 'In progress', 'Done']);
localStorage.setItem('all', 'stuff');

const fillOptions = () => {
  const all = localStorage.getItem('options').split(',');

  let elementsToAppend = '';
  for (let index = 0; index < all.length; index += 1) {
    const element = all[index];
    elementsToAppend += `<option>${element}</option>`;
  }
  document.querySelector('#project').innerHTML += elementsToAppend;
};

const addNewOption = (cap) => {
  const x = document.createElement('option', cap);
  x.innerHTML = cap;
  document.querySelector('#project').append(x);
};

document.body.onload = fillOptions;

// GET NEW TASKS
document.body.querySelector('#submit').addEventListener('click', (event) => {
  // get data from form
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const dueDate = document.querySelector('#dueDate').value;

  const priority = document.querySelector('#priority');
  const prioritySelected = priority.options[priority.selectedIndex].text;

  const project = document.querySelector('#project');
  const projectSelected = project.options[project.selectedIndex].text;



  const arr = {title, description, dueDate, prioritySelected, projectSelected}

  const OBJECT_WITH_ALL_DATA = {
    todo: arr
  }

  const projectsKeys = localStorage.getItem('')


  localStorage.setItem('PROJECTS', JSON.stringify(OBJECT_WITH_ALL_DATA) )
  const retrieve = localStorage.getItem('PROJECTS')

  const unpack = JSON.parse(retrieve)
  console.log(unpack['todo']['projectSelected'])
  // console.log(localStorage)


  // const taskKey = title.toLowerCase().replace(/\s/g, '') + projectSelected.toLowerCase().replace(/\s/g, '');
  // const existKey = localStorage.getItem(taskKey);
  // if (existKey === null) {
  //   localStorage.setItem(taskKey, [title, description, dueDate, prioritySelected, projectSelected]);
  //   const existProject = localStorage.getItem(projectSelected);

  //   if (existProject === null) {
  //     localStorage.setItem(projectSelected, [taskKey]);
  //   } else {
  //     const projectKeys = localStorage.getItem(projectSelected).split(',');
  //     projectKeys.push(taskKey);
  //     localStorage.setItem(projectSelected, projectKeys);
  //   }
  // } else {
  //   document.querySelector('#error').innerHTML = 'name already taken for this project.';
  // }

  // renderProjects();
  event.preventDefault();
});

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

// renderProjects();
