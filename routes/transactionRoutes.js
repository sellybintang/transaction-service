const {
  ambilTransaksiByKavling,
  getDataTransaksi,
  ambilDaftarTransaksi,
  ambilDaftarTransaksiDeveloper,
  printLaporanTransaksi,
  findTransaksi,
  updateTransaksi,
  hapusTransaksi,
  batalkanTransaksi,
  ubahStatusTransaksi,
  ubahTransaksi,
  saveDataTransaksi,
  laporanTransaksi,
} = require("../controller/transactionController");
const {
  authorization,
  isAdmin,
  user_agen,
} = require("../middleware/Authorization");
const upload = require("../middleware/upload");

const router = require("express").Router();

// 1,2
// membuat data transaksi baru dengan upload foto
router.post(
  "/saveDataTransaksi",
  upload.fields([{ name: "ktp", maxCount: 1 }]),
  authorization,
  user_agen,
  saveDataTransaksi
);

// 1, 2
// menampilkan data berdasarkan value kavling atau key kavling di semua pengguna
// menggunakan method get dan req.data melalui query
router.get(
  "/ambilTransakasiByKavling",
  authorization,
  user_agen,
  ambilTransaksiByKavling
);

// 1,2
// menghapus secara tidak permanen dengan mengupdate deleted menjadi terisi atau tidak == null
router.patch("/hapusTransaksi", authorization, user_agen, hapusTransaksi);

// 1 dan 2
// update Transaksi berdasarkan id transaksi dngan mengupdate data transaksi yang berhubungan dengan data produk (bisa)
// berdasarkan id dari pemilik pengguna (uid)(masih blm bisa)
router.patch("/updateTransaksi", authorization, user_agen, updateTransaksi);

// 1 , 2
// membatalkan transaksi dengan update status batal berdasarkan uid dan transaksi_id dan menambahkan uid pada atribut updated by, lalu date pada updated_at
router.patch(
  "/batalkanTransaksi/:uid",
  authorization,
  user_agen,
  batalkanTransaksi
);

// 3
// mengubah status transaksi berdasarkan params uid dan id melalui body lalu status dirubah
router.patch(
  "/ubahStatusTransaksi/:uid",
  authorization,
  isAdmin,
  ubahStatusTransaksi
);

// 1 dan 2
// ubah transaksi berdasarkan params uid dan id transaksi. untuk data yang bisa berubah berupa  no_hp, alamat, desa, kecamatan, kota, provinsi
router.patch("/ubahTransaksi/:uid", authorization, user_agen, ubahTransaksi);

//  1 2
// menampilkan semua id transaksi status pending berdasarkan uid dari data yang dibuat
router.get("/getDataTransaksi/:uid", authorization, getDataTransaksi);

// 1,2
// menampilkan data berdasarkan created_by atau berdasarkan uid pengguna
router.get(
  "/ambilDaftarTransaksi",
  authorization,
  user_agen,
  ambilDaftarTransaksi
);

//1,2
// menampilkan daftar transaksi berdasarkan nama_developer
router.get(
  "/ambilDaftarTransaksiDeveloper/:nama_developer",
  authorization,
  user_agen,
  ambilDaftarTransaksiDeveloper
);

// 1,2
// menampilkan laporan transaksi berdasarkan transaksi id
router.get(
  "/printLaporanTransaksi/:transaksi_id",
  authorization,
  user_agen,
  printLaporanTransaksi
);

// 3
// menampilkan semua jenis data transaksi dan apabila menerima sebuah query akan menampilkan berdasarkan query
router.get("/laporanTransaksi", authorization, isAdmin, laporanTransaksi);

// 1,2
// menampilkan data berdasarkan status lunas, data yang belum terhapus dengan request berupa query yang tersedia
router.get("/findTransaksi", authorization, findTransaksi);

module.exports = router;
