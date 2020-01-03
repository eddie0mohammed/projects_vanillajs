


// App Controller

const App = (function(ItemCtrl, StorageCtrl, UICtrl){

    //load Event Listeners
    const loadEventListeners = function(){
        const UISelectors = UICtrl.getSelectors();

        //add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        //disable submit on enter
        document.addEventListener('keypress', function(e){
            if(e.keyCode === 13 || e.which === 13){
                e.preventDefault();
                return false;
            }
        })

        //edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClicked);

        //update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        //back item event
        document.querySelector(UISelectors.backBtn).addEventListener('click', (e) => {
            e.preventDefault();
            UICtrl.clearEditState();
        });

        //delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        //clear items event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItems);
    }

    const itemAddSubmit = (e) => {
        e.preventDefault();
        //get form input form UI controller
        const input = UICtrl.getItemInput();

        //check for name and calorie input
        if (input.name !== '' && input.calories){
            //add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            // add item to UI List
            UICtrl.addListItem(newItem);

            //get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showTotalCalories(totalCalories);

            //store in localstorage
            StorageCtrl.storeItem(newItem);


            //clear fields
            UICtrl.clearfields();

        }

    }
    const itemEditClicked = (e) => {
        if (e.target.classList.contains('edit-item')){
            const listId = e.target.parentNode.parentNode.id;

            let idNumber = listId.split('-')[1];
            //get Item
            let elem = ItemCtrl.getItemById(parseInt(idNumber));
            
            //set current Item
            ItemCtrl.setCurrentItem(elem);

            //add item to form
            UICtrl.addItemToForm();

        }

    }

    const itemUpdateSubmit = (e) => {
        e.preventDefault();

        //get item input
        const input = UICtrl.getItemInput();
        
        //update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        //update UI
        UICtrl.updateListItem(updatedItem);

        //get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        //show total calories
        UICtrl.showTotalCalories(totalCalories);

        //update local storage
        StorageCtrl.updateItemStorage(updatedItem);

        //clear edit state
        UICtrl.clearEditState();

    }

    const itemDeleteSubmit = (e) => {
        e.preventDefault();

        //get current item
        const currentItem = ItemCtrl.getCurrentItem();

        //delete from data structure
        ItemCtrl.deleteItem(currentItem);

        //delete from ui
        UICtrl.deleteListItem(currentItem);



        //get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        //show total calories
        UICtrl.showTotalCalories(totalCalories);

        //delete from local storage
        StorageCtrl.deleteFromLocalStorage(currentItem);

        //clear edit state
        UICtrl.clearEditState();

    }

    const clearAllItems = (e) => {
        e.preventDefault();

        //delete all items from data structure
        ItemCtrl.clearData();
        
        //get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        //show total calories
        UICtrl.showTotalCalories(totalCalories);

        //clear from local storage
        localStorage.clear();  

        //clearUI
        UICtrl.clearUI();


    }

    return {
        init: function(){
            console.log(`Initializing App...`);

            //set initial state
            UICtrl.clearEditState();
            
            //fetch items from data structure
            const items = ItemCtrl.getItems();

            // populate list with items
            UICtrl.populateItemList(items);

            //get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showTotalCalories(totalCalories);
             
            //load event listeners
            loadEventListeners();

        }
    }

})(ItemCtrl, StorageCtrl, UICtrl);


//Initialize App
App.init();