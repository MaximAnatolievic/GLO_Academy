'use strict'
//кнопка рассчитать
let btnCount = document.getElementById('start'),

//Плюс "добавить доход"
btnPlus1 = document.getElementsByTagName('button')[0],

//Плюс "добавить расход"
btnPlus2 = document.getElementsByTagName('button')[1],

// Чекбокс есть ли депозит
chkBox = document.querySelector('#deposit-check'),

//Возможный доход [0] - нпименование 1, [1] - наименование 2
incomeItem = document.querySelectorAll('.additional_income-item'), 

//Результирующие значения правой части
resultsItems = document.getElementsByClassName('result-total'),

//input Месячный доход
MonthIncome = document.querySelector('.salary-amount'),

//Дополнительный доход
incomeItems = document.querySelectorAll('.income-items'),

//Обязательные расходы
expensesItem = document.querySelectorAll('.expenses-items'),

//Возможные расходы
prbExpenses = document.querySelector('.additional_expenses-item'),

//Цель
ourTarget = document.querySelector('.target-amount'),

//Период расчета
periodRange = document.querySelector('.period-select'),

//значение периода цифрой
periodAmount = document.querySelector('.period-amount'),

checkName = document.querySelectorAll('[placeholder="Наименование"]'),

checkSum = document.querySelectorAll('[placeholder="Сумма"]'),

allInputs = document.querySelectorAll('input'),

reset = btnCount.cloneNode(true);
reset.textContent = 'Сбросить';





