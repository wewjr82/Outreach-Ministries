const galleryData = [
  { filename: "1000012122.jpg", caption: "Summer 2014" },
  { filename: "1000012123.jpg", caption: "Death valley" },
  { filename: "1000012124.jpg", caption: "Early morning1" },
  { filename: "1000012125.jpg", caption: "Lost." },
  { filename: "image000000(1).jpg", caption: "Why now?" },
  { filename: "image000000.jpg", caption: "Verbier 10.08.2002" },
  { filename: "image000002.jpg", caption: "My temporary home" },
  { filename: "image000003.jpg", caption: "Love" },
  { filename: "image000004.jpg", caption: "Torino 2013" },
  { filename: "image000005.jpg", caption: "Summer 2014" },
  { filename: "image000006.jpg", caption: "Death valley" },
  { filename: "image000007(1).jpg", caption: "Early morning2" },
  { filename: "image000007(2).jpg", caption: "Lost." },
  { filename: "image000007.jpg", caption: "#Brooklyn" },
  { filename: "image000008.jpg", caption: "Why now?" },
  { filename: "IMG_2142.jpg", caption: "Verbier 10.08.2002" },
  { filename: "IMG_2145.jpg", caption: "My temporary home" },
  { filename: "IMG_2146.jpg", caption: "Love" },
  { filename: "IMG_2147.jpg", caption: "Torino 2013" },
  { filename: "IMG_3895.jpg", caption: "Summer 2014" },
  { filename: "IMG_3896.jpg", caption: "Death valley" },
  { filename: "IMG_3898.jpg", caption: "Early morning3" },
  { filename: "IMG_3899.jpg", caption: "Lost." },
  { filename: "IMG_3906.jpg", caption: "#Brooklyn" },
  { filename: "IMG_3907.jpg", caption: "Why now?" },
  { filename: "IMG_3908.jpg", caption: "Verbier 10.08.2002" },
  { filename: "IMG_3909.jpg", caption: "My temporary home" },
  { filename: "IMG_3910.jpg", caption: "Love" },
  { filename: "IMG_3912.jpg", caption: "Torino 2013" },
  { filename: "IMG_3917.jpg", caption: "Summer 2014" },
  { filename: "IMG_4180.jpg", caption: "Death valley" },
  { filename: "IMG_4210.jpg", caption: "Early morning4" },
  { filename: "IMG_4213.jpg", caption: "Lost." },
  { filename: "IMG_4214.jpg", caption: "#Brooklyn" },
  { filename: "IMG_4217.jpg", caption: "Why now?" },
  { filename: "IMG_4218.jpg", caption: "Verbier 10.08.2002" },
  { filename: "IMG_4219.jpg", caption: "My temporary home" },
  { filename: "IMG_4220.jpg", caption: "Love" },
  { filename: "IMG_4221.jpg", caption: "Torino 2013" },
  { filename: "IMG_4222.jpg", caption: "Torino 2013" },
  { filename: "IMG_4234.jpg", caption: "Summer 2014" },
  { filename: "IMG_4322.jpg", caption: "Death valley" },
  { filename: "IMG_4323.jpg", caption: "Early morning" },
  { filename: "IMG_4329.jpg", caption: "Lost." },
  { filename: "IMG_4333.jpg", caption: "#Brooklyn" },
  { filename: "IMG_4341.jpg", caption: "Why now?" },
  { filename: "IMG_4398.jpg", caption: "Verbier 10.08.2002" },
  { filename: "IMG_4399.jpg", caption: "My temporary home" },
  { filename: "IMG_4463.jpg", caption: "Love" },
  { filename: "IMG_4704.jpg", caption: "Torino 2013" },
];

const gallery = document.getElementById("gallery");

const seeMoreBtn = document.getElementById("see-more-btn");
const batchSize = 10;
let currentIndex = 0;

function createFigure(img) {
  const figure = document.createElement("figure");

  const picture = document.createElement("picture");

  const source = document.createElement("source");
  const webpFilename = img.filename.replace(".jpg", ".webp");
  source.setAttribute("data-srcset", `images/webp/${webpFilename}`);
  source.setAttribute("type", "image/webp");

  const image = document.createElement("img");
  image.setAttribute("data-src", `images/${img.filename}`);
  image.setAttribute("alt", img.caption);
  image.setAttribute("loading", "lazy");

  const caption = document.createElement("figcaption");
  caption.textContent = img.caption;

  picture.appendChild(source);
  picture.appendChild(image);
  figure.appendChild(picture);
  figure.appendChild(caption);
  gallery.appendChild(figure);

  observeImage(image);
}

function loadBatch() {
  const batch = galleryData.slice(currentIndex, currentIndex + batchSize);
  batch.forEach(createFigure);
  currentIndex += batchSize;

  // Hide button if all images are loaded
  if (currentIndex >= galleryData.length) {
    seeMoreBtn.style.display = "none";
  }
}

const observer =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              const picture = img.parentElement;
              const source = picture.querySelector("source");

              if (img.dataset.src) img.src = img.dataset.src;
              if (source && source.dataset.srcset)
                source.srcset = source.dataset.srcset;

              obs.unobserve(img);
            }
          });
        },
        { rootMargin: "100px" }
      )
    : null;

function observeImage(img) {
  if (observer) {
    observer.observe(img);
  } else {
    img.src = img.dataset.src;
  }
}

// Initial batch
loadBatch();

// On click, load next batch
seeMoreBtn.addEventListener("click", loadBatch);


