/*global require*/
require(["slideshow/slideshow"], function (slideshow) {
    'use strict';
    slideshow.init(
        document.getElementsByClassName('animWindow')[0],
        document.getElementsByClassName('animContainer')[0],
        document.getElementById('back'),
        document.getElementById('next'),
        document.querySelectorAll('.animItem img')
    );

    slideshow.run();

});