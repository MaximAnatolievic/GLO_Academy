let money;
let income;
let addExpenses;
let mission;
let period;
let deposit;



money = 350000;
income = "фриланс";
addExpenses = "Бензин, еДа, вещи, собака, развлечение";
deposit = true;
mission = 5560000;
period = 8;

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

/* Для усложнённого задания
var num = 266219;
var digits = num.toString().split('');
var realDigits = digits.map(Number)
let summary = 1;
for(i=0; i<realDigits.length;i++){
    summary *= realDigits[i];
}
console.log(summary);
sumpow = summary**3;
console.log(sumpow.toString().substring(0, 2));*/
