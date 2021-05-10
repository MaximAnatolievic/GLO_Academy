// кнопка рассчитать
const btnCount = document.getElementById('start');

// Плюс "добавить доход"
const btnPlus1 = document.getElementsByTagName('button')[0];

// Плюс "добавить расход"
const btnPlus2 = document.getElementsByTagName('button')[1];

// Чекбокс есть ли депозит
const chkBox = document.querySelector('#deposit-check');

// Возможный доход [0] - нпименование 1, [1] - наименование 2
const incomeItem = document.querySelectorAll('.additional_income-item');

// Результирующие значения правой части
const resultsItems = document.getElementsByClassName('result-total');

// input Месячный доход
const MonthIncome = document.querySelector('.salary-amount');

// Дополнительный доход
let incomeItems = document.querySelectorAll('.income-items');

// Обязательные расходы
let expensesItem = document.querySelectorAll('.expenses-items');

// Возможные расходы
const prbExpenses = document.querySelector('.additional_expenses-item');

// Цель
const ourTarget = document.querySelector('.target-amount');

// Период расчета
const periodRange = document.querySelector('.period-select');

// значение периода цифрой
const periodAmount = document.querySelector('.period-amount');

let checkName = document.querySelectorAll('[placeholder="Наименование"]');

let checkSum = document.querySelectorAll('[placeholder="Сумма"]');

let allInputs = document.querySelectorAll('input');

const bankList = document.querySelector('.deposit-bank');

const depositSum = document.querySelector('.deposit-amount');

const depositPerc = document.querySelector('.deposit-percent');

const reset = btnCount.cloneNode(true);
reset.textContent = 'Сбросить';
prbExpenses.placeholder = 'Наименование'; // поменял, чтоб обработчик "не вводить цифры накладывался и сюда тоже."

