var redirectURLS = ['opera://startpage/', 'browser://startpage/', 'chrome://startpage/'];

chrome.tabs.onCreated.addListener(function(tab) {
	
	for (var i = 0; i < redirectURLS.length; i++) {
		if(tab.url === redirectURLS[i])
			break; // user is trying to open startpage
		if(i === redirectURLS.length - 1)
			return; // Tab is not trying to open a startpage
	};

	chrome.storage.local.get('newtabpage', function(e) {

		if((typeof e.newtabpage) !== 'undefined') {

			for (var i = 0; i < redirectURLS.length; i++) 
				if(e.newtabpage.startsWith(redirectURLS[i].substr(0, redirectURLS[i].length - 1)))
					return; // user has set a default startpage as their URL
	
			if(e.newtabpage.indexOf(':') == -1) {
				e.newtabpage = 'http://'+e.newtabpage;
			}

			chrome.tabs.update(tab.id, {
        url: e.newtabpage
      });
		
		} else {
			chrome.tabs.update(tab.id, {
        url: 'options.html'
      });
		}
	});
	
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  
  for (var i = 0; i < redirectURLS.length; i++) {
    if(tab.url === redirectURLS[i])
      break; // user is trying to open startpage
    if(i == redirectURLS.length - 1)
      return; // Tab is not trying to open a startpage
  };

  chrome.storage.local.get('newtabpage', function(e) {

    if((typeof e.newtabpage) !== 'undefined') {

      for (var i = 0; i < redirectURLS.length; i++) 
        if(e.newtabpage.startsWith(redirectURLS[i].substr(0, redirectURLS[i].length - 1)))
          return; // user has set a default startpage as their URL
  
      if(e.newtabpage.indexOf(':') == -1){
        e.newtabpage = 'http://' + e.newtabpage;
      }

      chrome.tabs.update(tab.id, {
        url: e.newtabpage
      });
    
    } else {
      chrome.tabs.update(tab.id, {
        url: 'options.html'
      });
    }
  });
  
});
