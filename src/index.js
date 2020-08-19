// debug options - will reset the arrray on reload!
localStorage.setItem('options', ['Todo', 'In progress', 'Done']);

// GET NEW TASKS
document.body.querySelector('#submit').addEventListener('click', (event) => {
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const dueDate = document.querySelector('#dueDate').value;
  const priority = document.querySelector('#priority');
  const prioritySelected = priority.options[
    priority.selectedIndex
  ].text;
  const project = document.querySelector('#project');
  const projectSelected = project.options[project.selectedIndex].text;

  // NEED CREATE TASK ARRAY KEY, WITH ALL TASKS INSIDE
  const taskKey = title.toLowerCase().replace(/\s/g, '') + projectSelected.toLowerCase().replace(/\s/g, '');
  const existKey = localStorage.getItem(taskKey);
  if (existKey === null) {
    localStorage.setItem(taskKey, [title, description, dueDate, prioritySelected]);
  } else {
    document.querySelector('#error').innerHTML = 'name already taken for this project.';
  }
  // TODO find how push elements to an array inside local storage

  // const arr = localStorage.getItem(`list${id}`).split(',');

  // document.querySelector('#todoTitle').innerHTML = arr[0];
  // document.querySelector('#todoDescription').innerHTML = arr[1];
  // document.querySelector('#todoDueDate').innerHTML = arr[2];
  // document.querySelector('#todoPriority').innerHTML = arr[3];

  event.preventDefault();
});

const fillOptions = () => {
  const all = localStorage.getItem('options').split(',');

  let elementsToAppend = '';
  for (let index = 0; index < all.length; index += 1) {
    const element = all[index];
    elementsToAppend += `<option>${element}</option>`;
  }
  document.querySelector('#project').innerHTML += elementsToAppend;
};

const addNewOption = (cap) => {
  const x = document.createElement('option', cap);
  x.innerHTML = cap;
  document.querySelector('#project').append(x);
};

// get new project as option from form
document.querySelector('#newProjBtn')
  .addEventListener('click', (event) => {
    // 1 get value form input
    const newProj = document.querySelector('#newProject').value;

    // 2 copy the current array from cache
    const newProjUpdate = localStorage.getItem('options').split(',');
    newProjUpdate.push(newProj);

    // 3 replace by the new array with new element
    localStorage.setItem('options', newProjUpdate);

    addNewOption(newProj);

    // prevents reload
    event.preventDefault();
  });

// debug options array inside localstorage
// console.log(localStorage.getItem('options').split(','));

document.body.onload = fillOptions;
