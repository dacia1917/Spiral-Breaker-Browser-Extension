let activeTabId = null;
let activeUrl = null;
let startTime = null;


browser.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await browser.tabs.get(activeInfo.tabId);
    activeTabId = activeInfo.tabId;
    activeUrl = tab.url;
    startTime = Date.now();
});


browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tabId === activeTabId && changeInfo.status === "complete") {
        activeUrl = tab.url;
        startTime = Date.now();
    }
});


setInterval(async () => {
    if (!activeTabId || !startTime || !activeUrl) return;


    const { sites } = await browser.storage.local.get({ sites: {} });


    for (const site in sites) {
        if (activeUrl.includes(site)) {
            const limitMs = sites[site] * 60 * 1000;
            const elapsed = Date.now() - startTime;


            if (elapsed >= limitMs) {
                browser.tabs.sendMessage(activeTabId, { type: "SHOW_DIALOG" });
                startTime = Date.now();
            }
            break;
        }
    }
}, 1000);