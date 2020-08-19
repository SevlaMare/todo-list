import { createContent, createContainer } from './helpers';

const renderTasks = (projectKey, projectId) => {
  if (localStorage.getItem(projectKey) === null) { return; }
  console.log('projectkey', projectKey);
  console.log('projectId', projectId);

  // check when local storage doesn't have a key with the project name.
  const projectTasksKeys = localStorage.getItem(projectKey).split(',');

  if (projectTasksKeys) {
    for (let taskKey = 0; taskKey < projectTasksKeys.length; taskKey += 1) {
      const element = projectTasksKeys[taskKey];
      const task = localStorage.getItem(element).split(',');
      if (task) {
        const title = task[0];
        const description = task[1];
        const date = task[2];
        const priority = task[3];

        // Containers
        const taskDiv = document.querySelector(`#${projectId}`);
        const projDiv = createContainer('div', 'proj-div');

        // Content
        const projTitle = createContent('h3', null, title);
        const projDescription = createContent('p', null, description);
        const projDate = createContent('p', null, date);
        const projPriority = createContent('p', null, priority);

        projDiv.append(projTitle, projDescription, projDate, projPriority);
        taskDiv.append(projDiv);
      }
    }
  }
};

const renderProjects = () => {
  const projects = localStorage.getItem('options').split(',');

  if (projects) {
    for (let project = 0; project < projects.length; project += 1) {
      const element = projects[project];
      const containerId = element.replace(/\s/g, '');

      const container = createContainer('div', null, containerId);
      const title = createContent('h2', null, element);

      container.append(title);
      document.querySelector('#tasks').append(container);

      if (localStorage.getItem(element)) {
        console.log(element); // each project key
        renderTasks(element, containerId);
      }
    }
  }
};

// 1 GET A PROJECT WITH OWN TASKS
const getAllTasksFrom = (project) => {
  const allProjects = JSON.parse(localStorage.getItem('projects'));

  return allProjects[project]
}

// 2 LOOP OVER ALL TASKS to CALL STEP 3 and 4
fo

// 3 RETURN AN ARRAY WITH ALL INFORMATION ABOUT ONE TASK
const loopOverProject = () => {
  const allStuff = getAllTasksFrom('todo')
  const len = Object.keys(allStuff).length

  for (let task = 0; task <= len; task += 1) {
    renderTask(task.value)
  }
}

// 4 RENDER A SINGLE TASK
const renderTask = (task) => {
  // 2 split task into variables
  const proj = localStorage.getItem('2343ertodo').split(',')
  const title = proj[1]
  const description = proj[2]
  const date = proj[3]
  const priority = proj[4]

  // Containers
  const taskDiv = document.querySelector('#tasks')
  const projDiv = createContainer('div', 'proj-div');

  // Content
  const projTitle = createContent('h2', null, title);
  const projDescription = createContent('p', null, description);
  const projDate = createContent('p', null, date);
  const projPriority = createContent('p', null, priority);

  projDiv.append(projTitle, projDescription, projDate, projPriority);
  taskDiv.append(projDiv);

  console.log('running')
}

export { renderTasks, renderProjects };
