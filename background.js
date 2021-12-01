// Reloads extension when switching pages for quick debug.
chrome.tabs.onActivated.addListener(() => {
    chrome.runtime.reload();
});
