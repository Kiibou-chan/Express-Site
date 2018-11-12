document.addEventListener('DOMContentLoaded', () => {
    let mainEditor = document.getElementById('mainEditor')

    createEditorRow(mainEditor, 0);
});

let rows = [];
let activeRow = undefined;

function focusRow(index) {
    if (index < 0) index = 0;
    else if (index >= rows.length) index = rows.length - 1;
    rows[index].input.focus();
}

function createEditorRow(editor, rowIndex) {
    // Create all the row elements, html/dom shenanigans
    let row = document.createElement('div');
    row.classList.add('row')

    let span = document.createElement('span');
    span.innerHTML = rowIndex + 1;
    span.classList.add('lineNumber');

    let input = document.createElement('input');
    input.setAttribute('rowIndex', rowIndex);

    input.addEventListener('keydown', event => {
        let target = event.target;
        let key = event.key;

        let index = Number(target.getAttribute('rowIndex'));

        switch (key) {
            case 'Enter':
                createEditorRow(editor, index + 1);
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
        span: span,
        input: input
    });

    row.appendChild(span);
    row.appendChild(input);

    editor.appendChild(row);

    focusRow(rowIndex);
}