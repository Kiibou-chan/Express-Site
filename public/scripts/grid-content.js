$(document).ready(() => {
    $('textarea.value').focus(function () {
        $(this).attr('rows', '10');
    }).find('textarea').change();

    $('textarea.value').blur(function () {
        $(this).attr('rows', '1');
    }).find('textarea').change();
});