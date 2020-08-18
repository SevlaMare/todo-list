const todos = [];
const id = 1;


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

  
  event.preventDefault();
});
