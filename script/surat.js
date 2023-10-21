function getUrl(e) {
    const pageUrl = window.location.search.substring(1);
    const urlVariable = pageUrl.split('&');

    for (let i = 0; i < urlVariable.length; i++) {
        const parameterName = urlVariable[i].split('=');

        if (parameterName[0] == e) {
            return parameterName[1];
        }
    }
}

const nomorSurat = getUrl('nomorSurat');

async function getSurat() {
    const getApi = await fetch(`https://quran-api.santrikoding.com/api/surah/${nomorSurat}`);
    const data = await getApi.json()

    document.querySelector('#title').textContent = `${data.nama_latin}`;

    const cardSurat = `
    <div class="card-body">
        <strong>${data.nama_latin} - ${data.nama}</strong>
        <p>jumlah ayat : ${data.jumlah_ayat} (${data.arti})</p>
        <button class="btn btn-primary px-3 btn-play"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
      </svg> play</button>
        <button class="btn btn-primary px-3 btn-pause"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
      </svg> pause</button>
      <audio src="${data.audio}"></audio>
    </div>
    `;

    document.querySelector('.info-surat').innerHTML = cardSurat;

    const detailSurat = data.ayat;

    let dtlSurat = '';

    detailSurat.forEach(s => {
        dtlSurat += `
        <div class="card cards shadow-sm mb-4">
            <div class="card-body">
                <h5 class="card-title mb-3">${s.nomor}.</h5>
                <h3 class="card-subtitle mb-3 text-end fw-bold">${s.ar}</h3>
                <p class="card-text">${s.tr}</p>
                <p class="card-text">${s.idn}</p>
            </div>
        </div>
        `;
    });

    document.querySelector('.detail-surat').innerHTML = dtlSurat;

    const btnPlay = document.querySelector('.btn-play');
    const btnPause = document.querySelector('.btn-pause');
    const audio = document.querySelector('audio');

    btnPlay.addEventListener('click', () => {
        btnPlay.style.display = 'none';
        btnPause.style.display = 'block';
        audio.play()
    });

    btnPause.addEventListener('click', () => {
        btnPlay.style.display = 'block';
        btnPause.style.display = 'none';
        audio.pause()
    });

    const tahun = new Date()
    document.querySelector('#tahun').innerHTML = tahun.getFullYear();
}

getSurat()