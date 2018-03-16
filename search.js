chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getSelection") {
        sendResponse({ data: window.getSelection().toString() });
    }else {
        sendResponse({});
    }
});