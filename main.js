console.log("Extension is up and running")

browser.runtime.onMessage.addListener((msg) => {
    if (msg.type === "SHOW_DIALOG") {
        showDialog();
    }
});


function showDialog() {
    if (document.getElementById("reflection-overlay")) return;


    const overlay = document.createElement("div");
    overlay.id = "reflection-overlay";
    Object.assign(overlay.style, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.6)",
        zIndex: 999999
    });


    const box = document.createElement("div");
    Object.assign(box.style, {
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "400px",
        margin: "20% auto",
        fontFamily: "sans-serif"
    });


    const question = document.createElement("p");
    question.textContent = "Why are you on this website right now?";


    const textarea = document.createElement("textarea");
    textarea.style.width = "100%";
    textarea.style.height = "100px";


    const button = document.createElement("button");
    button.textContent = "Submit";
    button.style.marginTop = "10px";


    button.onclick = () => {
    browser.storage.local.get({ responses: [] }).then((data) => {
        data.responses.push({
            url: window.location.href,
            response: textarea.value,
            timestamp: new Date().toISOString()
        });
        browser.storage.local.set({ responses: data.responses });
    });
    overlay.remove();
    };


    box.append(question, textarea, button);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
}