// tanggal

const dataWaktu = new Date()
const tahun = dataWaktu.getFullYear();
const bulan = dataWaktu.getMonth() + 1;
const hari = dataWaktu.getDate();

function moon() {
    if (bulan < 10) {
        moon = `0${bulan}`;
    } else {
        moon = bulan
    }
    return moon
}

function day() {
    if (hari < 10) {
        day = `0${hari}`;
    } else {
        day = hari
    }
    return day
}

const tanggal = `${tahun}-${moon()}-${day()}`;

const tampilKota = document.querySelector('.judul-kota').textContent = localStorage.judulKota;

async function getJadwal() {
    const urlApi = await fetch('https://api.banghasan.com/sholat/format/json/jadwal/kota/' + parseInt(localStorage.idkota) + '/tanggal/' + tanggal);
    const response = await urlApi.json();

    const data = response.jadwal.data;

    document.querySelector('.subuh').textContent = data.subuh;
    document.querySelector('.terbit').textContent = data.terbit;
    document.querySelector('.dzuhur').textContent = data.dzuhur;
    document.querySelector('.ashar').textContent = data.ashar;
    document.querySelector('.maghrib').textContent = data.maghrib;
    document.querySelector('.isya').textContent = data.isya;
    document.querySelector('.tanggal').textContent = data.tanggal;
}

// lokasi 
const inputSearch = document.querySelector('.input-search');
const cardList = document.querySelector('.card-list');

inputSearch.addEventListener('keyup', () => {
    const valueSearch = inputSearch.value.length;

    if (valueSearch > 0) {
        cardList.classList.remove('card-list');

        fetch('https://api.banghasan.com/sholat/format/json/kota')
            .then(response => response.json())
            .then(response => {
                const kota = response.kota;

                let listKota = '';
                kota.forEach(ko => {
                    listKota += `
                     <a href="#" data-idkota="${ko.id}" id="nama-kota" class="list-group-item list-group-item-action">${ko.nama}</a>
                `;
                });
                const namaKota = document.querySelector('.list-card');
                namaKota.innerHTML = listKota;

                //kota click

                const isiKota = document.querySelectorAll('#nama-kota');

                isiKota.forEach(kota => {

                    const filterText = inputSearch.value.toLowerCase();
                    const itemText = kota.firstChild.textContent.toLowerCase();

                    if (itemText.indexOf(filterText) != -1) {
                        kota.setAttribute("style", "display: block");
                    } else {
                        kota.setAttribute("style", "display: none !important");
                    }

                    kota.addEventListener('click', function () {
                        const idkota = this.dataset.idkota;
                        const judulKota = this.textContent;
                        window.localStorage.setItem('idkota', idkota);
                        window.localStorage.setItem('judulKota', judulKota);
                        namaKota.classList.add('card-list')
                        inputSearch.value = '';
                        location.reload()
                        alert(` Kota ${judulKota} berhasil dipilih`)
                    });
                });
            });


    } else {
        cardList.classList.add('card-list');
    }
});

getJadwal()