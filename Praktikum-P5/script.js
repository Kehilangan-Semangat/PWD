let produkList = [
    { id: 1, nama: "Laptop ASUS TUF", harga: 15000000, stok: 5 },
    { id: 2, nama: "Mouse Logitech", harga: 300000, stok: 12 },
    { id: 3, nama: "Keyboard Mechanical", harga: 750000, stok: 8 },
    { id: 4, nama: "Monitor LG 24 Inch", harga: 2000000, stok: 3 },
    { id: 5, nama: "RAM DDR 5 Corsair 16GB", harga: 9000000, stok: 4, canda: "Sam Altman Sedang Memantau" },
    { id: 6, nama: "SSD Samsung 1TB", harga: 2500000, stok: 7 }
];

let keranjang = [];
let totalHarga = 0;
const wadahProduk = document.getElementById("daftar-produk");

produkList.forEach(produk => 
{
    let card = document.createElement("div");
    card.className = "produk-card";
    card.setAttribute("data-nama", produk.nama.toLowerCase());
    
    let judul = document.createElement("h3");
    let teksJudul = document.createTextNode(produk.nama);
    judul.appendChild(teksJudul);

    let harga = document.createElement("p");
    let teksHarga = document.createTextNode("Harga: Rp " + produk.harga.toLocaleString("id-ID"));
    harga.appendChild(teksHarga);

    let stok = document.createElement("p");
    let teksStok = document.createTextNode("Stok: " + produk.stok);
    stok.setAttribute("id", "stok-" + produk.id);
    stok.appendChild(teksStok);

    let teksCanda = document.createElement("p");
    teksCanda.style.fontSize = "0.85rem";
    teksCanda.style.color = "#e74c3c";

    let isiCanda = document.createTextNode(produk.canda ? produk.canda : ""); 
    teksCanda.appendChild(isiCanda);

    let tombol = document.createElement("button");
    tombol.className = "btn-tambah";
    tombol.setAttribute("data-id", produk.id);
    let teksTombol = document.createTextNode("Tambah ke Keranjang");
    tombol.appendChild(teksTombol);

    card.appendChild(judul);
    card.appendChild(harga);
    card.appendChild(stok);
    card.appendChild(teksCanda);
    card.appendChild(tombol);


    wadahProduk.appendChild(card);
});

$(document).ready(function() 
{
    $("#btn-toggle-keranjang").click(function() 
    {
        $("#panel-keranjang").fadeToggle("fast");
    });

    $("#input-cari").on("keyup", function() 
    {
        let kataKunci = $(this).val().toLowerCase();
        
        $(".produk-card").each(function() 
        {
            let namaBarang = $(this).attr("data-nama");
            $(this).toggle(namaBarang.indexOf(kataKunci) > -1);
        });
    });

    $(document).on("click", ".btn-tambah", function() 
    {
        let idProduk = $(this).data("id");
        let produk = produkList.find(p => p.id === idProduk);

        if (produk.stok <= 0) 
        {
            alert("Maaf, stok produk " + produk.nama + " sudah habis!");
            return;
        }

        produk.stok -= 1;
        $("#stok-" + idProduk).text("Stok: " + produk.stok);

        let itemHtml = `
            <li class="item-keranjang" data-harga="${produk.harga}">
                <span>${produk.nama} - Rp ${produk.harga.toLocaleString("id-ID")}</span>
                <button class="btn-hapus" data-id="${produk.id}">X</button>
            </li>
        `;
        
        let elemenBaru = $(itemHtml);
        $("#list-item-keranjang").append(elemenBaru);
        elemenBaru.fadeIn("slow");

        totalHarga += produk.harga;
        updateTotal();
    });

    $(document).on("click", ".btn-hapus", function() 
    {
        let konfirmasi = confirm("Yakin ingin menghapus item ini dari keranjang?");
        if (konfirmasi) 
        {
            let itemElement = $(this).parent();
            let hargaItem = parseInt(itemElement.data("harga"));
            let idProduk = $(this).data("id");

            let produk = produkList.find(p => p.id === idProduk);
            produk.stok += 1;
            $("#stok-" + idProduk).text("Stok: " + produk.stok);

            totalHarga -= hargaItem;
            updateTotal();

            itemElement.fadeOut("fast", function() 
            {
                $(this).remove();
            });
        }
    });

    $("#btn-kosongkan").click(function() 
    {
        let konfirmasi = confirm("Yakin ingin mengosongkan semua isi keranjang?");
        if (konfirmasi) 
        {
            $(".btn-hapus").each(function() 
            {
                let idProduk = $(this).data("id");
                let produk = produkList.find(p => p.id === idProduk);
                produk.stok += 1;
                $("#stok-" + idProduk).text("Stok: " + produk.stok);
            });

            $("#list-item-keranjang").empty();
            totalHarga = 0;
            updateTotal();
        }
    });

    $("#btn-checkout").click(function() 
    {
        if (totalHarga === 0) 
        {
            alert("Keranjang Anda masih kosong!");
            return;
        }

        let namaCustomer = prompt("Masukkan nama Anda untuk melanjutkan checkout:");
        
        if (namaCustomer != null && namaCustomer.trim() !== "") 
        {
            $("#header-utama, #halaman-utama").hide();
            
            $("#nama-pembeli").text(namaCustomer);
            $("#total-checkout").text("Rp " + totalHarga.toLocaleString("id-ID"));
            
            $("#ringkasan-checkout").fadeIn("slow");
        } 
        else 
        {
            alert("Checkout dibatalkan. Nama harus diisi.");
        }
    });

    function updateTotal() 
    {
        $("#total-harga").text("Rp " + totalHarga.toLocaleString("id-ID"));
        let jumlahItem = $("#list-item-keranjang li").length;
        $("#jml-item").text(jumlahItem);
    }
});