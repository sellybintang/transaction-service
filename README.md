# Service Transaction Intern

## - `Models`
### * Model Transaction
```javascript
{
      uid: DataTypes.STRING,
      referral: DataTypes.STRING,
      cara_pembayaran: DataTypes.STRING,
      email: DataTypes.STRING,
      alamat: DataTypes.STRING,
      harga: DataTypes.STRING,
      desa: DataTypes.STRING,
      harga_kesepakatan: DataTypes.STRING,
      kavling: DataTypes.STRING,
      kecamatan: DataTypes.STRING,
      keterangan: DataTypes.STRING,
      kota: DataTypes.STRING,
      nama_developer: DataTypes.STRING,
      no_hp: DataTypes.STRING,
      no_spr: DataTypes.STRING,
      npwp: DataTypes.STRING,
      provinsi: DataTypes.STRING,
      tag: DataTypes.ARRAY(DataTypes.STRING),
      tipe: DataTypes.STRING,
      url_foto_ktp: DataTypes.TEXT,
      tanggal_transaksi: DataTypes.BIGINT, // epoch
      status: {
        type: DataTypes.ENUM(
          "pending",
          "belum_bayar",
          "progress",
          "realisasi",
          "lunas",
          "batal"
        ),
        defaultValue: "belum_bayar",
      },
      uang_muka: DataTypes.BIGINT,
      booking_fee: DataTypes.BIGINT,
      created_at: DataTypes.BIGINT,
      updated_at: DataTypes.BIGINT,
      deleted_at: DataTypes.BIGINT,
      created_by: DataTypes.JSON,
      updated_by: DataTypes.JSON,
}
```
### * Model Payment
```javascript
{
      uid: DataTypes.STRING,
      transaksi_id: DataTypes.STRING,
      nama_lengkap: DataTypes.STRING,
      url: DataTypes.TEXT,
      no_spr: DataTypes.STRING,
      perumahan: DataTypes.STRING,
      kavling: DataTypes.STRING,
      no_hp: DataTypes.STRING,
      jenis_pembayaran: DataTypes.STRING,
      nama_pembayaran: DataTypes.STRING,
      keterangan_pembayaran: DataTypes.STRING,
      jumlah_pembayaran: DataTypes.STRING,
      status_pembayaran: {
        type: DataTypes.ENUM(
          "lunas",
          "pending",
          "belum_lunas",
          "akan_jatuh_tempo",
          "terhutang",
          "dibatalkan",
          "diajukan",
          "ditolak",
          "diajukan_ulang",
          "diajukan_dihapus",
          "diajukan_lunas",
          "dihapus"
        ),
        defaultValue: "belum_lunas",
      },
      tanggal_pembayaran: DataTypes.BIGINT,
      created_at: DataTypes.BIGINT,
      updated_at: DataTypes.BIGINT,
      deleted_at: DataTypes.BIGINT,
      created_by: DataTypes.JSON,
      updated_by: DataTypes.JSON,
}
```

## - `Functions`
### * Function Transaction
```javascript
router.get("/getDataTransaksi/:uid");
router.get("/ambilDaftarTransaksi");
router.get(
  "/ambilDaftarTransaksiDeveloper/:nama_developer",
);
router.get("/findTransaksi");
router.get(
  "/printLaporanTransaksi/:transaksi_id",
);
router.post("/ambilTransakasiByKavling",);
router.post(
  "/saveDataTransaksi",
  addTransaksi.fields([
    { name: "pembayaran", maxCount: 1 },
    { name: "ktp", maxCount: 1 },
  ]),
);
router.post("/laporanTransaksi",);

router.patch(
  "/updateTransaksi",
);
router.patch("/batalkanTransaksi/:uid", );

router.patch(
  "/hapusTransaksi",
);
router.patch("/ubahStatusTransaksi/:uid");
router.patch("/ubahTransaksi/:uid");
```
### * Function Payment
```javascript
router.get("/ambilDaftarPembayaran");
router.get("/getDataPembayaran/:uid");
router.get("/ambilPembayaranByUid/:uid");
router.get(
  "/getDataPembayaranDariTransaction/:uid"
);
router.get("/findPendingTransaksi/:perumahan");
router.post(
  "/ambilDaftarPembayaranByStatus/:status"
);
router.post("/saveDataPembayaran");
router.post("/uploadTransfer/:uid");
router.patch("/updateStatusPembayaran/:uid");
router.patch("/updatePembayaran/:uid");
router.delete("/hapusPembayaran/:uid");
```
