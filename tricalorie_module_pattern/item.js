
// Item Controller
const ItemCtrl = (function(){
    //Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //data structure / state
    const data = {
        // items: [
        //     // {id: 0, name: 'Steak Dinner', calories: 1200},
        //     // {id: 1, name: 'Cookie', calories: 400},
        //     // {id: 2, name: 'Eggs', calories: 300},


        // ],
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    return {
        logData: function(){
            return data;
        },

        getItems: function(){
            return data.items;
        },

        addItem: function(name, calories){
            let ID;
            if (data.items.length > 0){
                ID = data.items[data.items.length -1].id + 1;
            }else{
                ID = 0;
            }
           
            //create new item
            const newItem = new Item(ID, name, calories);

            data.items.push(newItem);

            return newItem;

        },

        getTotalCalories: function(){
            let total = 0;
            total = data.items.reduce((acc, elem) => {
                return acc + elem.calories;
            }, 0);
            data.totalCalories = total;

            return data.totalCalories;
        },

        getItemById: function(id){
            let found;
            data.items.forEach(elem => {
                if (elem.id == id){
                    found = elem;
                }
            });

            return found;

        },
        
        setCurrentItem: function(item){
            
            data.currentItem = item;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },

        updateItem: function(name, calories){
            let found;

            data.items.forEach(elem => {
                if (elem.id === data.currentItem.id){
                    elem.name = name;
                    elem.calories = calories;
                    found = elem;
                }
            });
            return found;
          
        },

        deleteItem: function(item) {
            let items = ItemCtrl.getItems();

            items = items.filter(elem => elem.id !== item.id);

            data.items = items;

            // // //delete item from UI
            // UICtrl.deleteListItem(item);

        },

        clearData: function(){
            data.items = [];
        }
    }



})();