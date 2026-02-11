const sitesDiv = document.getElementById("sites");


function render() {
    browser.storage.local.get({ sites: {} }).then(({ sites }) => {
        sitesDiv.innerHTML = "";
        for (const site in sites) {
        const div = document.createElement("div");
        div.textContent = `${site}: ${sites[site]} min`;
        sitesDiv.appendChild(div);
        }
    });
}


render();


document.getElementById("add").onclick = async () => {
    const site = document.getElementById("site").value.trim();
    const minutes = parseInt(document.getElementById("minutes").value);
    if (!site || !minutes) return;

    const data = await browser.storage.local.get({ sites: {} });
    data.sites[site] = minutes;
    await browser.storage.local.set({ sites: data.sites });
    render();
};