let isNumber = function (n){
    return !isNaN(parseFloat(n)) && isFinite(n)
}

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    incomeMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    period: 10,
    statusInsome:'',
    start: function(){
 
        this.budget = parseInt(MonthIncome.value);

        this.getAddIncome();
        this.getIncomes();
        this.getIncomeMonth();
        this.getExpenses();
        this.getExpensesMonth();
        this.getBudget();
        this.getAddExpenses();
        this.getStatusIncome();
        this.getTargetMonth();

        this.showResult();
        this.lockInputs();
        btnCount.replaceWith(reset);
    },
    //возможные доходы в массив.
    getAddIncome: function(){
        incomeItem.forEach(function(item){
            let incomeVal = item.value.trim();
            if(incomeVal!==''){
                appData.addIncome.push(incomeVal);
            }
        })
    
    },
    //добавление полей доходов
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value  ='';
        cloneIncomeItem.querySelector('.income-amount').value  ='';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlus1);
        incomeItems = document.querySelectorAll('.income-items');
        appData.addlisteners();
        if(incomeItems.length ===3){
            btnPlus1.style.display = 'none';
        }
    },
        //Наполнение объекта Доходы
    getIncomes: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome!==''&&cashIncome!==''){
                appData.income[itemIncome] = parseInt(cashIncome);
            }
        });

    },
    //Получение суммы всех доходов
    getIncomeMonth: function (){
        this.incomeMonth = parseInt(this.budget);
        for (let item in this.income){
           this.incomeMonth += +this.income[item];
        };
    },
    //возможные расходы в массив
    getAddExpenses: function(){
        let addExpenses = prbExpenses.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item!==''){
                appData.addExpenses.push(item);
            }
        })
    },
    //добавление полей расходов
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItem[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value  ='';
        cloneExpensesItem.querySelector('.expenses-amount').value  ='';
        expensesItem[0].parentNode.insertBefore(cloneExpensesItem, btnPlus2);
        expensesItem = document.querySelectorAll('.expenses-items');
        appData.addlisteners();
        if(expensesItem.length ===3){

            btnPlus2.style.display = 'none';

        }
    },
    //Наполнение объекта Расходы
    getExpenses: function(){
        expensesItem.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses!==''&&cashExpenses!==''){
                appData.expenses[itemExpenses] = parseInt(cashExpenses);
            }
        });

    },
    //Получение суммы всех расходов
    getExpensesMonth: function (){
        for (let item in this.expenses){
           this.expensesMonth += +this.expenses[item];
        };
    },
    //Месячный и дневной бюджеты
    getBudget: function(){
        this.budgetMonth = appData.incomeMonth - appData.expensesMonth;
        this.budgetDay = Math.round(this.budgetMonth/30);
    },
    getTargetMonth: function(){
        if(Math.ceil(ourTarget.value / this.budgetMonth)<0){
            resultsItems[6].value = 'Ошибка в данных';
        }
        else{

            resultsItems[6].value = Math.ceil(ourTarget.value / this.budgetMonth);
        }
    },
    getStatusIncome: function(){

        if (this.budgetDay>=1200){ 
            this.statusInsome = "У вас высокий уровень дохода";
        }
        else if(this.budgetDay>=600 && this.budgetDay<1200){ 
            this.statusInsome = "У вас средний уровень дохода";
        }
        else if(this.budgetDay>=0 && this.budgetDay<600){ 
            this.statusInsome = "К сожалению у Вас уровень дохода ниже среднего";
        }
        else{
            this.statusInsome = "что-то пошло не так";
        }
    },
    getInfoDeposit: function(){
        if(this.deposit){
            do{
            this.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            while(!isNumber(this.percentDeposit));
            do{
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while(!isNumber(this.moneyDeposit));

        }
    },
    showResult: function(){

        resultsItems[0].value = this.budgetMonth;
        resultsItems[1].value = this.budgetDay;
        resultsItems[2].value = this.expensesMonth;
        resultsItems[3].value = this.addIncome.join(', ');
        resultsItems[4].value = this.addExpenses.join(', ');
        resultsItems[5].value = this.budgetMonth*periodRange.value;

        periodRange.addEventListener('input', function(){
            resultsItems[5].value = this.budgetMonth*periodRange.value;
        });
        ;

    },
    
    lockInputs: function(){
        allInputs = document.querySelectorAll('input')
        for(let i=0;i<allInputs.length; i++ ){
            allInputs[i].disabled = 1;
        };
        btnPlus1.disabled = 1;
        btnPlus2.disabled = 1;

    },
    
    reset: function(){

        this.budget = 0;
        this.budgetMonth= 0;
        this.incomeMonth= 0;
        this.expensesMonth= 0;
        this.income= {};
        this.addIncome= [];
        this.expenses= {};
        this.addExpenses= [];

        for(let i=0;i<allInputs.length; i++ ){
            allInputs[i].disabled = 0;
        };
        btnPlus1.disabled = 0;
        btnPlus2.disabled = 0;

        for(let i=0;i<allInputs.length; i++ ){
            allInputs[i].value = '';
        };
        periodRange.value = 1;
        periodAmount.value = 1;

        if(incomeItems.length > 1){
            for(let i=1; i<incomeItems.length; i++)  {
                incomeItems[i].remove();
            }   
        };
        btnPlus1.style.display = 'block';

        if(expensesItem.length > 1){
            for(let i=1; i<expensesItem.length; i++)  {
                expensesItem[i].remove();
            }   
        };
        btnPlus2.style.display = 'block';

        reset.replaceWith(btnCount);
    },
    addlisteners: function(){

        checkName = document.querySelectorAll('[placeholder="Наименование"]');
        for(let i = 0; i<checkName.length; i++){


            checkName[i].addEventListener('input', function(){
                if(isNumber(checkName[i].value)){
                    this.value = null;
                    alert('Введите наименование!');
            
                };
            });
        }
        checkSum = document.querySelectorAll('[placeholder="Сумма"]');
        for(let j = 0; j<checkSum.length; j++){

            checkSum[j].addEventListener('input', function(){
                if(!isNumber(checkSum[j].value)){
                    this.value = null;
                    alert('Введите сумму!');
            
                };
            });   
        };
   
        btnPlus1.addEventListener('click', this.addIncomeBlock);
        btnPlus2.addEventListener('click', this.addExpensesBlock);
        periodRange.addEventListener('input', function(){
        periodAmount.textContent = periodRange.value;
        });

    },
};
function hardBindListeners(){
    appData.addlisteners.apply(appData);
};
hardBindListeners();

function hardBindStart (){
    appData.start.apply(appData);
};
function hardBindReset (){
    appData.reset.apply(appData);
};

btnCount.addEventListener('click', function(){
   if(MonthIncome.value !== ''){

       hardBindStart();
    }
   else{
        alert('Месячный бюджет не заполнен!');
   } 
});
reset.addEventListener('click', function(){   
    hardBindReset();     
});