const isNumber = function numbs(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
  constructor() {
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
    this.targetMoney = 0;
    this.statusInsome = '';
  }

  addlisteners() {
    const _this = this;
    btnCount.addEventListener('click', () => {
      if (MonthIncome.value !== '') {
        _this.start();
      } else {
        alert('Месячный бюджет не заполнен!');
      }
    });

    reset.addEventListener('click', () => {
      _this.reset();
    });

    periodRange.addEventListener('input', () => {
      periodAmount.textContent = periodRange.value;
      resultsItems[5].value = _this.budgetMonth * periodRange.value;
    });

    checkName.forEach((item) => {
      item.removeEventListener('input', _this.checkNames);
    });

    checkSum.forEach((item) => {
      item.removeEventListener('input', _this.checkSums);
    });

    checkName = document.querySelectorAll('[placeholder="Наименование"]');
    checkSum = document.querySelectorAll('[placeholder="Сумма"]');

    checkName.forEach((item) => {
      item.addEventListener('input', _this.checkNames);
    });

    checkSum.forEach((item) => {
      item.addEventListener('input', _this.checkSums);
    });
    btnPlus1.addEventListener('click', _this.addBlock);
    btnPlus2.addEventListener('click', _this.addBlock);
    chkBox.addEventListener('change', this.depositHandler.bind(this));
    depositPerc.addEventListener('input', () => {
      if (depositPerc.value >= 0 && depositPerc.value <= 100) {
        btnCount.disabled = 0;
      } else {
        alert('Введите корректное значение в поле проценты');
        btnCount.disabled = 1;
      }
    });
  }

  start() {
    this.budget = parseInt(MonthIncome.value);

    this.getAddNames();
    this.getIncExp();
    this.depositHandler();
    this.getInfoDeposit();
    this.getBudget();
    this.getStatusIncome();
    this.getTargetMonth();
    this.showResult();
    this.lockInputs();
    btnCount.replaceWith(reset);
  }

  getAddNames() {
    const addingInc = [];
    const adiingExp = prbExpenses.value.split(',');

    incomeItem.forEach((item) => {
      addingInc.push(item.value);
    });

    const count = function (arr1, arr2) {
      for (let item of arr1) {
        item = item.trim();
        if (item !== '') {
          arr2.push(item);
        }
      }
    };
    count(addingInc, this.addIncome);
    count(adiingExp, this.addExpenses);
  }

  addBlock() {
    const strName = this.className.split(' ')[1].split('_')[0];
    const cloneItem = document.querySelector(`.${strName}-items`).cloneNode(true);
    const tit = cloneItem.querySelector(`.${strName}-title`);
    tit.value = '';
    const sum = cloneItem.querySelector(`.${strName}-amount`);
    sum.value = '';
    const btn = document.querySelector(`.${strName}_add`);
    document.querySelector(`.${strName}-items`).parentNode.insertBefore(cloneItem, btn);

    tit.addEventListener('input', function checkNames() {
      if (isNumber(tit.value)) {
        alert('Введите наименование!');
        this.value = null;
      }
    });
    sum.addEventListener('input', function checkSums() {
      if (!isNumber(sum.value)) {
        alert('Введите сумму!');
        this.value = null;
      }
    });

    const items = document.querySelectorAll(`.${strName}-items`);
    if (items.length === 3) {
      btn.style.display = 'none';
    }
  }

  // Наполнение объектов Доходы и расходы
  getIncExp() {
    const count = (item) => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = parseInt(itemAmount);
      }
    };
    incomeItems.forEach(count);
    expensesItem.forEach(count);
    for (const item in this.income) {
      this.incomeMonth += +this.income[item];
    }

    for (const item in this.expenses) {
      this.expensesMonth += +this.expenses[item];
    }
  }

  // Месячный и дневной бюджеты
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.round(this.budgetMonth / 30);
  }

  getTargetMonth() {
    this.targetMoney = +ourTarget.value;
    if (Math.ceil(this.targetMoney / this.budgetMonth) < 0) {
      resultsItems[6].value = 'Ошибка в данных';
    } else {
      resultsItems[6].value = Math.ceil(this.targetMoney / this.budgetMonth);
    }
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      this.statusInsome = 'У вас высокий уровень дохода';
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      this.statusInsome = 'У вас средний уровень дохода';
    } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
      this.statusInsome = 'К сожалению у Вас уровень дохода ниже среднего';
    } else {
      this.statusInsome = 'что-то пошло не так';
    }
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = +depositPerc.value;
      this.moneyDeposit = +depositSum.value;
    }
  }

  showResult() {
    resultsItems[0].value = this.budgetMonth;
    resultsItems[1].value = this.budgetDay;
    resultsItems[2].value = this.expensesMonth;
    resultsItems[3].value = this.addIncome.join(', ');
    resultsItems[4].value = this.addExpenses.join(', ');
    resultsItems[5].value = this.budgetMonth * periodRange.value;
  }

  lockInputs() {
    allInputs = document.querySelectorAll('input');

    allInputs.forEach((item) => {
      item.disabled = 1;
    });
    btnPlus1.disabled = 1;
    btnPlus2.disabled = 1;
    bankList.disabled = 1;
    resultsItems[5].disabled = 0;
    periodRange.disabled = 0;
  }

  reset() {
    this.budget = 0;
    this.budgetMonth = 0;
    this.incomeMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];

    allInputs.forEach((curitem) => {
      curitem.value = '';
      curitem.disabled = 0;
    });

    btnPlus1.disabled = 0;
    btnPlus2.disabled = 0;
    bankList.disabled = 0;

    periodRange.value = 1;
    periodAmount.textContent = 1;
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length > 1) {
      for (let i = 1; i < incomeItems.length; i++) {
        incomeItems[i].remove();
      }
    }

    btnPlus1.style.display = 'block';
    expensesItem = document.querySelectorAll('.expenses-items');
    if (expensesItem.length > 1) {
      for (let i = 1; i < expensesItem.length; i++) {
        expensesItem[i].remove();
      }
    }

    btnPlus2.style.display = 'block';
    if (chkBox.checked) {
      chkBox.checked = false;
      this.deposit = false;
      bankList.style.display = 'none';
      depositSum.style.display = 'none';
      depositPerc.style.display = 'none';
      bankList.value = '';
      depositSum.value = '';
      depositPerc.value = '';
      bankList.removeEventListener('change', this.changePercent);
    }
    reset.replaceWith(btnCount);
  }

  checkNames() {
    if (isNumber(this.value)) {
      alert('Введите наименование!');
      this.value = null;
    } 
    this.value = this.value.replace(/[^а-я \,]/ig, '');    
  }

  checkSums() {
    if (!isNumber(this.value)) {
      alert('Введите сумму!');
      this.value = null;
    }
  }

  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPerc.style.display = 'inline-block';
      depositPerc.value = '';
    } else {
      depositPerc.style.display = 'none';
      depositPerc.value = +valueSelect;
    }
  }

  depositHandler() {
    if (chkBox.checked) {
      bankList.style.display = 'inline-block';
      depositSum.style.display = 'inline-block';
      this.deposit = true;
      bankList.addEventListener('change', this.changePercent);
    } else {
      bankList.style.display = 'none';
      depositSum.style.display = 'none';
      depositPerc.style.display = 'none';
      bankList.value = '';
      depositSum.value = '';
      this.deposit = false;
      bankList.removeEventListener('change', this.changePercent);
    }
  }
}

const AnyObjName = new AppData();
AnyObjName.addlisteners.bind(AnyObjName);
AnyObjName.addlisteners();
