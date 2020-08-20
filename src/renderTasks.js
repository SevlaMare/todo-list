import { createContent, createContainer } from './helpers';

// 0 RENDER PROJECT DIVs (ok)
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

// 1 GET ALL TASKS FROM A PROJECT (ok)
const getAllTasksFrom = (project) => {
  const allProjects = JSON.parse(localStorage.getItem('projects'));

  return allProjects[project];
};

// 2 RENDER TASK (get 1 task, render it) (ok)
const renderTask = (task, projectId) => {
  // DATA
  // TODO: extract data to another fx
  const title = task['title']
  const description = task['description']
  const dueDate = task['dueDate']
  const priority = task['prioritySelected']
  const project = task['projectSelected']

  console.log(title)

  // containers
  const taskDiv = createContainer('div');

  // content
  const projTitle = createContent('h3', null, title);
  const projDescription = createContent('p', null, description);
  const projDate = createContent('p', null, dueDate);
  const projPriority = createContent('p', null, priority);

  // annex
  taskDiv.append(projTitle, projDescription, projDate, projPriority);
  document.getElementById(projectId).append(taskDiv);
};

// 3 LOOP OVER A PROJECT, return tasks rendered
const loopOverProject = (projectObj, projectId) => {
  const len = Object.keys(projectObj).length;

  for (let task = 0; task < len; task += 1) {
    // renderTask(task.value, projectId);
    let currentTask = Object.values(projectObj)[task]
    console.log(currentTask);
    renderTask(currentTask, projectId)

    // DEBUG print each TASK
    // console.log( Object.values(projectObj)[task] ) // single task
  }
};

// 4 LOOP OVER all projects to render all


// ------ TODO: need refactor ---------
const renderAllTask = (project, projectId) => {
  const projects = JSON.parse(localStorage.getItem('projects'));
  const projectsKeys = Object.keys(projects);

  for (let project = 0; project < projectsKeys.length; project++) {
    const element = projectsKeys[project];
    console.log(element);
    
    const projectTasks = getAllTasksFrom(element);
    loopOverProject(projectTasks, element);
  }
};

export { renderProjects, getAllTasksFrom, renderTask,
  loopOverProject, renderAllTask };
