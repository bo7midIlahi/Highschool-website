const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');
const dotsNav = document.querySelector('.carousel_nav');
const dots=  Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// arranging the slides
//slides[0].style.left = slideWidth*0 +'px';
//slides[1].style.left = slideWidth*1 + 'px';
//slides[2].style.left = slideWidth*2 + 'px';

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth*index + 'px';
};

const moveToSlide = (track,currentSlide,targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left +')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot,targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};

const hideShowArrows = (slides,prevButton,nextButton,targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden')
    } else if (targetIndex === slides.length - 1 ){
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    };
}

slides.forEach(setSlidePosition);


// click left --> move to left

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide')
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide,prevSlide);
    updateDots(currentDot,prevDot);
    hideShowArrows(slides,prevButton,nextButton,prevIndex);

});

// click right --> move to right

nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide')
    const nexDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    
    moveToSlide(track,currentSlide,nextSlide);
    updateDots(currentDot,nexDot);
    hideShowArrows(slides,prevButton,nextButton,nextIndex);

});

// click nav --> move to that slide

dotsNav.addEventListener('click', e => {
    //which indicator was clicked
    const targetDot = e.target.closest('button');
    
    if (!targetDot) return; //which means that if we don't ckick a button the func will stop

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot ===targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track,currentSlide,targetSlide);
    updateDots(currentDot,targetDot);
    console.log(targetIndex)

    hideShowArrows(slides,prevButton,nextButton,targetIndex)

});