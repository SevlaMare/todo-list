const id = 1;

// debug options - will reset the arrray on reload!
localStorage.setItem('options', ['Todo', 'In progress', 'Done']);

document.body.querySelector('#submit').addEventListener('click', (event) => {
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const dueDate = document.querySelector('#dueDate').value;
  const priority = document.querySelector('#priority');
  const prioritySelected = priority.options[
    priority.selectedIndex
  ].text;

  localStorage.setItem(`list${id}`, [title, description, dueDate, prioritySelected]);
  const arr = localStorage.getItem(`list${id}`).split(',');

  document.querySelector('#todoTitle').innerHTML = arr[0];
  document.querySelector('#todoDescription').innerHTML = arr[1];
  document.querySelector('#todoDueDate').innerHTML = arr[2];
  document.querySelector('#todoPriority').innerHTML = arr[3];

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