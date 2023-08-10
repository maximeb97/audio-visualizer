function injectScript(file_path, tag, extensionId) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    script.setAttribute('id', "audio-visualiser");
    script.setAttribute('extension-id', extensionId);
    node.appendChild(script);
}

let url;
let extensionId;

try {
    url = browser.extension.getURL('indexBrowser.js');
    extensionId = browser.runtime.id;
} catch (err) {
    url = chrome.runtime.getURL('indexBrowser.js');
    extensionId = chrome.runtime.id;
}

injectScript(url, 'body', extensionId);
