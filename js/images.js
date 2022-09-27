let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    let slides = document.getElementsByClassName("slides");
    let demo = document.getElementsByClassName("demo");
    let caption = document.getElementById("capt");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < demo.length; i++) {
        demo[i].className = demo[i].className.replace(" act", "");
    }
    slides[slideIndex - 1].style.display = "block";
    demo[slideIndex - 1].className += " act";
    caption.innerHTML = demo[slideIndex - 1].alt;
}