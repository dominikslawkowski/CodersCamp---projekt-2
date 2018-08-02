'use strict';
document.addEventListener('DOMContentLoaded', initializeGallerySection);

function initializeGallerySection() {
    initGalleryNavBtns();
    initGalleryMobileNavBar();
}

function initGalleryNavBtns() {
    let btns = objectToArray(document.querySelectorAll('.sn5_nav_dot-btn'));
    let wrapper = document.querySelector('.sn5_gallery-wrapper');
    btns.forEach(function (btn, idx) {
        btn.addEventListener('click', function () {
            wrapper.style.left = (idx * 100) * -1 + '%';
            initGelleryMobileNavBtns(wrapper);
        })
    })
}

function initGelleryMobileNavBtns(wrapper) {
    if (wrapper.parentNode.offsetWidth <= 620) {
        zenscroll.to(wrapper.parentNode);
    }
}

function initGalleryMobileNavBar() {
    let bar = document.querySelector('.sn5_nav');
    let lastPosition = window.pageYOffset;
    window.addEventListener('scroll', function () {
        if (bar.parentNode.offsetWidth <= 620) {
            let newPosition = window.pageYOffset;
            if (lastPosition<newPosition===true){
                stickyGalleryMobileNavScrollingDown(newPosition);
            } else if (lastPosition > newPosition===true) {
                stickyGalleryMobileNavScrollingUp(newPosition);
            }
            lastPosition=newPosition;
        }
    })
}
function stickyGalleryMobileNavScrollingDown(newPosition) {
    let gallery = document.querySelector('.sn5_gallery-wrapper');
    let roof=gallery.offsetTop;
    let floor = roof+gallery.offsetHeight;
    let perimeter = (window.innerHeight/3)*2;
    if (newPosition>roof&&(newPosition+perimeter)<floor){
        document.querySelector('.sn5_nav').classList.add('sn5_nav_fixed');
    } else {
        document.querySelector('.sn5_nav').classList.remove('sn5_nav_fixed');
    }
}
function stickyGalleryMobileNavScrollingUp(newPosition) {
    let gallery = document.querySelector('.sn5_gallery-wrapper');
    let roof = gallery.offsetTop;
    let floor = roof + gallery.offsetHeight;
    let perimeter = window.innerHeight / 3;
    if (newPosition < roof-perimeter) {
        document.querySelector('.sn5_nav').classList.remove('sn5_nav_fixed');
    } else if (newPosition < floor - (perimeter * 2) && newPosition > roof-perimeter-1) {
        document.querySelector('.sn5_nav').classList.add('sn5_nav_fixed');
    }
}
function objectToArray(objectToIterate) {
    let x = objectToIterate.length;
    let newArray = [];
    for (let i = 0; i < x; i++) {
        newArray.push(objectToIterate[i]);
    }
    return newArray;
}