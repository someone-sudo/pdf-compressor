async function compressPDF() {
    const file = document.getElementById("pdfFile").files[0];

    if (!file) {
        alert("Select a PDF");
        return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    document.getElementById("status").innerText = "Compressing...";

    const response = await fetch("/compress", {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        document.getElementById("status").innerText = "Failed";
        return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "compressed.pdf";
    a.click();

    document.getElementById("status").innerText = "Done!";
}
