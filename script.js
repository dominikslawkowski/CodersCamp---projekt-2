'use strict';
document.addEventListener('DOMContentLoaded', initializeGallerySection);

function initializeGallerySection() {
    initGalleryNavBtns();
    initGalleryMobileNavBar();
    initBigGallery();
}

function initGalleryNavBtns() {
    let btns = objectToArray(document.querySelectorAll('.sn5_nav_dot-btn'));
    let wrapper = document.querySelector('.sn5_gallery-wrapper');
    btns.forEach(function (btn, idx) {
        btn.addEventListener('click', function () {
            btns.forEach(btn => btn.classList.remove('sn5_clicked'));
            btn.classList.add('sn5_clicked');
            wrapper.style.left = (idx * 100) * -1 + '%';
            initGelleryMobileNavBtns(wrapper, btns, idx);
        })
    })
}

function initGelleryMobileNavBtns(wrapper, btns, idx) {
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

function initBigGallery(){
    let bgs = objectToArray(document.querySelectorAll('.sn5_container_gallery_img-positioner'));
    bgs.forEach(function(bg, idx){
        bg.addEventListener('click', function(){
            bgs.forEach(function (bg, id){
                if (id!==idx){
                    bg.classList.remove('sn5_clicked');
                }
            });
            bg.classList.toggle('sn5_clicked');
            prepareBigPhotoGallery(bg);
        })
    });
}
function prepareBigPhotoGallery(bg){
    if (bg.querySelector('.sn5_gallery-image').hasChildNodes() === false) {
        let IMG = document.createElement('IMG');
        let urlAddres = 'gallery/photo-b.jpg';
        IMG.setAttribute('src', urlAddres);
        bg.querySelector('.sn5_gallery-image').appendChild(IMG);
        let bignavi = document.createElement('div');
        bignavi.classList.add('sn5_big-nav');
        bg.querySelector('.sn5_gallery-image').appendChild(bignavi);
        for (let i=0; i<3;i++){
            let bignaviButton = document.createElement('div');
            bignaviButton.classList.add('sn5_bignaviButton');
            bignavi.appendChild(bignaviButton);
            if (i===1){
                bignaviButton.innerText="X"; 
            }
        }
    } else {
        bg.querySelector('.sn5_gallery-image').removeChild(bg.querySelector('.sn5_gallery-image img'));
        bg.querySelector('.sn5_gallery-image').removeChild(bg.querySelector('.sn5_big-nav'));
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