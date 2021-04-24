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

checkSum = document.querySelectorAll('[placeholder="Сумма"]');





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
        appData.budget = 0;
        appData.budgetMonth= 0;
        appData.incomeMonth= 0;
        appData.expensesMonth= 0;
        appData.income= {};
        appData.addIncome= [];
        appData.expenses= {};
        appData.addExpenses= [];

        appData.budget = parseInt(MonthIncome.value);

        appData.getAddIncome();
        appData.getIncomes();
        appData.getIncomeMonth();
        appData.getExpenses();
        appData.getExpensesMonth();
        appData.getBudget();
        appData.getAddExpenses();
        appData.getStatusIncome();
        appData.getTargetMonth();

        appData.showResult();
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
        appData.incomeMonth = parseInt(appData.budget);
        for (let item in appData.income){
           appData.incomeMonth += +appData.income[item];
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
        for (let item in appData.expenses){
           appData.expensesMonth += +appData.expenses[item];
        };
    },
    //Месячный и дневной бюджеты
    getBudget: function(){
        appData.budgetMonth = appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.round(appData.budgetMonth/30);
    },
    getTargetMonth: function(){
        if(Math.ceil(ourTarget.value / appData.budgetMonth)<0){
            resultsItems[6].value = 'Ошибка в данных';
        }
        else{

            resultsItems[6].value = Math.ceil(ourTarget.value / appData.budgetMonth);
        }
    },
    getStatusIncome: function(){

        if (appData.budgetDay>=1200){ 
            appData.statusInsome = "У вас высокий уровень дохода";
        }
        else if(appData.budgetDay>=600 && appData.budgetDay<1200){ 
            appData.statusInsome = "У вас средний уровень дохода";
        }
        else if(appData.budgetDay>=0 && appData.budgetDay<600){ 
            appData.statusInsome = "К сожалению у Вас уровень дохода ниже среднего";
        }
        else{
            appData.statusInsome = "что-то пошло не так";
        }
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            do{
            appData.percentDeposit = prompt('Какой годовой процент?', 10);
            }
            while(!isNumber(appData.percentDeposit));
            do{
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while(!isNumber(appData.moneyDeposit));

        }
    },
    showResult: function(){
        resultsItems[0].value = appData.budgetMonth;
        resultsItems[1].value = appData.budgetDay;
        resultsItems[2].value = appData.expensesMonth;
        resultsItems[3].value = appData.addIncome.join(', ');
        resultsItems[4].value = appData.addExpenses.join(', ');
        resultsItems[5].value = appData.budgetMonth*periodRange.value;

        periodRange.addEventListener('change', function(){
            resultsItems[5].value = appData.budgetMonth*periodRange.value;
        });
        ;

    },
    addlisteners: function(){
        checkName = document.querySelectorAll('[placeholder="Наименование"]');
        for(let i = 0; i<checkName.length; i++){

            checkName[i].addEventListener('change', function(){
                if(isNumber(checkName[i].value)){
                    checkName[i].value = null;
                    alert('Введите наименование!');
            
                };
            });
        }
        checkSum = document.querySelectorAll('[placeholder="Сумма"]');
        for(let j = 0; j<checkSum.length; j++){
            checkSum[j].addEventListener('change', function(){
                if(!isNumber(checkSum[j].value)){
                    checkSum[j].value = null;
                    alert('Введите сумму!');
            
                };
            });   
        }
        

    }
}
appData.addlisteners();
btnCount.addEventListener('click', function(){
   if(MonthIncome.value !== ''){
        appData.start();
    }
   else{
        alert('Месячный бюджет не заполнен!');
   } 
});

btnPlus1.addEventListener('click', appData.addIncomeBlock);
btnPlus2.addEventListener('click', appData.addExpensesBlock);
periodRange.addEventListener('change', function(){
    periodAmount.textContent = periodRange.value;
});