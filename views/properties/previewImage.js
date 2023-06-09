const sendButton = document.querySelector('#send-button');
const fileInput = document.querySelector('#file-input');
const imagePreviewContainer = document.querySelector('#image-preview');
const imagePreviewList = [];

sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (sendButton.classList.contains('is-submitting')) return;
  updateFileInput();
  sendButton.classList.add('is-submitting');
  document.querySelector('#form').submit();
});

function updateFileInput() {
  const dataTramsfer = new DataTransfer();
  for (const image of imagePreviewList) {
    let file = new File([image], image.name, { type: image.type });
    dataTramsfer.items.add(file);
  }
  fileInput.files = dataTramsfer.files;
}

fileInput.addEventListener('change', () => {
  for (const file of fileInput.files) {
    if (imagePreviewList.every((image) => image.name != file.name)) {
      imagePreviewList.push(file);
    }
  }
  displayImagePreview();
});

function displayImagePreview() {
  let images = '';
  imagePreviewList.forEach((image, index) => {
    images += `<div style="position: relative; width: 410px;">
                <img src="${URL.createObjectURL(image)}" alt="image">
                <span
                  style="position: absolute; top: -4px; right: 6px; cursor: pointer; font-size: 22px; color: white;"
                  onclick="deleteImagePreview(${index})"
                >
                  &times;
                </span>
              </div>`;
  });
  imagePreviewContainer.innerHTML = images;
  imagePreviewContainer.style.marginTop = '16px';
}

function deleteImagePreview(index) {
  imagePreviewList.splice(index, 1);
  displayImagePreview();
}
