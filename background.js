var BASE = {
    'google': 'https://www.google.com/search?q=',
    'duckduckgo': 'https://duckduckgo.com/?q=',
    'wolframalpha': 'http://www.wolframalpha.com/input/?i='
};

function engines(engine, str) {
    var url = BASE[engine] + encodeURI(str.replace(/ /g, '+'));

    return url;
}

chrome.commands.onCommand.addListener(function(command) {
    if(command) {
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "getSelection"
                }, function(response) {
                    if(response) {
                        getEngine().then(function(engine) {
                            var url = engines(engine, response.data.trim());

                            chrome.tabs.create({url: url});
                        });
                    }
                });
            });
        });
    }
});

function getEngine() {
    var engine = 'google';

    return new Promise(function(resolve, reject) {
        chrome.storage.sync.get(['searchselected_engine'], function(result) {
            if (result.hasOwnProperty('searchselected_engine')) {
                engine = result['searchselected_engine'];
            } else {
                chrome.storage.sync.set({
                    searchselected_engine: 'google'
                }, function() {
                    engine = 'google';
                });
            }

            resolve(engine);
        });
    });
}