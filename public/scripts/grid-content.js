// $(document).ready(() => {
//     $('textarea.value').focus(function () {
//         $(this).attr('rows', '10');
//     }).find('textarea').change();

//     $('textarea.value').blur(function () {
//         $(this).attr('rows', '1');
//     }).find('textarea').change();
// });

document.addEventListener("readystatechange", (doc, event) => {
    document.getElementsByName("details").forEach((elem) => {
        function expand(element, current, max, time) {
            doAnimation();

            function doAnimation() {
                if (current < max) {
                    current += 1;
                    element.setAttribute("rows", current);
                    setTimeout(doAnimation, time);
                }
            }
        }

        function collapse(element, current, min, time) {
            doAnimation();

            function doAnimation() {
                if (current > min) {
                    current -= 1;
                    element.setAttribute("rows", current);
                    setTimeout(doAnimation, time);
                }
            }
        }

        elem.addEventListener("focus", () => {
            expand(elem, 1, 10, 10);
        });

        elem.addEventListener("blur", () => {
            collapse(elem, 10, 1, 10);
        });
    });
});