const input = document.getElementById('input'),
result = document.getElementById('result');

function debounce(f, t) {
  return function (args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall && ((this.lastCall - previousCall) <= t)) {
      clearTimeout(this.lastCallTimer);
    }
    this.lastCallTimer = setTimeout(() => f(args), t);
  }
}

const show = () => {
  result.textContent = input.value;
}

let debouncedShow = debounce(show, 300);


input.addEventListener('input', debouncedShow);

