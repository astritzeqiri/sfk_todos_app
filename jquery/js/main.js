(function ($) {
	var $todosList = $('#todoslist'),
		$doneItemsList = $('#done-items'),
		$addTodoBtn = $('#add-todo');

	countTodos();

	// all done btn
	$("#checkAll").click(function(){
		markAllAsDone();
	});

	//create todo
	$addTodoBtn.on('keypress',function (e) {

		if (e.which == 13 && $(this).val() != '') {
			createTodo($(this).val()); 
			countTodos();
		}
   	});

	// mark task as done
	$('.todolist').on('change','#todoslist li input[type="checkbox"]', function(){
		if(! $(this).prop('checked')) {
			return;
		}

		var doneItem = $(this).parent().parent().find('label').text();
		$(this).parent().parent().parent().addClass('remove');
		done(doneItem);
		countTodos();
	});

	//delete done task from "already done"
	$('.todolist').on('click','.remove-item',function(){
		removeItem(this);
	});

	// count tasks
	function countTodos(){
		var count = $todosList.find("li").length;
		$('.count-todos').html(count);
	}

	//create task
	function createTodo(text){
		var element = '<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" />'+ text +'</label></div></li>';
		$todosList.append(element);
		$addTodoBtn.val('');
	}

	//mark task as done
	function done(doneItem){
		var element = '<li>'+ doneItem +'<button class="btn btn-default btn-xs pull-right remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
		$doneItemsList.append(element);
		$('.remove').remove();
	}

	function markAllAsDone(){
		var elements = [];

		$todosList.find("li").each( function() {
			elements.push($(this).text());   
		});

	    for (i = 0; i < elements.length; i++) {
	    	$doneItemsList.append('<li>' + elements[i] + '<button class="btn btn-default btn-xs pull-right remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>');
	    }
	    
	    $todosList.find("li").remove();
	    countTodos();
	}

	function removeItem(element){
		$(element).parent().remove();
	}
})(jQuery);
