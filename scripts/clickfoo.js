let money;
let income;
let addExpenses;
let mission;
let period;
let deposit;



function func(){
    money = parseInt(document.getElementById("money").value);
    income = parseInt(document.getElementById("income").value);
    addExpenses = parseInt(document.getElementById("addExpenses").value);
    mission = document.getElementById("mission").value;
    period = document.getElementById("period").value;
    deposit = (money+income)-addExpenses;
    alert("За период " + period + " дней вы потратили на "+ mission +" " + addExpenses +
    ". Остаток на вашем счёте составляет " + deposit);
    console.log('logged');
}