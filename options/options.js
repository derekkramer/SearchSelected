var engine = '';

function getEngine() {
    chrome.storage.sync.get(['searchselected_engine'], function(result) {
        console.log(result);
        if(result.hasOwnProperty('searchselected_engine')) {
            var engine = result['searchselected_engine'];
            alert('Found: ' + engine);
        }else {
            chrome.storage.sync.set({
                searchselected_engine: 'google'
            }, function() {
                alert('Not found: Set to Google');
                var engine = 'google';
                // Update status to let user know options were saved.
                var status = document.getElementById('status');
                status.textContent = 'Options saved.';
                setTimeout(function() {
                    status.textContent = '';
                }, 750);
            });
        }
    });
}

// Saves options to chrome.storage.sync.
function saveSettings() {
    var engine = document.getElementById('engine').value;

    chrome.storage.sync.set({ searchselected_engine: engine }, function() {
        var status = document.getElementById('status');
        status.innerHTML = 'Options saved.';
        setTimeout(function() {
            status.innerHTML = '&nbsp;';
        }, 750);
    });
}

function getSettings() {
    // chrome.storage.sync.remove('searchselected_engine', function() {
    //     if(chrome.runtime.lastError) {
    //         console.log(chrome.runtime.lastError);
    //     }
    //
    //     console.log('Cleared!');
    //     resolve();
    // });
    chrome.storage.sync.get('searchselected_engine', function(result) {
        if(result.hasOwnProperty('searchselected_engine')) {
            var engine = result.searchselected_engine;

            document.getElementById('engine').value = engine;
        }else {
            chrome.storage.sync.set({ searchselected_engine: 'google' }, function() {
                var engine = 'google';
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', getSettings);
document.getElementById('save').addEventListener('click', saveSettings);