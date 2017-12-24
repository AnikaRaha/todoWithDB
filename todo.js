(function(){

  var todos = [];
  var existingValues;
  var res;

  function getValuesFromForm() {
    console.log("inside getValuesFromForm");
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

    checkError(name, title, done, dueDate, priority);    
  }

  function checkError(name, title, done, dueDate, priority) {
    try {
      if (done.length && priority.length && name.length && title.length && dueDate.length) {
        sendToDatabase();
        storeIntoList(name, title, done, dueDate, priority); 
        //alert("inside getValuesFromForm");
      } else {
        console.log("form empty");
      }
    }
    catch(e) {
      alert("!!!ERROR!!!\n\nmake sure all the fields are filled and radio buttons are selected!");
    }
  }

  function storeIntoList(name, title, done, dueDate, priority) {
    // console.log("form not empty");
    var todo = {
        name: name,
        title: title,
        done: done,
        dueDate: dueDate,
        priority: priority,
        uid: new Date().getTime()
      };
    console.log(todo);
    todos.push(todo);
    
    // console.log(todos);
    //store data into localStorage
    //localStorage.setItem("allVal", JSON.stringify(todos));
    sliceElements(todos);
    $("input[name='name']").val('');
    $("input[name='title']").val('');
  }

  function sliceElements(todoList) {
    var len = todoList.length;
    //$('ol').empty();

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
      var getUid = elementObject[key].id;

      $('ol').append('<li class="form-control liChild">' + getName + ' : ' + getTitle + ' : ' + getDone + ' : ' + getDueDate + ' : ' + getPriority + '</li>');
      $('li:last-child').attr('data-uid', getUid); //attaches getUid value with the last child of list items in backend but does not show in view
      //sendToDatabase();
    });
  }

  function sendToDatabase() {
    var fd = $("#form").serialize();
    console.log(fd);
    // var todoFD = new FormData(fd);
    // console.log(todoFD);

    $.ajax({
        url: "sendToDB.php",
        type: "post",
        data: fd ,
        success: function (response) {
          //console.log(JSON.parse(response));
          alert(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
        }
    });
    //getValuesFromForm();
  } 

  function showAllFromDB() {
    
    $.ajax({
        url: "getFromDB.php",
        type: "post",
        //data: fd ,
        success: function (response) {
          res = $.parseJSON(response);
          console.log(res);
          sliceElements(res);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
        }
    });
  }

  function ajaxCallOnSort(newTodos){
    var stringifiedTodos = JSON.stringify(newTodos);
    console.log(stringifiedTodos);

    $.ajax({
          url: "updateOnSort.php",
          type: "post",
          //dataType: "json",
          data: {updatedTodos:stringifiedTodos} ,
          error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
          }
      });
  }

  $(window).on('load', showAllFromDB());
    
  $('#button').on('click', getValuesFromForm);

  $('#buttonCal').on('click', function(){
    document.location.href = "calender.html";
  });

  $(document).on('click', 'li', function() {
    $(this).toggleClass('bg-secondary');
  });
    
  //localStorage.removeItem('allVal');
    
  $('#list').sortable({
    axis: 'y',
    stop: function (event, ui){
      console.log(event.target.children[0].attributes[1].value);
      var updatedListLen = $(event.target).children().length;
      var todosLen = res.length;
      
      var newTodos = [];

      //working properly-----------------------------------------------------------
      for (var i = 0; i < updatedListLen; i++) {
        for (var j = 0; j < todosLen; j++) {
          if(res[j].id == event.target.children[i].attributes[1].value) {
            newTodos.push(res[j]);
            break;
          };
        }
      };

      console.log(newTodos);
      ajaxCallOnSort(newTodos);
    }
  });


})();