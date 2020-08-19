import { renderProjects } from './renderTasks';

// debug options - will reset the arrray on reload!
localStorage.setItem(
  'projects',
  JSON.stringify({
    all: {},
    todo: {},
    'in progress': {},
    done: {},
  }),
);

const fillOptions = () => {
  const all = Object.keys(JSON.parse(localStorage.getItem('projects')));

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

const Task = (
  title,
  description,
  dueDate,
  prioritySelected,
  projectSelected,
) => ({
  title,
  description,
  dueDate,
  prioritySelected,
  projectSelected,
});

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

  const task = Task(
    title,
    description,
    dueDate,
    prioritySelected,
    projectSelected,
  );

  const retrieve = localStorage.getItem('projects');
  const unpack = JSON.parse(retrieve);

  unpack[projectSelected][task.title] = task;

  localStorage.setItem('projects', JSON.stringify(unpack));

  const retrieveNew = localStorage.getItem('projects');
  const newObjects = JSON.parse(retrieveNew);
  document.getElementById('tasks').innerHTML = newObjects.all;

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
