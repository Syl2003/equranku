async function getDzikir() {
    const urlApi = await fetch('https://api.dikiotang.com/dzikir/pagi');
    const { data } = await urlApi.json();

    let dzikir = '';
    data.forEach( e => {
        dzikir += `
        <div class="card cards mb-4 shadow-sm">
            <div class="card-body">
                <p class="card-subtitle mb-3">${e.type}</p>
                <h2 class="text-end fw-bold mb-3">${e.arab}</h2>
                <h4 class="card-title">${e.indo}</h4>
                <p class="card-text">${e.ulang}</p>
            </div>
        </div>
        `;
    });

    document.querySelector('.dzikir').innerHTML = dzikir; 

    const tahun = new Date()
    document.querySelector('#tahun').innerHTML = tahun.getFullYear();
}

getDzikir()