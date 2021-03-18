$('form').after('<table></table>');
$('form').on('submit', function(e) {
    e.preventDefault();
    const $name = $('input').eq(0).val();
    const $rating = $('input').eq(1).val();
    $('table').append(`<tr><td><button class="delete">X</button></td><td>${$name}</td><td>${$rating}</td></tr>`);

    $('.delete').on('click', function(e) {
        $(this).parents().eq(1).remove();
    })
})