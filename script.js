document.getElementById("translateBtn").addEventListener("click", async () => {
    const inputText = document.getElementById("inputText").value;
    if (!inputText) return alert("Please enter some text!");

    document.getElementById("outputText").innerText = "Translating...";

    try {
        const response = await fetch("http://localhost:3000/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: inputText }),
        });

        const data = await response.json();
        document.getElementById("outputText").innerText =
            data.translated || "No translation returned";
    } catch (err) {
        console.error(err);
        document.getElementById("outputText").innerText =
            "Error translating text.";
    }
});
