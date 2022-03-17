export default function ImgSlider({ data, sec, slideUlElement, imgAreaNode }) {
  this.curIdx = 0;
  this.slideUlElement = slideUlElement;
  this.imgAreaNode = imgAreaNode;
  this.data = data;
  this.dataCount = data.length;
  this.timer = null;
  this.ms = sec * 1000;
  this.sliderItems = null;
}
ImgSlider.prototype = {
  setCurSlider() {
    this.setCurSlideImg();
    this.removeAllSlidesSelectedStatus();
    this.setCurSlideSelected();
  },
  SlidercallBackFunc() {
    this.curIdx++;
    if (this.curIdx >= this.dataCount) this.curIdx = 0;
    this.setCurSlider();
  },

  runSlider() {
    this.timer = setInterval(this.SlidercallBackFunc.bind(this), this.ms);
  },

  stopSlider() {
    clearInterval(this.timer);
  },

  createSliderItems() {
    const sliderItemsTag = this.data.reduce((prev, cur, idx) => {
      return (
        prev +
        `
      <li class="carousel-item" data-carousel-idx="${idx}">
      <img src="${cur["thumbnail"]}" alt="${cur["alt"]}" class="img">
      </li>`
      );
    }, "");
    return sliderItemsTag;
  },

  findAllsliderItems() {
    this.sliderItems = document.querySelectorAll("[data-carousel-idx]");
  },

  setCurSlideImg() {
    this.imgAreaNode.style.backgroundImage = `url(${
      this.data[this.curIdx]["backgroundImg"]
    })`;
  },

  setCurSlideSelected() {
    this.sliderItems[this.curIdx].classList.add("selected");
  },

  removeAllSlidesSelectedStatus() {
    this.sliderItems.forEach((slide) => slide.classList.remove("selected"));
  },

  isElSlideItem(el) {
    return el.classList.contains("carousel-item");
  },

  isParentElSlideItem(el) {
    return el.parentElement.classList.contains("carousel-item");
  },

  handleMouseOver(target) {
    if (!this.isElSlideItem(target) && !this.isParentElSlideItem(target))
      return;

    this.stopSlider();
    const selectedSlide = this.isElSlideItem(target)
      ? target
      : target.parentElement;

    this.curIdx = selectedSlide.dataset.carouselIdx;
    this.setCurSlider();
  },

  onMouseOver() {
    this.slideUlElement.addEventListener("mouseover", ({ target }) =>
      this.handleMouseOver(target)
    );
  },

  onMouseOut() {
    this.slideUlElement.addEventListener("mouseout", ({ target }) => {
      if (!this.isElSlideItem(target) && !this.isParentElSlideItem(target))
        return;

      this.runSlider();
    });
  },

  onEvents() {
    this.onMouseOver();
    this.onMouseOut();
  },

  setSliderItems() {
    this.slideUlElement.innerHTML = this.createSliderItems();
    this.findAllsliderItems();
  },

  init() {
    this.setSliderItems();
    this.setCurSlider();
    this.runSlider();
    this.onEvents();
  },
};
