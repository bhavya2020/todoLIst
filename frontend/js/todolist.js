$(function () {
    function showTodos(list) {
        let ul = $("#list");
        ul.empty();
        for (let todo of list) {
            let div=$(`<div id="${todo.od}" class="row"></div>`);

            let li = $(`<li id="${todo.od}" class="list-group-item  ml-5 mr-5 " style="font-size: 3vh;"></li>`);
            let span = $(`<span class="col-8"> ${todo.task}</span>`);
            let d = $(`<i class="fa fa-times col"></i>`);
            d.click(del);
            let up = $(`<i class="fa fa-chevron-up col"></i>`);
            up.click(Up);
            let down = $(`<i class="fa fa-chevron-down col"></i>`);
            down.click(Down);
            let cb = $(`<input type="checkbox" class="col">`);
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
                div.append(cb);
                div.append(span);
                div.append(d);
                if (todo.od != 1)
                    div.append(up);
                else
                {
                   let t = $(`<span class="col"></span>`);
                   div.append(t);
                }
                if (todo.od != list.length)
                    div.append(down);
                else
                {
                    let t = $(`<span class="col"></span>`);
                    div.append(t);
                }
                li.append(div);
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

