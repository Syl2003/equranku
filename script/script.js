async function judulSurat() {
    const urlApi = await fetch('https://quran-api.santrikoding.com/api/surah')
    const data = await urlApi.json()

    let judul = '';
    data.forEach(e => {
        judul += `
        <div class="col-sm-12 col-lg-3 mb-4 px-4">
            <div class="card pilih-surat" onclick="location.href='surat.html?nomorSurat=${e.nomor}' ">
            <div class="card-body shadow-sm">
            <h2 class="card-title fw-bold">${e.nomor}. ${e.nama_latin}</h2>
            <h3 class="card-subtitle mb-2 text-end fw-bold">${e.nama}</h3>
            <p class="card-text text-end">${e.arti}</p>
            </div>
            </div>
        </div>  

        `
    })

    document.querySelector('.get-judul-surat').innerHTML = judul;

    const tahun = new Date()
    document.querySelector('#tahun').innerHTML = tahun.getFullYear();
}

judulSurat()