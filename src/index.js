const todos = [];
const id = 1;

// debug options
localStorage.setItem('options', ['Todo', 'In progress', 'Done'])

document.body.querySelector("#submit").addEventListener("click", (event) => {
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const dueDate = document.querySelector("#dueDate").value;
  const priority = document.querySelector("#priority")
  const prioritySelected = priority.options[
    priority.selectedIndex
  ].text;

  localStorage.setItem(`list${id}`, [title, description, dueDate, prioritySelected]);
  const arr = localStorage.getItem(`list${id}`).split(',');
  document.querySelector('#todoTitle').innerHTML = arr[0];
  document.querySelector('#todoDescription').innerHTML = arr[1];
  document.querySelector('#todoDueDate').innerHTML = arr[2];
  document.querySelector('#todoPriority').innerHTML = arr[3];

  // event.preventDefault();


});


const fillOptions = () => {
  const all = localStorage.getItem('options').split(',');

  let elementsToAppend = '';
  for (let index = 0; index < all.length; index++) {
    const element = all[index];
    elementsToAppend += `<option>${element}</option>`;
  }
  document.querySelector('#project').innerHTML += elementsToAppend;
}

document.body.onload = fillOptions;






// debug
console.log(
  localStorage.getItem('options').split(',')
);