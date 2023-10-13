const {
  saveDataPembayaran,
  findPendingTransakasi,
  getDataPembayaranDariTransaction,
  ambilPembayaranByUid,
  getDataPembayaran,
  ambilDaftarPembayaran,
  ambilDaftarPembayaranByStatus,
  hapusPembayaran,
  updateStatusPembayaran,
  updatePembayaran,
  uploadTransfer,
} = require("../controller/paymentController");
const {
  authorization,
  user_agen,
  isAdmin,
} = require("../middleware/Authorization");
const upload = require("../middleware/upload");

const router = require("express").Router();

// 1,2
// membuat data payment baru
router.post(
  "/saveDataPembayaran",
  authorization,
  user_agen,
  saveDataPembayaran
);

// 1,2
// menampilkan data berdasarkan req. params status dari pengguna
router.get(
  "/ambilDaftarPembayaranByStatus/:status",
  authorization,
  user_agen,
  ambilDaftarPembayaranByStatus
);

// 1,2
// menampilkan pembayaran berupa daftar pembayaran yang berisi status lunas
router.get(
  "/ambilDaftarPembayaran",
  authorization,
  user_agen,
  ambilDaftarPembayaran
);

// 1,2
// menampilkan data payment berdasarkan data nama perumahan dan status_pembayaran pending
router.get(
  "/findPendingTransakasi/:perumahan",
  authorization,
  user_agen,
  findPendingTransakasi
);

// 1,2
// menampilkan data pembayaran berdasarkan uid dan transaksi_id dari transaksi yang pernah dilakukan
router.get(
  "/getDataPembayaranDariTransaction/:uid",
  authorization,
  user_agen,
  getDataPembayaranDariTransaction
);

// 1,2
// menampilkan data pembayaran dari pengguna berdasarkan uid
router.get(
  "/ambilPembayaranByUid/:uid",
  authorization,
  user_agen,
  ambilPembayaranByUid
);

// 3
// menampilkan semua data pembayaran berdasarkan uid
router.get(
  "/getDataPembayaran/:uid",
  authorization,
  user_agen,
  getDataPembayaran
);

// 1,2
//menghapus tidak permanent dengan mengupdate deleted_at
router.delete(
  "/hapusPembayaran/:uid",
  authorization,
  user_agen,
  hapusPembayaran
);

// 3
// mengupdate status pembayaran yang dilakukan oleh admin dengan mengambil data berdasarkan uid dan id payment
router.patch(
  "/updateStatusPembayaran/:uid",
  authorization,
  isAdmin,
  updateStatusPembayaran
);

// 1,2
// merubah atau menambah data identitas dan pembayaran yang dapat dirubah namun harus pada kondisi status_pembayaran:'belum_lunas'
router.patch(
  "/updatePembayaran/:uid",
  authorization,
  user_agen,
  updatePembayaran
);

// 1,2
// upload foto bukti transfer dari user ke Admin
router.patch(
  "/uploadTransfer/:uid",
  upload.single("url"),
  authorization,
  user_agen,
  uploadTransfer
);

module.exports = router;
