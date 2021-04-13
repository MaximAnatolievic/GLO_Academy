let money = 350000;
let income = "фриланс";
let addExpenses = "Бензин, еДа, вещи, собака, развлечение";
let mission = 5560000;
let period = 8;
let deposit = true;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

let myArr = addExpenses.toLowerCase().split(", ");

console.log(myArr);

let budgetDay = money/30;

console.log(budgetDay);


