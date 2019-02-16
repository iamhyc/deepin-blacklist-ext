chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'bbs.deepin.org'}
          })
        ],
        actions: [
          new chrome.declarativeContent.ShowPageAction()
        ]
      }
    ]);
  });

  chrome.webNavigation.onDOMContentLoaded.addListener(function() {
    //TODO: Send Message to Content Script
  }, {url: [{hostEquals: 'bbs.deepin.org'}]});

});