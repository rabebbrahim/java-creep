let form = document.getElementById('addForm');
let itemList = document.getElementById('to-do-items');
let filter = document.getElementById('filter');
let itemCompleted = document.getElementById('items-completed');
let clearList = document.getElementById('clr');

//add item with complete and delete button
form.addEventListener('submit', addItem);
function addItem(e) {
	// bloque action par defaut de l'interface event
	e.preventDefault();

	//retrieve value from input textfield
	let newItem = document.getElementById('item').value;

	/* 
		<ul> => already created at html
		<li class="todo-lists"> 'value' </li>
		<button class="complete">complete</button>
		<button class="delete">delete</button>
		</ul>
	 */

	//create list (li)
	let li = document.createElement('li');
	li.className = 'todo-lists';
	//adds the value that was retrieved to li
	li.appendChild(document.createTextNode(newItem));
	// created li will be added to ul ("to do items")
	itemList.appendChild(li);

	//create completeBtn(button element,  class and value)
	let completeBtn = document.createElement('button');
	completeBtn.className = 'complete';
	completeBtn.appendChild(document.createTextNode('complete'));

	//action/event when complete button is clicked
	completeBtn.addEventListener('click', completeItem);
	function completeItem(e) {
		//create list that was completed(li)
		let del = document.createElement('del');
		let li = document.createElement('li');
		li.className = 'completed-lists';
		//creates the value of an item same value that was retrieved
		li.appendChild(document.createTextNode(newItem));
		del.appendChild(li);
		// item will be added to ul ("completed items")
		itemCompleted.appendChild(del);

		//removes the item from ul (to do items)
		itemList.removeChild(e.target.parentElement);
	}
	//complete btn added to the li
	li.appendChild(completeBtn);
	itemList.appendChild(li);

	//creates delete button(class name and value )
	let deleteBtn = document.createElement('button');
	deleteBtn.className = 'delete';
	deleteBtn.appendChild(document.createTextNode('X'));

	//action for delete
	deleteBtn.addEventListener('click', removeItem);
	function removeItem(e) {
		if (confirm('Deleting an item?')) {
			//removes the parent element of deleteBtn w/c li
			//e.target - element that triggered the event -> deleteBtn
			let li = e.target.parentElement;
			itemList.removeChild(li);
		}
	}

	//deleteBtn added to li
	li.appendChild(deleteBtn);
	itemList.appendChild(li);

	//clears/removes value from input textfield
	document.getElementById('item').value = '';
}

// Filter Items exist in to do list
filter.addEventListener('keyup', filterItems);
function filterItems(e) {
	//convert all values to lowercase
	var text = e.target.value.toLowerCase();
	// Get items from the list
	var items = itemList.getElementsByTagName('li');

	/* 1.Converts items retrieved to an array and browse all items
	2. store each item to a var
	3. check each letter exists on an item 
	*/
	Array.from(items).forEach(function (item) {
		var itemName = item.firstChild.textContent;
		if (itemName.toLowerCase().indexOf(text) != -1) {
			item.style.display = 'block';
		} else {
			item.style.display = 'none';
		}
	});
}

// removes all items on the lists
clearList.addEventListener('click', clrList);
function clrList(e) {
	e.preventDefault;
	while (itemList.hasChildNodes()) {
		itemList.removeChild(itemList.firstChild);
	}
	while (itemCompleted.hasChildNodes()) {
		itemCompleted.removeChild(itemCompleted.firstChild);
	}
}
