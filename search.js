chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
    if (request.action === "getSelection") {
        sendResponse({ data: window.getSelection().toString() });
    }else {
        sendResponse({});
    }
});