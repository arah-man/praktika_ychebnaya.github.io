let images = [{
    url: "https://avatars.mds.yandex.net/get-entity_search/118114/914821503/SUx182_2x",
    title: "Черный"
  }, {
    url: "https://avatars.mds.yandex.net/get-entity_search/5581799/902707241/SUx182_2x",
    title: "Бежевый"
  }, {
    url: "https://avatars.mds.yandex.net/i?id=48d70f7abd1af4531b6c986bd21fa85d38d28241-5322230-images-thumbs&n=13",
    title: "Вишнёвый"
  }, {
    url: "https://avatars.mds.yandex.net/i?id=3d72a6d70bd3e05c9f5ef5908bd4b03ff349a20c-13604457-images-thumbs&n=13",
    title: "Коричневый"
  }, {
    url: "https://avatars.mds.yandex.net/i?id=c8b30228dfc9a9ffa91e314c2e1b55be980f661a-10245547-images-thumbs&n=13",
    title: "Молочный"
}];

function initSlider(options) {
  if (!images || !images.length) return;
  
  options = options || {
    titles: false,
    dots: true,
    autoplay: false
  };
  
  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");
  
  initImages();
  initArrows();
  
  if (options.dots) {
    initDots();
  }
  
  if (options.titles) {
    initTitles();
  }
  
  if (options.autoplay) {
    initAutoplay();
  }
  
  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }
  
  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
      arrow.addEventListener("click", function() {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }
  
  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }
  
  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
    if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }
    if (options.titles) changeTitle(num);
  }
  
  function initTitles() {
    let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
    sliderImages.innerHTML += cropTitle(titleDiv, 50);
  }
  
  function changeTitle(num) {
    if (!images[num].title) return;
    let sliderTitle = sliderImages.querySelector(".slider__images-title");
    sliderTitle.innerText = cropTitle(images[num].title, 50);
  }
  
  function cropTitle(title, size) {
    if (title.length <= size) {
      return title;
    } else {
      return title.substr(0, size) + "...";
    }
  }
  
  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}

let sliderOptions = {
  dots: true,
  titles: true,
  autoplay: true,
  autoplayInterval: 5000
};

document.addEventListener("DOMContentLoaded", function() {
  initSlider(sliderOptions);
});