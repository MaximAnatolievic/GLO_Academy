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
};

const AppData = function(){
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.incomeMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.period = 10;
    this.targetMoney = ourTarget.value;
    this.statusInsome = '';
};

AppData.prototype.addlisteners = function(){
    const _this = this;
    btnCount.addEventListener('click', function(){
        if(MonthIncome.value !== ''){
     
           _this.start();
         }
        else{
             alert('Месячный бюджет не заполнен!');
        } 
     });
     
     reset.addEventListener('click', function(){   
         _this.reset();     
     });

    
    periodRange.addEventListener('input', function(){
        periodAmount.textContent = periodRange.value;
        resultsItems[5].value = _this.budgetMonth*periodRange.value;
        });
    checkName.forEach(function(item){
        item.removeEventListener('input', _this.checkNames);
    });

    checkSum.forEach(function(item){
        item.removeEventListener('input', _this.checkSums);   
    });
    
    checkName = document.querySelectorAll('[placeholder="Наименование"]');
    checkSum = document.querySelectorAll('[placeholder="Сумма"]');
    
    checkName.forEach(function(item){
        item.addEventListener('input', _this.checkNames);
    });

    checkSum.forEach(function(item){
        item.addEventListener('input', _this.checkSums);   
    });
    btnPlus1.addEventListener('click', _this.addIncomeBlock);
    btnPlus2.addEventListener('click', _this.addExpensesBlock);
};

AppData.prototype.start = function(){
 
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
};

AppData.prototype.getAddIncome = function(){
    const _this = this;
    incomeItem.forEach(function(item){
        let incomeVal = item.value.trim();
        if(incomeVal!==''){
            _this.addIncome.push(incomeVal);
        };
    });        
};
AppData.prototype.addIncomeBlock = function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    let tit = cloneIncomeItem.querySelector('.income-title');
    tit.value  ='';
    let sum = cloneIncomeItem.querySelector('.income-amount');
    sum.value  ='';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlus1);
    tit.addEventListener('input', function checkNames(){
        if(isNumber(tit.value)){
            alert('Введите наименование!');
            this.value = null;          
        };
    });
    sum.addEventListener('input', function checkSums(){
        if(!isNumber(sum.value)){
           alert('Введите сумму!');
           this.value = null;         
        };
    });
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length ===3){
        btnPlus1.style.display = 'none';
    };

};
//Наполнение объекта Доходы
AppData.prototype.getIncomes = function(){
    const _this = this;
    incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome!==''&&cashIncome!==''){
            _this.income[itemIncome] = parseInt(cashIncome);
        }
    });

};
//Получение суммы всех доходов
AppData.prototype.getIncomeMonth = function (){
    this.incomeMonth = parseInt(this.budget);
    for (let item in this.income){
       this.incomeMonth += +this.income[item];
    };
};
//возможные расходы в массив
AppData.prototype.getAddExpenses = function(){
    const _this = this;
    let addExpenses = prbExpenses.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if(item!==''){
            _this.addExpenses.push(item);
        }
    })
};
//добавление полей расходов
AppData.prototype.addExpensesBlock = function(){


    let cloneExpensesItem = expensesItem[0].cloneNode(true);
    let tit = cloneExpensesItem.querySelector('.expenses-title');
    tit.value  =''
    let sum = cloneExpensesItem.querySelector('.expenses-amount');
    sum.value  ='';
    expensesItem[0].parentNode.insertBefore(cloneExpensesItem, btnPlus2);
    tit.addEventListener('input', function checkNames(){
        if(isNumber(tit.value)){
            alert('Введите наименование!');
            this.value = null;          
        };
    });
    sum.addEventListener('input', function checkSums(){
        if(!isNumber(sum.value)){
           alert('Введите сумму!');
           this.value = null;         
        };
    });
    expensesItem = document.querySelectorAll('.expenses-items');
    if(expensesItem.length ===3){
        btnPlus2.style.display = 'none';
    };
};
//Наполнение объекта Расходы
AppData.prototype.getExpenses = function(){
    const _this = this;
    expensesItem.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses!==''&&cashExpenses!==''){
            _this.expenses[itemExpenses] = parseInt(cashExpenses);
        }
    });

};
//Получение суммы всех расходов
AppData.prototype.getExpensesMonth = function (){
    for (let item in this.expenses){
       this.expensesMonth += +this.expenses[item];
    };
};
//Месячный и дневной бюджеты
AppData.prototype.getBudget = function(){
    this.budgetMonth = this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.round(this.budgetMonth/30);
};
AppData.prototype.getTargetMonth = function(){
    if(Math.ceil(this.targetMoney / this.budgetMonth)<0&&Math.ceil(this.targetMoney / this.budgetMonth)==Nan){
        resultsItems[6].value = 'Ошибка в данных';
    }
    else{

        resultsItems[6].value = Math.ceil(this.targetMoney / this.budgetMonth);
    }
};
AppData.prototype.getStatusIncome = function(){

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
};
AppData.prototype.getInfoDeposit = function(){
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
};
AppData.prototype.showResult = function(){

    resultsItems[0].value = this.budgetMonth;
    resultsItems[1].value = this.budgetDay;
    resultsItems[2].value = this.expensesMonth;
    resultsItems[3].value = this.addIncome.join(', ');
    resultsItems[4].value = this.addExpenses.join(', ');
    resultsItems[5].value = this.budgetMonth*periodRange.value;
};

AppData.prototype.lockInputs = function(){
    allInputs = document.querySelectorAll('input')
    for(let i=0;i<allInputs.length; i++ ){
        allInputs[i].disabled = 1;
    };
    btnPlus1.disabled = 1;
    btnPlus2.disabled = 1;
    resultsItems[5].disabled = 0;
    periodRange.disabled = 0;
};

AppData.prototype.reset = function(){

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
};

AppData.prototype.checkNames = function(){
    if(isNumber(this.value)){
        alert('Введите наименование!');
        this.value = null;          
    };
};

AppData.prototype.checkSums = function(){
    if(!isNumber(this.value)){
       alert('Введите сумму!');
       this.value = null;         
    };
};



let AnyObjName = new AppData();
AnyObjName.addlisteners();
console.log(AnyObjName);






