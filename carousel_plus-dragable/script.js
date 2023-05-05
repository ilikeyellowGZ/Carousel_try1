const carousel = document.querySelector('.carousel'),
firstImg = carousel.querySelectorAll('img')[0],
arrowIcons = document.querySelectorAll('.wrapper i');  


let isDragStart = false, prevPageX, prevScrollLeft, positionDiff;
let firstImgWidth = firstImg.clientWidth + 14;
let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

const showHideIcons = () => {
    if(carousel.scrollLeft == 0) {
        arrowIcons[0].style.display = 'none';
    }
    else {
        arrowIcons[0].style.display = 'block';
    }
    if(carousel.scrollLeft == scrollWidth) {
        arrowIcons[1].style.display = 'none';
    }
    else {
        arrowIcons[1].style.display = 'block';
    }
}

arrowIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth; 
        setTimeout(() => showHideIcons(), 60);
    });
});

const autoSlide = () => {
    positionDiff = Math.abs(positionDiff)
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) {
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff }
    
    
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}


const dragging = (e) => {
    if(!isDragStart) return;
    e.preventDefault();
    carousel.classList.add('dragging');
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff ;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove('dragging');
    autoSlide();

}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);


carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('touchmove', dragging);



carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('touchend', dragging);
carousel.addEventListener('mouseleave', dragStop);