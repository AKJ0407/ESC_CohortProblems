function numbers(l) {
  var o = [];
  for (let i = 0; i < l.length; i++) {
    var n = parseInt(l[i], 10);
    if (!isNaN(n)) {
      o.push(n);
    }
  }
  return o;
}

// input: an array of numbers
// output: an object containing 'min', with the minimum of the array
//          and 'max' the maximum of the array.
function min_max(a) {
  // TODO: fixme
  if (a.length === 0) {
    return { min: null, max: null};
  }

  var min = Math.min(...a);
  var max = Math.max(...a);
  return { min: min, max: max };
}

function handleButton1Click() {
  var textbox1 = document.getElementById("textbox1");
  var min = document.getElementById("min");
  var max = document.getElementById("max");
  var items = textbox1.value.split(",");
  var obj = min_max(numbers(items));
  min.innerHTML = obj["min"];
  max.innerHTML = obj["max"];
}

function run() {
  var button1 = document.getElementById("button1");
  button1.addEventListener("click", handleButton1Click);
}

document.addEventListener("DOMContentLoaded", run);