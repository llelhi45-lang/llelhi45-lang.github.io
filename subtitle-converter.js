window.addEventListener('load', function() {
    const fileInput = document.getElementById('srt-input');
    const downloadBtn = document.getElementById('download-vtt');
    let vttContent = "";

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            const srtText = event.target.result;
            // Logika konversi SRT ke VTT
            vttContent = "WEBVTT\n\n" + srtText
                .replace(/,/g, '.') // Ganti koma milidetik menjadi titik
                .replace(/(\d{2}:\d{2}:\d{2}.\d{3}) --> (\d{2}:\d{2}:\d{2}.\d{3})/g, '$1 --> $2');
            
            downloadBtn.style.display = 'inline-block';
            document.getElementById('status-msg').innerText = "File siap diunduh!";
        };
        reader.readAsText(file);
    });

    downloadBtn.addEventListener('click', function() {
        const blob = new Blob([vttContent], { type: 'text/vtt' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "subtitle-converted.vtt";
        a.click();
    });
});


