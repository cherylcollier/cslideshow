/*global define*/
define(function () {
    'use strict';
    var slideShow = {},
        slideShowWindow,
        slidesContainer,
        mainContainerWidth,
        next,
        prev,
        maxMove;

    slideShow.init = function (slidesWindowDom, slidesContainerDom, prevDom, nextDom, slidesDom) {
        this.slideShowWindow = slidesWindowDom;
        this.slidesContainer = slidesContainerDom;
        this.next = nextDom;
        this.prev = prevDom;
        this.slides = slidesDom;

        var itemWidth = 100 / this.slides.length,
            i;

        for (i = 0; i < this.slides.length; i += 1) {
            this.slides[i].parentNode.style.width = itemWidth + '%';
        }

    };

    slideShow.setWindowHeight = function () {
        slideShow.slideShowWindow.style.height = slideShow.slides[0].offsetHeight + 'px';
    };

    slideShow.checkButtons = function () {

        if (!slideShow.slidesContainer.style.marginLeft) {
            slideShow.slidesContainer.style.marginLeft = 0;
        }

        slideShow.prev.style.display = slideShow.next.style.display = 'inline-block';

        if (parseFloat(slideShow.slidesContainer.style.marginLeft) === 0) {
            slideShow.prev.style.display = 'none';
        }

        if (((parseFloat(slideShow.slidesContainer.style.marginLeft)  * -1) + 1) >= (parseFloat(slideShow.maxMove) * -1)) {
            slideShow.next.style.display = 'none';
        }
    };

    slideShow.positionButtons = function () {
        var imHeight = slideShow.slides[0].offsetHeight;
        slideShow.next.style.left = (parseFloat(slideShow.slideShowWindow.offsetWidth) - parseFloat(slideShow.next.offsetWidth)) + 'px';
        slideShow.next.style.top = ((imHeight - parseFloat(slideShow.next.offsetHeight)) / 2) + 'px';
        slideShow.prev.style.top = ((imHeight - parseFloat(slideShow.prev.offsetHeight)) / 2) + 'px';
    };

    slideShow.setMainContainerWidth = function () {
        var itemWidth = slideShow.slides[0].offsetWidth,
            totalItemWidth,
            windowWidth;

        windowWidth = parseFloat(document.querySelector('.animWindow').offsetWidth);
        totalItemWidth = parseFloat(itemWidth) * slideShow.slides.length;
        slideShow.mainContainerWidth = ((totalItemWidth / windowWidth) * 100) + '%';
    };

    slideShow.move = function (event) {
        var moveTo,
            next = 'next',
            back = 'back',
            offset = 1.82,
            button = event.target.id,
            itemWidth = parseFloat(slideShow.slides[0].parentNode.style.width),
            x,
            y = parseFloat(slideShow.slidesContainer.style.marginLeft);

        maxMove = (parseFloat(slideShow.mainContainerWidth) - 100) * -1;
        slideShow.maxMove = maxMove;

        x = -parseFloat(maxMove);

        if ((button === next) && (parseFloat(slideShow.slidesContainer.style.marginLeft) > parseFloat(maxMove))) {
            if ((x + y) < parseFloat(itemWidth)) {
                moveTo = ((parseFloat(slideShow.slidesContainer.style.marginLeft) - (x + y)));
            } else {
                moveTo = (parseFloat(slideShow.slidesContainer.style.marginLeft) - (parseFloat(itemWidth) * offset));
            }
        } else {
            if (button === back && (parseFloat(slideShow.slidesContainer.style.marginLeft) !== 0)) {
                if ((y * -1) < parseFloat(itemWidth)) {
                    moveTo = 0;
                } else {
                    moveTo = (parseFloat(slideShow.slidesContainer.style.marginLeft) + (parseFloat(itemWidth) * offset));
                }
            }
        }
        slideShow.slidesContainer.style.marginLeft = moveTo + '%';
        slideShow.checkButtons();
        slideShow.positionButtons();
    };

    slideShow.run = function () {

        slideShow.setWindowHeight();
        slideShow.checkButtons();
        slideShow.positionButtons();
        slideShow.setMainContainerWidth();

        slideShow.prev.addEventListener("click", slideShow.move, false);
        slideShow.next.addEventListener("click", slideShow.move, false);

        window.addEventListener("resize", function () {
            slideShow.setWindowHeight();
            slideShow.setMainContainerWidth();
            slideShow.positionButtons();
        }, false);
    };


    slideShow.getSlideShowWindow = function () {
        return this.slideShowWindow;
    };

    slideShow.getSlidesContainer = function () {
        return this.slidesContainer;
    };

    slideShow.getPrev = function () {
        return this.prev;
    };

    slideShow.getNext = function () {
        return this.next;
    };

    slideShow.getSlides = function () {
        return this.slides;
    };

    return slideShow;

});