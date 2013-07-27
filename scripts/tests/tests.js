require(["slideshow"], function (slideshow) {

    module("slideshow", {
        setup: function () {
            slideshow.init(
                document.getElementsByClassName('animWindow')[0],
                document.getElementsByClassName('animContainer')[0],
                document.getElementById('back'),
                document.getElementById('next'),
                document.querySelectorAll('.animItem img')
            );
        },
        teardown: function () {
        }
    });

    test("is object", function () {
        ok(typeof slideshow === 'object', "Passed!");
    });

    test("has init method", function () {
        ok(typeof slideshow.init === 'function', "Passed!");
    });

    test("init with correct vars", function () {
        ok(typeof slideshow.getSlideShowWindow() === 'object', "Passed!");
        ok(typeof slideshow.getSlidesContainer() === 'object', "Passed!");
        ok(slideshow.getPrev().title === 'Back', "Passed!")
        ok(slideshow.getNext().title === 'Next', "Passed!")
        ok(slideshow.getSlides().length === 5, "Passed!")
    });

    test("Set individual slide width %s", function () {
        var items = document.querySelectorAll('.animItem');
        for (var i = 0; i < items.length; i += 1) {
            ok(items[i].style.width === '20%', "Passed!");
        }
    });

    test("Set individual slide width %s", function () {
        slideshow.run();
        ok(document.getElementsByClassName('animWindow')[0].style.height === '21px', "Passed!");
    });
});