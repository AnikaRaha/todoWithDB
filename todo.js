(function(){

  var todos = [];
  var existingValues;

  /*function loadPrevValues() {
    existingValues = JSON.parse(localStorage.getItem('allVal'));
    if (existingValues !== null){
      console.log(existingValues);
      todos = todos.concat(existingValues);
      sliceElements(todos);
    };
    
  }*/

  function getValuesFromForm() {
    var done;
    var priority;
    var name = $('#name').val();
    var title = $('#title').val();
    var dueDate = $('#dueDate').val();
    
    if ($('#doneT').is(':checked')) {
      done = ($('#doneT').val());
    } else if ($('#doneF').is(':checked')) {
      done = ($('#doneF').val());
    }

    if ($('#priorityH').is(':checked')) {
      priority = ($('#priorityH').val());
    } else if ($('#priorityM').is(':checked')) {
      priority = ($('#priorityM').val());
    } else if ($('#priorityL').is(':checked')) {
      priority = ($('#priorityL').val());
    }
    
    //console.log(getValuesFromForm);
    if (done.length && priority.length && name.length && title.length && dueDate.length) {
      storeIntoDatabase(name, title, done, dueDate, priority); 
      //alert("inside getValuesFromForm");
    } else {
      console.log("form empty");
    }
  }

  function storeIntoDatabase(name, title, done, dueDate, priority) {
    // console.log("form not empty");
    var todo = {
        name: name,
        title: title,
        done: done,
        dueDate: dueDate,
        priority: priority,
      };
      console.log(todo);
    todos.push(todo);
    
    $.ajax({
        url: 'insertIntoDatabase.php',
        type: 'POST',
        // data: (JSON.stringify({a: 123, b: 456})),
        data: {
          key1: "raha",
          key2: "abha",
          key3: 2
        },
        contentType: 'application/json; charset=utf-8',
        success: function (response, response, data) {
            console.log(data);
            alert("ajax");
            redirect_url = 'http://localhost/office/task5(todoListDatabase)/insertIntoDatabase.php';
            window.location.href = redirect_url;
        },
        error: function () {
            alert("error");
        }
    }); 
    
    // console.log(todos);
    //store data into localStorage
    //localStorage.setItem("allVal", JSON.stringify(todos));
    sliceElements(todos);
    $("input[name='name']").val('');
    $("input[name='title']").val('');
  }

  function sliceElements(todoList) {
    var len = todoList.length;
    $('ol').empty();

    for (var i = 0; i<len; i++) {
      var elementArray = todoList.slice(i, i+1);
      var elementObject = elementArray.reduce(function(acc, cur, i) {
          acc[i] = cur;
          return acc;
      }, {}); //converting the element array of objects into object of objects
      appendToList(elementObject);
    };
  }

  function appendToList(elementObject) {
    Object.keys(elementObject).forEach((key) => {
      var getName = elementObject[key].name;
      var getTitle = elementObject[key].title;
      var getDone = elementObject[key].done;
      var getDueDate = elementObject[key].dueDate;
      var getPriority = elementObject[key].priority;
      //var getUid = elementObject[key].uid;

      $('ol').append('<li class="form-control liChild">' + getName + ' : ' + getTitle + ' : ' + getDone + ' : ' + getDueDate + ' : ' + getPriority + '</li>');
      //$('li:last-child').attr('data-uid', getUid); //attaches getUid value with the last child of list items in backend but does not show in view
    });
  }

  //$(window).on('load', loadPrevValues());
    
  $('#button').on('click', getValuesFromForm);

  $(document).on('click', 'li', function() {
    $(this).toggleClass('bg-secondary');
  });
    
  //localStorage.removeItem('allVal');
    
  $('#list').sortable({
    axis: 'y',
    stop: function (event, ui){
          
    var updatedListLen = $(event.target).children().length;
    var todosLen = todos.length;
    
    var newTodos = [];

    //working properly-----------------------------------------------------------
    for (var i = 0; i < updatedListLen; i++) {
      for (var j = 0; j < todosLen; j++) {
        if(todos[j].uid == event.target.children[i].attributes[1].nodeValue) {
          newTodos.push(todos[j]);
          break;
        };
      }
    };

    console.log(newTodos);
    localStorage.setItem("allVal", JSON.stringify(newTodos));
  }
  });


})();