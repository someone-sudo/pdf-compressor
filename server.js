const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();

app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });

app.post("/compress", upload.single("pdf"), (req, res) => {
    const input = req.file.path;
    const output = `compressed/${Date.now()}.pdf`;

    const cmd = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \
-dPDFSETTINGS=/ebook \
-dNOPAUSE -dQUIET -dBATCH \
-sOutputFile="${output}" "${input}"`;

    exec(cmd, (err) => {
        fs.unlinkSync(input);

        if (err) {
            return res.status(500).send("Compression failed");
        }

        res.download(output, () => {
            fs.unlinkSync(output);
        });
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
