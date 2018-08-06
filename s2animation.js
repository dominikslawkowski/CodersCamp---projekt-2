
//------------------------------------------------------------------- section 2


var s2 = document.querySelectorAll(".s2-origin-skills")

var s2_triggerBouncing = function(){
    if (window.scrollY >=(s2[1].offsetTop - 100) && window.innerWidth >=768){
        for (var i=0; i<s2.length; i++){
            s2[i].classList.add("s2-bouncingAnimation");
    }
}
}
window.addEventListener("scroll", s2_triggerBouncing,false);