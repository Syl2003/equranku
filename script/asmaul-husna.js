async function getSamaul() {
    const getApi = await fetch('https://asmaul-husna-api.vercel.app/api/all');
    const { data } = await getApi.json();

    let asm = '';
    data.forEach(as => {
        asm += `
        <div class="card cards mb-4 shadow-sm">
            <div class="card-body">
                <p class="card-text fw-bold">${as.urutan}.</p>
                <h2 class="text-center fw-bold">${as.arab}</h2>
                <h3 class="text-center fw-bold">${as.latin}</h4>
            </div>
        </div>
        `;
    })

    document.querySelector('.asmaul-husna').innerHTML = asm;

    const tahun = new Date()
    document.querySelector('#tahun').innerHTML = tahun.getFullYear();
}

getSamaul()