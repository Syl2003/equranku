async function getDoa() {
    const urlApi = await fetch('https://islamic-api-zhirrr.vercel.app/api/doaharian');
    const { data } = await urlApi.json();

    let doa = '';

    data.forEach( e => {
        doa += `
        <div class="card cards mb-4 shadow-sm">
            <div class="card-body">
                <h4 class=" mb-4">${e.title}</h4>
                <h3 class="card-subtitle mb-4 text-end fw-bold">${e.arabic}</h3>
                <p class="card-text">${e.latin}</p>
                <p class="card-text">${e.translation}</p>
            </div>
        </div>
        `;console.log(data)

        document.querySelector('.doa-doa').innerHTML = doa;

        const tahun = new Date();
        document.querySelector('#tahun').innerHTML = tahun.getFullYear();
    });
}

getDoa()