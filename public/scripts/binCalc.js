function input() {
    let input = document.getElementById('decInput');
    let binOut = document.getElementById('binOut');
    let octOut = document.getElementById('octOut');
    let decOut = document.getElementById('decOut');
    let duoOut = document.getElementById('duoOut');
    let hexOut = document.getElementById('hexOut');

    let num = (Number(input.value));

    binOut.textContent = num.toString(2);
    octOut.textContent = num.toString(8);
    decOut.textContent = num.toString(10);
    duoOut.textContent = num.toString(12);
    hexOut.textContent = num.toString(16);
}