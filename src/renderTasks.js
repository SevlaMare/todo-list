import { createContent, createContainer } from './helpers'

const renderTasks = () => {
  //data
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

export { renderTasks };