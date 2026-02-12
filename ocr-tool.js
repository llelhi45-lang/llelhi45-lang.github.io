// Tunggu sampai DOM siap
document.addEventListener('DOMContentLoaded', async () => {
    const fileInput = document.getElementById('file-input');
    const output = document.getElementById('output');
    const status = document.getElementById('status');

    // Inisialisasi Tesseract Worker secara Global agar cepat
    const worker = await Tesseract.createWorker('ind');

    fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        status.innerText = "Memproses teks... Mohon tunggu.";
        output.innerText = "";

        try {
            const { data: { text } } = await worker.recognize(file);
            output.innerText = text;
            status.innerText = "Selesai!";
        } catch (err) {
            status.innerText = "Terjadi kesalahan saat memproses gambar.";
            console.error(err);
        }
    });
});


