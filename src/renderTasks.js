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

// 2 RENDER TASK
const renderTask = (task, projectId) => {
  // data
  const { title } = task;
  const { description } = task;
  const { dueDate } = task;
  const priority = task.prioritySelected;

  // containers
  const taskDiv = createContainer('div');
  const editBtn = createInput('button', null, false, null, 'EDIT')

  // content
  const projTitle = createContent('h3', null, title);
  const projDescription = createContent('p', null, description);
  const projDate = createContent('p', null, dueDate);
  const projPriority = createContent('p', null, priority);

  // annex
  taskDiv.append(projTitle, projDescription, projDate, projPriority, editBtn);
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
    let element = projectsKeys[project];

    const projectTasks = getAllTasksFrom(element);
    loopOverProject(projectTasks, element.replace(/\s/g, ''));
  }
};

export {
  renderProjects, getAllTasksFrom, renderTask,
  loopOverProject, renderAllTask,
};
