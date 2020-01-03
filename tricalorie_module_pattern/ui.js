// UI Controller
const UICtrl = (function(){

    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        listItems: '#item-list li',
        clearBtn: '.clear-btn',
        li: '.collection-item'
    }



    return {
        populateItemList: function(items){
            let html = '';

            items.forEach(elem => {
                html += `
                <li class="collection-item" id="item-${elem.id}">
                    <strong>${elem.name}: </strong> <em>${elem.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>
                
                `;
            });

            //insert list items into ul
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        getSelectors: function(){
            return UISelectors;
        },

        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: parseInt(document.querySelector(UISelectors.itemCaloriesInput).value)
            }
        },

        addListItem: function(item){
            //create li element
            const li = document.createElement('li');
            //add class
            li.classList.add('collection-item');
            //add Id
            li.id = `item-${item.id}`;
            // Add HTML
            li.innerHTML = `
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            `;
            //insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);


        },

        updateListItem: function(item){

            let listItems = document.querySelectorAll(UISelectors.listItems);

            //turn node list into array
            listItems = Array.from(listItems);

            listItems.forEach(elem => {
                const itemID = elem.getAttribute('id');

                if (itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                    `;

                }
            })



        },

        clearfields: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },

        showTotalCalories: function(total){
            document.querySelector('.total-calories').textContent = total;
        },

        clearEditState: function(){
            UICtrl.clearfields();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';


        },

        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();

        },

        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },

        deleteListItem: function(item) {
            const itemID = `#item-${item.id}`;
            // console.log(itemID);
            document.querySelector(itemID).remove();
            // itemToRemove.remove();
        },

        clearUI: function(){
            const list = document.querySelectorAll(UISelectors.li);

            const arrList = Array.from(list);

            arrList.forEach(elem => {
                elem.remove();
            })
        }
    }

})();
