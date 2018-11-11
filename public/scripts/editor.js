let activeElements = [];

document.addEventListener('DOMContentLoaded', () => {
    let mainEditor = document.getElementById('mainEditor')

    createEditorRow(mainEditor, 0);

    document.addEventListener('click', event => {
        let elem = activeElements.pop();
        while (elem) {
            elem.classList.remove('active');
            elem = activeElements.pop();
        }

        let target = event.target;
        target.classList.add('active');
        activeElements.push(target);
    });
});

let rows = [];
let activeRow = undefined;

function setActiveRow(index) {

}

function focusRow(index) {
    if (index < 0) index = 0;
    else if (index >= rows.length) index = rows.length - 1;
    rows[index].children[1].focus();
}

function createEditorRow(mainEditor, rowIndex) {
    // Create all the row elements, html/dom shenanigans
    let pre = document.createElement('span');
    pre.innerHTML = rowIndex + 1;

    let input = document.createElement('input');
    input.setAttribute('rowIndex', rowIndex);

    input.addEventListener('keydown', event => {
        let target = event.target;
        let key = event.key;

        let index = Number(target.getAttribute('rowIndex'));

        switch (key) {
            case 'Enter':
                createEditorRow(mainEditor, index + 1);
                break;
            case 'ArrowUp':
                focusRow(index - 1);
                break;
            case 'ArrowDown':
                focusRow(index + 1);
                break;
            default:
                // Do nothing
                break;
        }
    });

    rows.push({
        pre: pre,
        input: input
    });

    mainEditor.appendChild(pre);
    mainEditor.appendChild(input);

    focusRow(rowIndex);
}