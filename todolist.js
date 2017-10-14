
function showTodos(list,ul) {
    ul.innerHTML='';
    for(let i in list) {
        let listItem = document.createElement('li');
        listItem.innerText=list[i].task;
        ul.appendChild(listItem);
    }
}

window.onload=function () {
   let ul =document.getElementById('list');
   let inp=document.getElementById('inp');
   let add=document.getElementById('add');
   add.onclick=function () {
      let value=inp.value;
      todoList.addTodo(value,false);
      let list=todoList.getTodos();
      showTodos(list,ul);

   }
};
