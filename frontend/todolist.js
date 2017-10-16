$(function () {
    function showTodos(list) {
        let ul=$("#list");
        ul.empty();
        for(let todo of list) {
           ul.append(`<li>${todo.task}</li>`);
        }
    }
    $.get('http://localhost:4444/todos/',(data)=>{showTodos(data)});
    $("#add").click(function () {
        $.post(
            'http://localhost:4444/todos/add',
            {
             task: $("#inp").val()
            },
            function (data) {
                console.log(data);
                showTodos(data);
            }
        );
        $('#inp').val("")
    })

});
