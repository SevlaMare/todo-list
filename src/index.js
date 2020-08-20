import { renderProjects, getAllTasksFrom, renderTask,
  loopOverProject } from './renderTasks';

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

const Task = (title, description, dueDate, prioritySelected, projectSelected) => ({
  title, description, dueDate, prioritySelected, projectSelected,
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

    const task = Task(
      title,
      description,
      dueDate,
      prioritySelected,
      projectSelected,
    );

    // 1 copy and parse whole projects object from local storage
    const allProjects = JSON.parse(localStorage.getItem('projects'));

    // 2 store new task
    allProjects[projectSelected][task.title] = task;

    // 3 send back to localstorage with new task
    localStorage.setItem('projects', JSON.stringify(allProjects));

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
    // console.log(Object.keys(JSON.parse(localStorage['projects'])))

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

  // DEBUG - should render a single taks!
  const tasksObject = getAllTasksFrom('todo') // retuning all tasks from a obj
  console.log('TASK OBJ', tasksObject)

  const taskExample = {title: "DDDDD", description: "DDDD", dueDate: "2020-08-06", prioritySelected: "High", projectSelected: 'todo'}
  renderTask(taskExample, 'todo') // need only 1 task to work

  // const projExample = {  }
  loopOverProject(tasksObject)
}
