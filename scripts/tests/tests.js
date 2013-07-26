require(["slideshow"], function(slideshow) {
    test( "is object", function() {
        ok( typeof slideshow === 'object', "Passed!" );
    });

    test( "has init method", function() {
        ok( typeof slideshow.init === 'function', "Passed!" );
    });

    test( "init with correct vars", function() {
        slideshow.init(
            document.getElementsByClassName('animWindow')[0],
            document.getElementsByClassName('animContainer')[0],
            document.getElementById('back'),
            document.getElementById('next'),
            document.querySelectorAll('.animItem img')
        );

        ok( typeof slideshow.getSlideShowWindow() === 'object', "Passed!" );
        ok( typeof slideshow.getSlidesContainer() === 'object', "Passed!" );
        ok( slideshow.getPrev().title === 'Back', "Passed!" )
        ok( slideshow.getNext().title === 'Next', "Passed!" )
        ok( slideshow.getSlides().length === 5, "Passed!" )
    });


});