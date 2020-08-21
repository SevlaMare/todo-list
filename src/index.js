import { renderProjects, renderTask, renderAllTask } from './renderTasks';
import './css/style.css';
import './css/form.css';


// CREATE DATABASE
if (!(localStorage.getItem('projects'))) {
  localStorage.setItem('projects', JSON.stringify({
    all: {},
    todo: {},
    'in progress': {},
    done: {},
  }));
}

const fillOptions = () => {
  const all = Object.keys(JSON.parse(localStorage.getItem('projects')));

  let elementsToAppend = '';
  for (let index = 0; index < all.length; index += 1) {
    const element = all[index];
    elementsToAppend += `<option>${element}</option>`;
  }
  document.querySelector('#project').innerHTML += elementsToAppend;
};

const Task = (title, description, dueDate, prioritySelected, projectSelected, prjIndex) => ({
  title, description, dueDate, prioritySelected, projectSelected, prjIndex,
});

// CREATE NEW TASK
document.body.querySelector('#submit')
  .addEventListener('click', (event) => {
    // get data from form
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#dueDate').value;

    const priority = document.querySelector('#priority');
    const prioritySelected = priority.options[priority.selectedIndex].text;

    const project = document.querySelector('#project');
    const projectSelected = project.options[project.selectedIndex].text;

    // SHOULD SEND INDEX NUMBER
    const prjIndex = project.selectedIndex;

    const task = Task(
      title,
      description,
      dueDate,
      prioritySelected,
      projectSelected,
      prjIndex,
    );

    // 1 copy and parse whole projects object from local storage
    const allProjects = JSON.parse(localStorage.getItem('projects'));

    // 2 store new task
    allProjects[projectSelected][task.title] = task;

    // 3 send back to localstorage with new task
    localStorage.setItem('projects', JSON.stringify(allProjects));

    renderTask(task, projectSelected.replace(/\s/g, ''));

    event.preventDefault();
  });

// CREATE NEW PROJECT
document.querySelector('#newProjBtn')
  .addEventListener('click', (event) => {
    event.preventDefault();

    // 0 get value form input
    const newProjTitle = document.querySelector('#newProject').value;

    // 1 copy and parse whole projects object from local storage
    const allProjects = JSON.parse(localStorage.getItem('projects'));

    // 2 store new project
    allProjects[newProjTitle] = {};

    // 3 send back to localstorage with new task
    localStorage.setItem('projects', JSON.stringify(allProjects));

    // 4 send new option to html
    const newProjTitleE = document.createElement('option', newProjTitle);
    newProjTitleE.innerHTML = newProjTitle;
    document.querySelector('#project').append(newProjTitleE);

    // addNewOption(newProjTitle);
    event.preventDefault();
  });

document.body.onload = () => {
  fillOptions();
  renderProjects();
  renderAllTask();
};



// console.log('here >>>')
// console.log(document.getElementById('all'))

// document.querySelector('#all')
// .addEventListener('click', () => { 
//   alert('ya') 
// })
