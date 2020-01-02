chrome.runtime.onInstalled.addListener(function () {
    //chrome.storage.sync.set({key:"state"});
    var rules = [
        {
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { urlContains: '.' },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        },
        {
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: window.location.href },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }
    ]
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules(rules);
    });
});
