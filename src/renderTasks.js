import { createContent, createContainer } from './helpers';

// 1 GET ALL TASKS FROM A PROJECT (ok)
const getAllTasksFrom = (project) => {
  const allProjects = JSON.parse(localStorage.getItem('projects'));

  console.log(allProjects[project])
  return allProjects[project]; // { PRj1 : {...}, PRJ2 : {...} }
};

// 2 Loop over project, return tasks
const loopOverProject = (allStuff, projectId) => {
  const len = Object.keys(allStuff).length;

  for (let task = 0; task <= len; task += 1) {
    renderTask(task.value, projectId);
  }
};


// 3 RENDER TASK
const renderTask = (task, projectId) => {
  // task is a object like {title: 'etc1', ...}

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
  const projTitle = createContent('h2', null, title);
  const projDescription = createContent('p', null, description);
  const projDate = createContent('p', null, dueDate);
  const projPriority = createContent('p', null, priority);

  // annex
  taskDiv.append(projTitle, projDescription, projDate, projPriority);
  document.getElementById(projectId).append(taskDiv);
};


// 3 RENDER PROJECT DIVs
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

    // renderAllTask(element, containerId);
  }
};


// ------ TODO: need refactor ---------
const renderAllTask = (project, projectId) => {
  const projectTasks = getAllTasksFrom(project);
  loopOverProject(projectTasks, projectId);
};


export {
  getAllTasksFrom, renderTask, loopOverProject,
  renderAllTask, renderProjects,
};
