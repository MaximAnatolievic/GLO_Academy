'use strict'
let isNumber = function (n){
    return !isNaN(parseFloat(n)) && isFinite(n)
}

let money,
    start = function(){
    do{
        money = prompt("Ваш месячный доход");
    }
    while(!isNumber(money))
}
start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 5000000,
    period: 10,
    asking: function(){
        let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", 'Сад, огород, собака, кот');
            appData.addExpenses = addExpenses.toLowerCase().split(", ");
            appData.deposit = confirm("Есть ли у Вас депозит в банке?");
            for(let i = 0; i<2; i++){            
            appData.expenses[prompt(`Укажите обязательную статью расходов № ${i+1}`)] = +prompt(`Во сколько обойдётся статья?`);
            }
    }
}
appData.asking();

appData.budget = money;
appData.budgetDay = 0;
appData.budgetMonth = 0;
appData.expensesMonth = 0;

appData.getExpensesMonth = function getExpensesMonth(){
        for (let item in appData.expenses){
           appData.expensesMonth += appData.expenses[item];
        };
};
appData.getExpensesMonth();

console.log(`Расходы за месяц: ${appData.expensesMonth}`);


appData.getBudget = function getAccumulatedMonth(){
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth/30;
};
appData.getBudget();


appData.getTargetMonth = function getTargetMonth(){
    if(Math.ceil(appData.mission / appData.budgetMonth)<0){
    return 'цель не будет достигнута'
    }
    else{
        appData.period = Math.ceil(appData.mission / appData.budgetMonth);
        return `Цель будет достигнута за ${appData.period} месяцев(-а)`;
    }
};

console.log(appData.getTargetMonth())

appData.getStatusIncome = function getStatusIncome(){

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
};
console.log(appData.getStatusIncome());

console.log(`Наша программа включает в себя данные: \n`);
for(let item in appData){
    console.log(`${item}: ${appData[item]}`)
};