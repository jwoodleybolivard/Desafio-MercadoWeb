$(document).ready(function () {
    $('.producto').click(function () {
        $(this).toggleClass('seleccionado');
    });

    $('.producto').dblclick(function () {
        $(this).removeClass('seleccionado');
    });
});
