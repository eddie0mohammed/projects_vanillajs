//Storage Controller
const StorageCtrl = (function(){




    return {
        storeItem: function(item){
            let items;

            //check if any items in ls
            if (localStorage.getItem('items') === null){
                items = [];
                //push new item
                items.push(item);
                //set ls
                localStorage.setItem('items', JSON.stringify(items));
            }else{
                items = JSON.parse(localStorage.getItem('items'));
                items.push(item);
                localStorage.setItem('items', JSON.stringify(items));

            }
        },

        getItemsFromStorage: function(){
            let items;

            if (localStorage.getItem('items') === null){
                items = [];
            }else{
                items = JSON.parse(localStorage.getItem('items'));
            }

            return items;
        },

        updateItemStorage: function(updatedItem){
            
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(elem => {
                if (elem.id === updatedItem.id){
                    elem.name = updatedItem.name;
                    elem.calories = updatedItem.calories;
                }
            })

            localStorage.setItem('items', JSON.stringify(items));

        },
        deleteFromLocalStorage: function(item){

            let items = JSON.parse(localStorage.getItem('items'));

            items = items.filter(elem => {
                return elem.id !== item.id;
            });

            localStorage.setItem('items', JSON.stringify(items));

        }
    }
})();