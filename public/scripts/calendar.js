$(document).ready(function () {
    for (elem of $('td.data')) {
        $(elem).load(`http://localhost:3000/calendar/details/${$(elem).attr('id')}`)
        $(elem).hide();
    }

    $('tr.event').click(function () {
        $('td.data').toggle(200);
    });

    $('tr.event').hover(function () {
        $(this).css('background-color', '#CCC');
    }, function () {
        $(this).css('background-color', 'transparent');
    });
});
