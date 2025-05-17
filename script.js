//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const error = document.getElementById('error');
const loading = document.getElementById('loader');

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
const downloadImages = () => {
    return Promise.all(images.map(image => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image.url;
            img.onload = () => resolve(img.src);
            img.onerror = () => reject(`Failed to load image: ${image.url}`);
        });
    }));
};

btn.addEventListener("click", () => {
    loading.style.cssText = ` 
        color: black;
        width: 40px;
        height: 40px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;

    downloadImages().then((resolvedImages) => {
        loading.style.display = "none";
        resolvedImages.forEach((val) => {
            output.innerHTML += `<img src="${val}" />`;
        });
    }).catch((reject) => {
        loading.style.display = "none";
        error.textContent = reject;
    });
});