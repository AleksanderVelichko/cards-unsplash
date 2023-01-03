const CLIENT_ID = "NcMjHTa__4twlLaP28avVF_ki52TgJiv0-y9-1iZvXQ";

let slides;
let state = [];
let currentSlide;

const fetchPhotos = async () => {
  for (i = 1; i < 5; i++) {
    try {
      const url = `https://api.unsplash.com/photos/random?client_id=${CLIENT_ID}&count=4`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.length) {
        state = data;
        currentSlide = data[0].id;
        setPhotos();
      }
    } catch (err) {
      console.log(err);
    }
  }
};

const renderItem = () => {
  return state
    .map(({ urls: { regular }, user: { name }, id }) => {
      const isActive = currentSlide === id ? `active${i}` : "";
      return `<div class="slide ${isActive}" data-id="${id}" style="background-image: url(${regular})">
                <div class="slide-text">
                  <span>photo by</span>
                  ${name}
                </div>
              </div>`;
    })
    .join("");
};

const handleClick = ({ currentTarget }) => {
  const { id } = currentTarget.dataset;
  const parentId = currentTarget.parentNode.id[6];

  if (id === currentSlide) return;

  slides.forEach((slide) => slide.classList.remove(`active${parentId}`));
  currentTarget.classList.add(`active${parentId}`);
  currentSlide = id;
};

const setPhotos = () => {
  let slider = document.getElementById(`slider${i}`);

  slider.innerHTML = renderItem();
  slides = document.querySelectorAll(".slide");

  for (const slide of slides) {
    slide.addEventListener("click", handleClick);
  }
};

fetchPhotos();
