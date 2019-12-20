console.log("Tinder Like Hack - Running content script");

function findImages() {  
  let likes = document.getElementsByClassName("likesYou__scroller")[0].firstChild.children;
  // Frist child is some random rumbling about Tinder gold
  let dives = Array.prototype.slice.call(likes, 1);
  // The image is wrapped twice
  return dives.map(d => d.firstChild.firstChild);
}

function bigImage(src) {
  function convert(str, prefix, width, x, height, suffix) {
  	if (height == 84) {
      return prefix + 640 + x + 640 + suffix;
  	} else {
      return prefix + 640 + x + 800 + suffix;
  	}
  }
  let test = /(.*gotinder.com\/.*\/)(\d+)(x)(\d+)(.*\..*)/g;
  return src.replace(test, convert);
}

function clearImages(images) {
  for(let i = 0; i < images.length; i++){
    images[i].style.backgroundImage = "url(" + bigImage(images[i].style.backgroundImage.slice(4, -1).replace(/"/g, "")) + ")";
    images[i].classList.remove("Blur(12px)::a");
  }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // Listen for url-changes as Tinder does handle routing in a weird way
    if (request.message === "url-change") {
      if (request.url === "https://tinder.com/app/likes-you") {
	    setTimeout(function () {
	      let images = findImages();
      	  clearImages(images);
	    }, 5000);
      }
    }
});
