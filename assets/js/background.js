console.log("Tinder Life Hack - Running background script");

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url) {
      chrome.tabs.sendMessage(tabId, {
        message: "url-change",
        url: changeInfo.url
      })
    }
  }
);
