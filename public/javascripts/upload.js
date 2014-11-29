var fileselect = document.getElementById("upload-files"),
  filedrag = document.getElementById("drop-zone"),
  uploadedSize = document.getElementById("uploaded"),
  totalSize = document.getElementById("total"),
  progressbar = document.getElementById("progress-bar");
Init();

//
// initialize
function Init() {
  fileselect.addEventListener("change", FileSelectHandler, false);
  filedrag.addEventListener("dragover", FileDragHover, false);
  filedrag.addEventListener("dragleave", FileDragHover, false);
  filedrag.addEventListener("drop", FileSelectHandler, false);
  filedrag.style.display = "block";
}

function FileDragHover(e) {
  e.stopPropagation();
  e.preventDefault();
  e.target.className = (e.type == "dragover" ? "upload-drop-zone drop" : "upload-drop-zone");
}

function FileSelectHandler(e) {
  FileDragHover(e);
  var files = e.target.files || e.dataTransfer.files;
  for (var i = 0, f; f = files[i]; i++) {
    ParseFile(f);
    UploadFile(f);
  }
}

function ParseFile(file) {
  console.log(file);
}

function UploadFile(file) {
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  formData.append('file', file);
  var size = (file.size / 1000000);
  totalSize.innerHTML = size.toFixed(2) + ' MB';
  xhr.open("POST", '/upload/image', true);
  xhr.upload.onprogress = function (e) {
    console.log("Progress", e.loaded, (e.loaded / e.total) * 100);
    progressbar.style.width = ((e.loaded / e.total) * 100) + '%';
    var size = (e.loaded / 1000000);
    uploadedSize.innerHTML = size.toFixed(2) + ' MB';
  };
  xhr.upload.onload = function (e) {
    var size = (e.loaded / 1000000);
    uploadedSize.innerHTML = size.toFixed(2) + ' MB';
    console.log(e);
  };
  xhr.upload.onerror = function (e) {
    console.log(e);
  };

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var img = new Image();
      img.src = xhr.response;
      var imageContainer = document.getElementById('converted-image');
      imageContainer.appendChild(img);
    }
  }
  xhr.send(formData);
}