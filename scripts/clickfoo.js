'use strict'

let money = +prompt("Ваш месячный доход");
let income = "фриланс";
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
let mission = 5560000;
let period = 8;
let deposit = confirm("Есть ли у Вас депозит в банке?");

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses);
let myArr = addExpenses.toLowerCase().split(", ");
console.log(myArr);

let expenses1 = prompt("Укажите обязательную статью расходов");
let amount1 = +prompt("Во сколько это обойдётся?"); 
let expenses2 = prompt("Укажите ещё одну обязательную статью расходов");;
let amount2 = +prompt("Во сколько это обойдётся?"); ;

let budgetMonth = money - (amount1 + amount2);
console.log(`Бюджет на месяц: ${budgetMonth}`);

period = Math.ceil(mission/budgetMonth);
console.log(`Цель будет достигнута за ${period} месяцев(-а)`)


let budgetDay = budgetMonth/30;
console.log(`Бюджет на день: ${Math.floor(budgetDay)}`);

let incomelvl;
if (budgetDay>1200){ //если строго больше 1200
    incomelvl="У вас высокий уровень дохода";
}
else if(budgetDay>=600){ //если меньше или равно 1200 но больше или равно 600
    incomelvl="У вас средний уровень дохода";
}
else if(budgetDay>=0){ //меньше 600, но больше или равно 0
    incomelvl="К сожалению у Вас уровень дохода ниже среднего";
}
else{
    incomelvl="что-то пошло не так";
}
console.log(incomelvl);

