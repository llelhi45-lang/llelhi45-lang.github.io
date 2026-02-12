window.addEventListener('load', function() {
    const fileInput = document.getElementById('file-input');
    const output = document.getElementById('output');
    const status = document.getElementById('status');

    if (fileInput) {
        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            status.innerText = "Sedang memproses... Tunggu sebentar.";
            
            try {
                const result = await Tesseract.recognize(file, 'ind');
                output.value = result.data.text;
                status.innerText = "Proses Selesai!";
            } catch (err) {
                status.innerText = "Error: " + err.message;
            }
        });
    }
});
