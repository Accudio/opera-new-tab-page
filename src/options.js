chrome.storage.local.get('newtabpage',function(e){
	$('#url').val(e.newtabpage);
});
			
$('#url').on('input',function(){
	chrome.storage.local.set({newtabpage:$(this).val()});
});

$('#ok').click(function(){
	chrome.tabs.getCurrent(function(e){
		chrome.tabs.create({url:"opera://startpage"});
		chrome.tabs.remove(e.id);
	});
});