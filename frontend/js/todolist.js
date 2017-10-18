$(function () {
    function showTodos(list) {
        let ul = $("#list");
        ul.empty();
        for (let todo of list) {
            console.log(todo);
            let li = $(`<li id="${todo.od}"></li>`);
            let span = $(`<span> ${todo.task}</span>`);
            let d = $("<button>delete</button>");
            d.click(del);
            let up = $("<button>up</button>");
            up.click(Up);
            let down = $("<button>down</button>");
            down.click(Down);
            let cb = $(`<input type="checkbox">`);
            if (todo.done) {
                cb.change(unstrike);
            }
            else {
                cb.change(strike);
            }
                if (todo.done) {
                    cb.prop('checked', true);
                    span.css("textDecoration", 'line-through');
                }
                li.append(cb);
                li.append(span);
                li.append(d);
                if (todo.od != 1)
                    li.append(up);
                if (todo.od != list.length)
                    li.append(down);
                ul.append(li);
        }
    }


        function Up(event) {
            let index = event.target.parentElement.getAttribute('id');
            $.post('http://localhost:4444/todos/up',
                {
                    id: index
                },function (data) {
                showTodos(data);
            })
        }
    function Down(event) {
        let index = event.target.parentElement.getAttribute('id');
        $.post('http://localhost:4444/todos/down',
            {
                id: index
            },function (data) {
                showTodos(data);
            })
    }

         function unstrike(event) {
            let index = event.target.parentElement.getAttribute('id');
            $.post('http://localhost:4444/todos/unstrike',
                {
                    id: index
                }, function (data) {
                    showTodos(data);
                })
        }

        function strike(event) {
            let index = event.target.parentElement.getAttribute('id');
            $.post('http://localhost:4444/todos/strike',
                {
                    id: index
                }, function (data) {
                    showTodos(data);
                })
        }

        function del(event) {
            let index = event.target.parentElement.getAttribute('id');
            $.post('http://localhost:4444/todos/del',
                {
                    id: index
                },
                function (data) {
                console.log(data);
                    showTodos(data);
                })
        }

    $.get('http://localhost:4444/todos/',(data)=>{showTodos(data)});
    $("#inp").on("keypress", function (e) {
        if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
            ajax();
        }
    });
    function ajax() {
        $.post(
            'http://localhost:4444/todos/add',
            {
                task: $("#inp").val()
            },
            function (data) {
                showTodos(data);
            }
        );
        $('#inp').val("")
    }
    $("#add").click(ajax);
    $("#del").click(function () {
        $.post(
            'http://localhost:4444/todos/delete',
            function (data) {
                showTodos(data);
            }
        );
    })

});

// function addTodoInDom (todoValue,done,choice,id) {
//
//     let listItem = document.createElement('li');
//     listItem.setAttribute('class', 'list-group-item  ml-5 mr-5 ');
//
//     let color;
//
//     if(choice==1) {
//         color = 'background-color: #cbee7a';
//     }
//
//     if(choice==2) {
//         color = 'background-color: #faf681';
//     }
//     if(choice==3) {
//         color = 'background-color: #e17555';
//     }
//     listItem.setAttribute('style',color+";font-size: 3vh;");
//
//
//     let newListItem = document.createElement('div');
//     newListItem.setAttribute('data-id', id);
//     newListItem.setAttribute('class', ' row ');
//
//     let checkBox = document.createElement('input');
//     checkBox.setAttribute('type', 'checkbox');
//     checkBox.setAttribute('class', 'col');
//     checkBox.onchange = strike;
//
//     let span = document.createElement('span');
//     span.innerText = todoValue;
//     span.setAttribute('class', 'col-8');
//
//     if (done) {
//         checkBox.setAttribute('checked', true);
//         span.style.textDecoration = 'line-through';
//     }
//
//
//     let x = document.createElement('i');
//     x.setAttribute('class', 'fa fa-times col');
//     x.onclick = Delete;
//     x.setAttribute('style','color: purple');
//
//     let u = document.createElement('i');
//     u.setAttribute('class', 'fa fa-chevron-up col');
//     u.onclick = UP;
//     u.setAttribute('style','color: navy');
//
//     let d = document.createElement('i');
//     d.setAttribute('class', 'fa fa-chevron-down col');
//     d.onclick = DOWN;
//     d.setAttribute('style','color: navy');
//
//     newListItem.appendChild(checkBox);
//     newListItem.appendChild(span);
//     newListItem.appendChild(x);
//     listItem.appendChild(newListItem);
//     if (id != 0) {
//         newListItem.appendChild(u);
//     }
//     else {
//         let t = document.createElement('span');
//         t.setAttribute('class', 'col');
//         newListItem.appendChild(t);
//     }
//
//     if (id != todoList.list.length - 1) {
//         newListItem.appendChild(d);
//     }
//
//     else {
//         let t = document.createElement('span');
//         t.setAttribute('class', 'col');
//         newListItem.appendChild(t);
//     }
//
//     list.appendChild(listItem);
//
// }
