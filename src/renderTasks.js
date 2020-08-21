import { createContent, createContainer, createInput } from './helpers';

// 0 RENDER PROJECT DIVs
const renderProjects = () => {
  const projects = JSON.parse(localStorage.getItem('projects'));
  const projectsKeys = Object.keys(projects);

  for (let project = 0; project < projectsKeys.length; project += 1) {
    const element = projectsKeys[project];
    const containerId = element.replace(/\s/g, '');

    const container = createContainer('div', null, containerId);
    const title = createContent('h2', null, element);

    container.append(title);
    document.querySelector('#tasks').append(container);
  }
};

// 1 GET ALL TASKS FROM A PROJECT
const getAllTasksFrom = (project) => {
  const allProjects = JSON.parse(localStorage.getItem('projects'));

  return allProjects[project];
};

const editTask = (projectSelect, titleP) => {
  const project = JSON.parse(localStorage.getItem('projects'));
  const {
    title, description, dueDate, prioritySelected, prjIndex,
  } = project[projectSelect][titleP];

  // fill form with values from task to edit
  const txtTitle = document.getElementById('title');
  txtTitle.value = title;
  txtTitle.disabled = true;

  const txtDescription = document.getElementById('description');
  txtDescription.value = description;

  const txtDueDate = document.getElementById('dueDate');
  txtDueDate.value = dueDate;

  const txtPriority = document.getElementById('priority');
  txtPriority.selectedIndex = prioritySelected === 'High' ? 0 : 1;

  const txtProject = document.getElementById('project');
  txtProject.selectedIndex = prjIndex;
};

const deleteTask = (projectSelect,taskContainerId, title) => {
  const projects = JSON.parse(localStorage.getItem('projects'));
  const project = projects[projectSelect];

  delete project[title];

  localStorage.setItem('projects', JSON.stringify(projects));

  const removeItem = document.getElementById(taskContainerId);
  console.log(removeItem);
  document.getElementById(projectSelect.replace(/\s/g, '')).removeChild(removeItem);
};

// 2 RENDER TASK (get 1 task, render it) (ok)
const renderTask = (task, projectId) => {
  // DATA
  const {
    title, description, dueDate, priority, projectSelected,
  } = task;

  // containers
  const containerId = title.replace(/\s/g, '') + projectId;
  const taskDiv = createContainer('div', null, containerId);

  // content
  const projTitle = createContent('h3', null, title);
  const projDescription = createContent('p', null, description);
  const projDate = createContent('p', null, dueDate);
  const projPriority = createContent('p', null, priority);
  const editButton = createContent('button', null, 'EDIT');
  const deleteButton = createContent('button', null, 'DELETE');


  // event
  editButton.addEventListener('click', () => { editTask(projectSelected, title); });
  editButton.id = `btnEdit${containerId}`;editButton.id = `btn${containerId}`;
  deleteButton.addEventListener('click', () => { deleteTask(projectSelected,containerId, title) })
  deleteButton.id = `btnDelete${containerId}`;

  // annex
  taskDiv.append(projTitle, projDescription, projDate, projPriority, editButton, deleteButton);
  document.getElementById(projectId).append(taskDiv);
};

// 3 LOOP OVER A PROJECT, return tasks rendered
const loopOverProject = (projectObj, projectId) => {
  const len = Object.keys(projectObj).length;

  for (let task = 0; task < len; task += 1) {
    const currentTask = Object.values(projectObj)[task];
    renderTask(currentTask, projectId);
  }
};

const renderAllTask = () => {
  const projects = JSON.parse(localStorage.getItem('projects'));
  const projectsKeys = Object.keys(projects);

  for (let project = 0; project < projectsKeys.length; project += 1) {
    const element = projectsKeys[project];

    const projectTasks = getAllTasksFrom(element);
    loopOverProject(projectTasks, element.replace(/\s/g, ''));
  }
};

export {
  renderProjects, getAllTasksFrom, renderTask,
  loopOverProject, renderAllTask,
};
