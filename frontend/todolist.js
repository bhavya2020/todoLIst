$(function () {
    function showTodos(list) {
        let ul = $("#list");
        ul.empty();
        for (let todo of list) {
            let li = $(`<li id="${todo.id}"></li>`);
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
                if (todo.id != 1)
                    li.append(up);
                if (todo.id != list.length)
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
    $("#add").click(function () {
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
    });
    $("#del").click(function () {
        $.post(
            'http://localhost:4444/todos/delete',
            function (data) {
                showTodos(data);
            }
        );
    })

});
