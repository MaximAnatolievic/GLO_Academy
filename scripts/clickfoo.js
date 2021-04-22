'use strict'
let isNumber = function (n){
    return !isNaN(parseFloat(n)) && isFinite(n)
}

let money,
    start = function(){
    do{
        money = prompt("Ваш месячный доход", 150000);
    }
    while(!isNumber(money))
}
start();

let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 5000000,
    period: 10,
    asking: function(){

        if(confirm('Есть ли у Вас дополнительный заработок?')){
            let itemIncome, cashIncome;
            do{
                itemIncome = prompt('Какой у Вас дополнительный заработок?', 'Фриланс');    
            }
            while(isNumber(itemIncome));

            do{
                cashIncome = prompt('Сколько в месяцВы на этом зарабатываете?', 10000);                
            }
            while(!isNumber(cashIncome));

            appData.income[itemIncome] = parseInt(cashIncome);
        }
        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", 'Сад, огород, собака, кот');
            appData.addExpenses = addExpenses.toLowerCase().split(", ");
            appData.deposit = confirm("Есть ли у Вас депозит в банке?");
            for(let i = 0; i<2; i++){ 
                let expen, expenCash;
                do{
                    expen = prompt(`Укажите обязательную статью расходов № ${i+1}`);
                }
                while(isNumber(expen));

                do{
                    expenCash = prompt(`Во сколько обойдётся статья ${expen}?`)
                }
                while(!isNumber(expenCash));
                appData.expenses[expen] = parseInt(expenCash);
            }
    
    },
    getExpensesMonth: function (){
        for (let item in appData.expenses){
           appData.expensesMonth += appData.expenses[item];
        };
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth/30;
    },
    getTargetMonth: function(){
        if(Math.ceil(appData.mission / appData.budgetMonth)<0){
            return 'цель не будет достигнута'
        }
        else{

            return `Цель будет достигнута за ${Math.ceil(appData.mission / appData.budgetMonth)} месяцев(-а)`;
        }
    },
    getStatusIncome: function(){

        if (appData.budgetDay>=1200){ 
            return "У вас высокий уровень дохода";
        }
        else if(appData.budgetDay>=600 && appData.budgetDay<1200){ 
            return "У вас средний уровень дохода";
        }
        else if(appData.budgetDay>=0 && appData.budgetDay<600){ 
            return "К сожалению у Вас уровень дохода ниже среднего";
        }
        else{
            return "что-то пошло не так";
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
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
}


appData.asking();

let getStringUpper = function(array){
    let firstString = array.join(', ');    
    let stringResult = firstString.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
    return stringResult;
};


let myVar = getStringUpper(appData.addExpenses);
console.log(myVar);



appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();

console.log(`Расходы за месяц: ${appData.expensesMonth}`);
console.log(appData.getTargetMonth())
console.log(appData.getStatusIncome());
console.log(`Наша программа включает в себя данные: \n`);
for(let item in appData){
    console.log(`${item}: ${appData[item]}`)
};
