/*global define*/
define(function () {
    'use strict';
    var slideShow = {},
        slideShowWindow,
        slidesContainer,
        next,
        prev;

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

    slideShow.run = function () {

        var  mainContainer = this.slidesContainer,
            animWindow = this.slideShowWindow,
            maxMove,
            mainContainerWidth,
            back = this.prev,
            next = this.next,
            slides = this.slides,
            numImages = this.slides.length;


        function setWindowHeight() {
            animWindow.style.height = slides[0].offsetHeight + 'px';
        }

        setWindowHeight();
        checkButtons();
        positionButtons();
        setMainContainerWidth();

        next.addEventListener("click", move, false);
        back.addEventListener("click", move, false);
        window.onresize = resize;

        function setMainContainerWidth() {
            var itemWidth = slides[0].offsetWidth,
                totalItemWidth,
                windowWidth;

            windowWidth = parseFloat(document.querySelector('.animWindow').offsetWidth);
            totalItemWidth = parseFloat(itemWidth) * numImages;
            mainContainerWidth = ((totalItemWidth/windowWidth) * 100) + '%';
        }

        function setItemWidth() {

        }

        function getItemWidth() {
            return parseFloat(document.querySelector('.animItem').style.width);
        }



        function resize() {
            setWindowHeight();
            setMainContainerWidth();
            positionButtons();
        }

        function positionButtons() {
            var imHeight = slides[0].offsetHeight;
            next.style.left = (parseFloat(animWindow.offsetWidth) - parseFloat(next.offsetWidth)) + 'px';
            next.style.top = ((imHeight - parseFloat(next.offsetHeight))/2) + 'px';
            back.style.top = ((imHeight - parseFloat(back.offsetHeight))/2) + 'px';
        }

        function checkButtons() {

            if(!mainContainer.style.marginLeft) {
                mainContainer.style.marginLeft = 0;
            }

            if(parseFloat(mainContainer.style.marginLeft) == 0) {
                back.style.display = 'none';
            } else {
                back.style.display = 'inline-block';
            }
            if(((parseFloat(mainContainer.style.marginLeft)  * -1) + 1) >= (parseFloat(maxMove) * -1)) {
                next.style.display = 'none';
            } else {
                next.style.display = 'inline-block';
            }
        }

        function move(event) {
            var i = 0,
                moveTo,
                next = 'next',
                back = 'back',
                offset = 1.82,
                button = event.target.id,
                itemWidth = parseFloat(getItemWidth()),
                x,
                y = parseFloat(mainContainer.style.marginLeft);

            maxMove = (parseFloat(mainContainerWidth) - 100) * -1;

            x = -parseFloat(maxMove);

            if((button == next) && (parseFloat(mainContainer.style.marginLeft) > parseFloat(maxMove))) {
                if((x + y) < parseFloat(itemWidth)) {
                    moveTo = ((parseFloat(mainContainer.style.marginLeft ) - (x + y)) );
                } else {
                    moveTo =  (parseFloat(mainContainer.style.marginLeft ) - (parseFloat(itemWidth) * offset) );
                }
            } else {
                if(button == back && (parseFloat(mainContainer.style.marginLeft) !== 0)) {
                    if((y *-1) < parseFloat(itemWidth)) {
                        moveTo = 0;
                    } else {
                        moveTo =  (parseFloat(mainContainer.style.marginLeft ) + (parseFloat(itemWidth) * offset) );
                    }
                }
            }
            mainContainer.style.marginLeft = moveTo + '%';
            checkButtons();
            positionButtons();
        }

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