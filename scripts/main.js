require(["slideshow/slideshow"], function(slideshow) {

slideshow.init(
    document.getElementsByClassName('animWindow')[0],
    document.getElementsByClassName('animContainer')[0],
    document.getElementById('back'),
    document.getElementById('next'),
    document.querySelectorAll('.animItem img')
);

slideshow.run();

});