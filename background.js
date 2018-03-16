chrome.commands.onCommand.addListener(function(command) {
    if (command) {
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "getSelection"
                }, function(response) {
                    console.log(response);
                    if(response) {
                        var url = encodeGoogle(response.data.trim());

                        chrome.tabs.create({url: url});
                    }
                });
            });
        });
    }
});

function encodeGoogle(str) {
    var ENGINE = 'https://www.google.com/search?q=';

    var url = ENGINE + encodeURI(str.replace(/ /g, '+'));

    return url;
}