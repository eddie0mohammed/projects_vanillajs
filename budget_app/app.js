
//Budget Controller
var budgetController = (function(){

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    Expense.prototype.calcPercentage = function(totalIncome){
        
        if (totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome) * 100);
        }else{
            this.percentage = -1;
        }
    }

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(elem => {
            sum += elem.value;
        });
        data.totals[type] = sum;
    }

    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        bugdet: 0,
        percentage: -1
    }


    return {
        addItem: function(type, des, val){

            var newItem, ID;

            //create new id
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else{
                ID = 0;
            }

            //create new income or expense
            if (type === 'exp'){
                newItem = new Expense(ID, des, val);
            }else{
                newItem = new Income(ID, des, val);
            }

            // add new item to respective array
            data.allItems[type].push(newItem);

            //return new element
            return newItem;
        },

        calculateBudget: function(){

            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            //calculate the percentage of the income that we spent
            if (data.totals.inc > 0){
                data.percentage = ((data.totals.exp / data.totals.inc) * 100).toFixed(0);
            }else{
                data.percentage = -1;
            }
           

        },
        getBudget: function(){
            return {
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
                budget: data.budget

            }
        },
        deleteItem: function(type, id){
            
            var ids, index;
            ids = data.allItems[type].map(elem => {
                return elem.id;
            });

            index = ids.indexOf(id);
            if (index !== -1){
                data.allItems[type].splice(index, 1);
            }

        },
        calculatePercentages: function(){
            data.allItems.exp.forEach(elem => {
                elem.calcPercentage(data.totals.inc);
            })

        },

        getPercentages: function(){
            var allPerc = data.allItems.exp.map(elem => {
                return elem.getPercentage();
            });
            return allPerc;
        },
        testing: function(){
            console.log(data);
        }
    }

   
})();


//UI Controller
var UIController = (function(){

    return {
       getInput: function(){
           return {
               add_type: document.querySelector('.add__type').value,
               description: document.querySelector('.add__description').value,
               value: parseFloat(document.querySelector('.add__value').value)
           }
       },
       addListItem: function(obj, type){

        var html, newHtml, element;
        // create HTML string with placeholder text
        if (type === 'inc'){

        element = '.income__list';
        html = `<div class="item clearfix" id="inc-%id%">
            <div class="item__description">%description%</div>
            <div class="right clearfix">
                <div class="item__value">+ %value%</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>`;
        }else{
            element = '.expenses__list';
            html = `<div class="item clearfix" id="exp-%id%">
            <div class="item__description">%description%</div>
            <div class="right clearfix">
                <div class="item__value">- %value%</div>
                <div class="item__percentage">21%</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>`;
        } 

        //replace placeholder text with actual data
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value.toFixed(2));
        
        //insert HTML into DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

       },
       clearFields: function(){
           document.querySelector('.add__description').value = '';
           document.querySelector('.add__value').value = '';
           document.querySelector('.add__description').focus();
       },
       displayBudget: function(budget){
           //budget available
           if (budget.budget >= 0){
               document.querySelector('.budget__value').textContent = '+' + budget.budget.toFixed(2);

           }else{
            document.querySelector('.budget__value').textContent = budget.budget.toFixed(2);
           }

           //income
           document.querySelector('.budget__income--value').textContent = `+ ${budget.totalInc.toFixed(2)}`;

           //expense
           document.querySelector('.budget__expenses--value').textContent = `- ${budget.totalExp.toFixed(2)}`;

           //percentage
           if (budget.percentage > 0){
            document.querySelector('.budget__expenses--percentage').textContent = `${budget.percentage} %`;
           }else{
            document.querySelector('.budget__expenses--percentage').textContent = `--`;
           }
           
       },
       deleteListItem: function(selectorID){
           var elem = document.getElementById(selectorID);
           elem.parentNode.removeChild(elem);


       },
       displayPercentages: function(percentages){
           var fields = document.querySelectorAll('.item__percentage');

           var nodeListForEach = function(list, callback){
               for (let i = 0; i < list.length; i++){
                   callback(list[i], i);
               }
           }

           nodeListForEach(fields, function(current, index){

            if (percentages[index] > 0){
                current.textContent = percentages[index] + '%';
            }else{
                current.textContent = '--';
            }
           })

       },
       displayMonth: function(){
           var now = new Date();

           var year = now.getFullYear();
           var month = now.getMonth();
           months = ['Jan', "Feb", "Mar", 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
           document.querySelector('.budget__title--month').textContent = `${months[month - 1]} ${year}`;
           
       }

    }
})();



//Global App Controller
var controller = (function(budgetCtrl, UICtrl){


    //set up Event Listeners
    var setupEventListeners = function(){
        //add button clicked
        document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

        //enter button clicked
        document.addEventListener('keypress', function(e){
            e.stopPropagation();
            if (e.keyCode === 13){
                ctrlAddItem();
            }
        });

        //delete event listener
        document.querySelector('.container').addEventListener('click', ctrlDeleteItem);
    }

    var updateBudget = function(){
         //1. calculate the budget
         budgetCtrl.calculateBudget();

         //2. Return the budget
         var budget = budgetCtrl.getBudget();

        //3. display the budget on the UI
        UICtrl.displayBudget(budget);

    }

    var updatePercentages = function(){

        //1. calculate percentages
        budgetCtrl.calculatePercentages();

        //2. read percentages from the budget controller
        var allPerc = budgetCtrl.getPercentages();

        //3. update the UI with new percentages
        // console.log(allPerc);
        UICtrl.displayPercentages(allPerc);


    }

    //cntlAddItem
    var ctrlAddItem = function(){

        var input, newItem;

         //1. get the field input data
        input = UICtrl.getInput();
        //  console.log(input);

        if (input.description && !isNaN(input.value) && input.value > 0){

            //2. add the item to the budget controller
            newItem = budgetController.addItem(input.add_type, input.description, input.value);
            // console.log(newItem);

            //3. add the item to the UI
            UICtrl.addListItem(newItem, input.add_type);

            UICtrl.clearFields();
        
            //4. calculate and update budget
            updateBudget();

            //5. calculate and update percentages
            updatePercentages();
        }
    }

    //ctrlDeleteItem
    var ctrlDeleteItem = function(e){
        var itemID, splitID, type, ID;

        itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = Number(splitID[1]);

            //1. delete item from data structure
            budgetCtrl.deleteItem(type, ID);
            
            //2. delete item from UI
            UICtrl.deleteListItem(itemID);

            //3. update and show the new budget
            updateBudget();

            //4. calculate and update percentages
            updatePercentages();

        }

        
    }

    return {
        init: function(){
            console.log('Application Started');
            UICtrl.displayBudget({
                totalInc: 0,
                totalExp: 0,
                percentage: 0,
                budget: 0

            });
            UICtrl.displayMonth();
            setupEventListeners();
        }
    }
   
})(budgetController, UIController);


controller.init();