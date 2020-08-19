import { createContent, createContainer } from "./helpers";

// 1 GET A PROJECT WITH OWN TASKS

const getAllTasksFrom = (project) => {
  const allProjects = JSON.parse(localStorage.getItem("projects"));

  return allProjects[project];
};

// 4 RENDER A SINGLE TASK
const renderTask = (task, projectId) => {
  console.log('________:', task);
  const title = task.title;
  // Containers
  const taskDiv = createContainer("div");

  // Content
  const projTitle = createContent("h2", null, title);
  const projDescription = createContent("p", null, description);
  const projDate = createContent("p", null, dueDate);
  const projPriority = createContent("p", null, priority);

  taskDiv.append(projTitle, projDescription, projDate, projPriority);
  document.getElementById(projectId).append(taskDiv);
};

// 3 RETURN AN ARRAY WITH ALL INFORMATION ABOUT ONE TASK
const loopOverProject = (allStuff, projectId) => {
  const len = Object.keys(allStuff).length;

  console.log('allStff', allStuff);

  for(let task = 0; task <= len; task += 1) {
    console.log('::::::',task);
    renderTask(task.value, projectId);
  }
};

const renderAllTask = (project, projectId) => {
  const projectTasks = getAllTasksFrom(project);
  loopOverProject(projectTasks, projectId);
};

const renderProjects = () => {
  const projects = JSON.parse(localStorage.getItem("projects"));
  const projectsKeys = Object.keys(projects);

  for (let project = 0; project < projectsKeys.length; project += 1) {
    const element = projectsKeys[project];
    const containerId = element.replace(/\s/g, "");

    const container = createContainer("div", null, containerId);
    const title = createContent("h2", null, element);

    container.append(title);
    document.querySelector("#tasks").append(container);

    renderAllTask(element, containerId);
  }
};

export { renderProjects };
