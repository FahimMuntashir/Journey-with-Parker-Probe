function progressBar() {
  let modal = document.getElementsByClassName('modal')[0];
  let img = document.getElementById("img");
  let modalImg = document.getElementById("modalImg");
  let caption = document.getElementById("caption");
  img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    caption.innerHTML = this.alt;
  }
  let span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
  }
  let progress = document.getElementById('progressbar');
  let totalHeight = document.body.scrollHeight - window.innerHeight;
  window.onscroll = function () {
    let progressHeight = (window.pageYOffset / totalHeight) * 100;
    progress.style.height = progressHeight + '%'
  }
}

progressBar()