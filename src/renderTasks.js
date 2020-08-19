import { createContent, createContainer } from './helpers';

// input example (In progress, inprogress)
// projectKey is key to 
// (In progress) is key with tasks keys


// 1 ALL VALIDIS PROJECTS LIST
// [PROJ1, PROJ2]

// 2 GET ALL TASKS FROM A SINGLE PROJECT
// PROJ1: [TASKS1, TAKSK2]

const renderTasks = (projectKey, projectId) => {
  if (localStorage.getItem(projectKey) === null) { return; }
  console.log('projectkey', projectKey)
  console.log('projectId', projectId)

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
        console.log(element) // each project key
        renderTasks(element, containerId);
      }
    }
  }
};

export { renderTasks, renderProjects };
