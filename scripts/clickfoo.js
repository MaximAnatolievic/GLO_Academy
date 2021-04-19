'use strict'
let isNumber = function (n){
    return !isNaN(parseFloat(n)) && isFinite(n)
}

let money;
let income = "фриланс";
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", 'Сад, огород, собака, кот');
let mission = 5560000;
//let period = 8;
let deposit = confirm("Есть ли у Вас депозит в банке?");

let start = function(){
    do{
        money = prompt("Ваш месячный доход");
    }
    while(!isNumber(money))
}
start();


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
/* Удалены в соответствии с заданием
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses);*/
let myArr = addExpenses.toLowerCase().split(", ");


let expenses = [];
let amount = [];

for(let i = 0; i<2; i++){
expenses[i]= prompt(`Укажите обязательную статью расходов № ${i+1}`)
    do{
    amount[i] = +prompt(`Во сколько обойдётся статья ${expenses[i]}?`);
    }
    while(!isNumber(amount[i]))

}

function getExpensesMonth(){
        let total = amount.reduce(function(sum, current) {
        return sum + current;
      }, 0);
      return total;
}

console.log(getExpensesMonth());
console.log(myArr);

let accumulatedMonth = function getAccumulatedMonth(){
    return money - getExpensesMonth();
}

//console.log(`Бюджет на месяц: ${accumulatedMonth()}`);

function getTargetMonth(){
    let goal;
    let target = Math.ceil(mission/accumulatedMonth());
    if(target<0){
    goal = 'цель не будет достигнута'
    }
    else{
        goal = `Цель будет достигнута за ${target} месяцев(-а)`;
    }
    return goal;

}
console.log(getTargetMonth())


let budgetDay = accumulatedMonth()/30;
console.log(`Бюджет на день: ${Math.floor(budgetDay)}`);

function getStatusIncome(){
let incomelvl;
if (budgetDay>1200){ //если строго больше 1200
    incomelvl="У вас высокий уровень дохода";
}
else if(budgetDay>=600){ //если меньше или равно 1200 но больше или равно 600
    incomelvl="У вас средний уровень дохода";
}
else if(budgetDay>=0){ //меньше 600, но больше или равно 0git status
    incomelvl="К сожалению у Вас уровень дохода ниже среднего";
}
else{
    incomelvl="что-то пошло не так";
}
return incomelvl;
}
console.log(getStatusIncome());

