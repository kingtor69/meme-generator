// all code written by Tor Kingdon with liberal use of the jQuery docs
// https://api.jquery.com/

$.when($.ready).then(function() {
    console.log(`Let's get ready to party with jQuery!`);
});

$('img').addClass('image-center');

$('p').last().remove();

const randFontSize = (Math.floor(Math.random() * 101));
$('#title').css('font-size', randFontSize);

$('ol').append('<li>How could anyone be mad at a puppy in a cup?</li>');

$('ol').after('<button id="step6">click this button for a very important message</button>');

$('#step6').on('click', function() {
    $('h4').remove();
    $('ol').remove();
    $('#step6').after("<p>I apologize for the very silly list that was in this spot. I have no excuse for it's existence and I sincerely hope you will forgive me.</p>");
    $('#step6').remove();
});

$('img').on('click', function() {
    $(this).remove();
});

const $red = $('input').eq(0);
const $green = $('input').eq(1);
const $blue = $('input').eq(2);
$('input').change(function() {
    $('body').css('background-color', `rgb(${$red.val()}, ${$green.val()}, ${$blue.val()})`);
    $('body').css('color', `rgb(${255-$red.val()}, ${255-$green.val()}, ${255-$blue.val()})`)
});