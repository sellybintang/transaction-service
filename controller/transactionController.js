const { Transaction } = require("../models");

// membuat data transaksi baru dengan upload foto
const saveDataTransaksi = async (req, res) => {
  try {
    console.log(req.files["ktp"]);
    const ktp = req.files["ktp"];

    const ktpPath = ktp[0].path;
    const { uid, email } = req.user;
    const {
      user_uid,
      refferal,
      cara_pembayaran,
      alamat,
      harga,
      desa,
      harga_kesepakatan,
      kavling,
      kecamatan,
      keterangan,
      kota,
      nama_developer,
      no_hp,
      no_spr,
      npwp,
      provinsi,
      tag,
      tipe,
      status,
      uang_muka,
    } = req.body;

    const booking_fee = parseInt(harga, 10) * 0.1;

    const allData = await Transaction.findAll({ where: { uid: user_uid } });
    // blm nbisa
    if (!allData) {
      return res.status(400).json({
        status: "404",
        message: "data uid tidak tersedia",
      });
    }
    const saveDataTransaksi = await Transaction.create({
      uid: user_uid,
      refferal: refferal,
      cara_pembayaran: cara_pembayaran,
      email: email,
      alamat: alamat,
      harga: harga,
      desa: desa,
      harga_kesepakatan: harga_kesepakatan,
      kavling: kavling,
      kecamatan: kecamatan,
      keterangan: keterangan,
      kota: kota,
      nama_developer: nama_developer,
      no_hp: no_hp,
      no_spr: no_spr,
      npwp: npwp,
      provinsi: provinsi,
      tag: tag,
      tipe: tipe,
      url_foto_ktp: ktpPath,
      tanggal_transaksi: Date.now(),
      status: status,
      uang_muka: uang_muka,
      booking_fee: booking_fee,
      created_at: Date.now(),
      created_by: { uid: uid },
    });

    res.status(200).json({
      status: "200",
      message: "Successfully created transaction by kavling",
      saveDataTransaksi,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// menampilkan data berdasarkan value kavling atau key kavling di semua pengguna 1 dan 2
// menggunakan method get dan req.data melalui query
const ambilTransaksiByKavling = async (req, res) => {
  try {
    const { uid } = req.user;
    const { kavling } = req.query;
    const dataKavling = await Transaction.findAll({
      where: { kavling: kavling, created_by: { uid: uid }, deleted_at: null },
      returning: true,
    });

    if (!dataKavling) {
      return res.status(400).json({
        status: "404",
        message: "data kavling tidak ditemukan",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Successfully created transaction by kavling",
      dataKavling,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// update Transaksi berdasarkan id transaksi dngan mengupdate data transaksi yang berhubungan dengan data produk (bisa)

const updateTransaksi = async (req, res) => {
  try {
    const { uid } = req.user;
    const {
      id,
      harga_kesepakatan,
      kavling,
      nama_developer,
      uang_muka,
      tipe,
      cara_pembayaran,
      keterangan,
    } = req.body;

    const updateTransaksi = await Transaction.update(
      {
        uang_muka: uang_muka,
        harga_kesepakatan: harga_kesepakatan,
        kavling: kavling,
        nama_developer: nama_developer,
        tipe: tipe,
        cara_pembayaran: cara_pembayaran,
        keterangan: keterangan,
        updated_by: { uid: uid },
        updated_at: Date.now(),
      },
      {
        where: {
          id: id,
          tag: null,
          created_by: { uid: uid },
          deleted_at: null,
          status: "belum_bayar",
        },
        returning: true,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(updateTransaksi);

    res.status(200).json({
      status: "200",
      message: "sukses update transaksi",
      updateTransaksi: updateTransaksi,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// 1 dan 2
// membatalkan transaksi dengan update status berdasarkan uid dan transaksi_id
const batalkanTransaksi = async (req, res) => {
  try {
    const { uid } = req.user;
    const user_uid = req.params.uid;
    const id = req.body.id;

    if (user_uid !== uid) {
      return res.status(400).json({
        status: "400",
        message: "uid tidak ditemukan",
      });
    }

    const batalkanTransaksi = await Transaction.update(
      {
        status: "batal",
        updated_by: { uid: uid },
        updated_at: Date.now(),
      },
      {
        where: { created_by: { uid: uid }, id: id, deleted_at: null },
        returning: true,
      }
    );

    if (batalkanTransaksi == 0) {
      return res.status(400).json({
        status: "400",
        message: "id tidak ditemukan",
      });
    }
    res.status(200).json({
      status: "200",
      message: "sukses update transaksi",
      batalkanTransaksi,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// 1,2 (menambahkan atribut boolean)
// hapus transaksi status berdasarkan uid menggunakan body
const hapusTransaksi = async (req, res) => {
  try {
    const { uid } = req.user;
    const id = req.body.id;

    const hapusTransaksi = await Transaction.update(
      {
        updated_at: Date.now(),
        updated_by: uid,
        deleted_at: Date.now(),
      },
      {
        where: {
          id: id,
          uid: uid,
          deleted_at: null,
          status: "belum_bayar",
        },
        returning: true,
      }
    );
    console.log(hapusTransaksi);
    if (!hapusTransaksi || hapusTransaksi == 0) {
      return res.status(400).json({
        status: "400",
        message: "id tidak ditemukan",
      });
    }
    res.status(200).json({
      status: "200",
      message: "sukses hapus transaksi",
      hapusTransaksi,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// mengubah status transaksi berdasarkan params uid dan id melalui body lalu status dirubah
// admin
const ubahStatusTransaksi = async (req, res) => {
  try {
    const { uid } = req.user;
    const user_uid = req.params.uid;
    const { status, id } = req.body;

    // if (user_uid !== uid) {
    //   return res.status(400).json({
    //     status: "400",
    //     message: "uid tidak ditemukan",
    //   });
    // }

    const ubahStatusTransaksi = await Transaction.update(
      { status: status, updated_by: { uid: uid }, updated_at: Date.now() },
      {
        where: { id: id, deleted_at: null },
        returning: true,
      }
    );

    if (ubahStatusTransaksi == 0) {
      return res.status(400).json({
        status: "400",
        message: "uid tidak ditemukan",
      });
    }

    res.status(200).json({
      status: "200",
      message: "sukses update transaksi",
      ubahStatusTransaksi,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// bisa
// ubah transaksi berdasarkan params uid dan id transaksi. untuk data yang bisa berubah berupa  no_hp, alamat, desa, kecamatan, kota, provinsi
const ubahTransaksi = async (req, res) => {
  try {
    const { uid } = req.user;
    const user_uid = req.params.uid;
    const { id, no_hp, alamat, desa, kecamatan, kota, provinsi } = req.body;

    if (user_uid !== uid) {
      return res.status(400).json({
        status: "400",
        message: "uid tidak ditemukan",
      });
    }

    const ubahTransaksi = await Transaction.update(
      {
        no_hp: no_hp,
        alamat: alamat,
        desa: desa,
        kecamatan: kecamatan,
        kota: kota,
        provinsi: provinsi,
        updated_by: { uid: uid },
        updated_at: Date.now(),
      },
      {
        where: {
          created_by: { uid: user_uid },
          id: id,
          deleted_at: null,
          status: "belum_bayar",
        },
        returning: true,
      }
    );

    res.status(200).json({
      status: "200",
      message: "sukses update transaksi",
      ubahTransaksi,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// 3
// menampilkan semua id transaksi berdasarkan uid atau pengguna user
const getDataTransaksi = async (req, res) => {
  try {
    const { uid } = req.user;

    const user_uid = req.params.uid;

    const allData = await Transaction.findAll({
      where: { uid: user_uid, status: "pending" },
    });
    console.log(allData);

    if (!allData || allData == 0) {
      return res.status(400).json({
        status: "404",
        message: "data uid tidak tersedia",
      });
    }
    const getDataTransaksi = await Transaction.findAll({
      where: { created_by: { uid: user_uid }, deleted_at: null },
      returning: true,
    });

    res.status(200).json({
      status: "200",
      message: "Succesfully show uid transactions ",
      getDataTransaksi,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// 1,2
// menampilkan semua daftar transaksi yang ada berdasarkan data uid yang bersifat pemasuk data
const ambilDaftarTransaksi = async (req, res) => {
  try {
    const { uid } = req.user;
    const user_uid = req.query.uid;
    const ambilDaftarTransaksi = await Transaction.findAll({
      where: { created_by: { uid: uid }, uid: user_uid, deleted_at: null },
      returning: true,
    });
    res.status(200).json({
      status: "200",
      message: "Succesfully show all transactions",
      ambilDaftarTransaksi,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// 1,2 (menunggu boolean untuk validasi)
// menampilkan daftar transaksi berdasarkan nama_developer
const ambilDaftarTransaksiDeveloper = async (req, res) => {
  try {
    const { uid } = req.user;
    const nama_developer = req.params.nama_developer;

    if (!nama_developer) {
      return res.status(400).json({
        status: "400",
        message: "nama_developer tidak tersedia",
      });
    }

    const ambilDaftarTransaksiDeveloper = await Transaction.findAll({
      where: {
        nama_developer: nama_developer,
        created_by: { uid: uid },
        deleted_at: null,
      },
      returning: true,
    });

    if (!ambilDaftarTransaksi || ambilDaftarTransaksi == []) {
      return res.status(400).json({
        status: "400",
        message: "nama_developer tidak tersedia",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Succesfully show nama_developer transactions",
      ambilDaftarTransaksiDeveloper,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// 1,2
//menampilkan laporan transaksi berdasarkan transaksi id
const printLaporanTransaksi = async (req, res) => {
  try {
    const transaksi_id = req.params.transaksi_id;
    const printLaporanTransaksi = await Transaction.findByPk(transaksi_id, {
      where: { deleted_at: null },
      returning: true,
    });

    // const printLaporanTransaksi = await Transaction.findByPk({
    //   where: { id: transaksi_id },
    // });
    res.status(200).json({
      status: "200",
      message: "Berhasil menunjukkan transaksi_id",
      printLaporanTransaksi,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// 1,2
// 1,2(blm)
// menampilkan data berdasarkan status lunas, data yang belum terhapus dengan request berupa query yang tersedia
const findTransaksi = async (req, res) => {
  try {
    const { uid } = req.user;
    const status = req.query.status;
    let data = await Transaction.findAll({
      where: { created_by: { uid: uid }, deleted_at: null },
    });
    let allData = {};

    const dataLaporan = data.map((Transaction) => Transaction.status);

    if (status) {
      allData.status = dataLaporan.filter((s) => s === status);
    }

    const laporan = await Transaction.findAll({ where: status ? allData : {} });
    if (laporan == 0 || laporan == []) {
      return res.status(400).json({
        status: "400",
        message: "laporan transaksi tidak tersedia",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Berhasil menunjukkan laporan transaksi",
      laporan,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// 3
// menampilkan semua jenis data transaksi dan apabila menerima sebuah query akan menampilkan berdasarkan query
const laporanTransaksi = async (req, res) => {
  try {
    const { uid } = req.user;
    const status = req.query.status;
    const data = await Transaction.findAll();

    let allData = {};

    const dataLaporan = data.map((Transaction) => Transaction.status);

    if (status) {
      allData.status = dataLaporan.filter((s) => s === status);
    }

    const laporan = await Transaction.findAll({ where: status ? allData : {} });
    if (laporan == 0 || laporan == []) {
      return res.status(400).json({
        status: "400",
        message: "laporan transaksi tidak tersedia",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Berhasil menunjukkan laporan transaksi",
      laporan,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

module.exports = {
  // buat dan tambah
  saveDataTransaksi,
  ambilTransaksiByKavling,
  updateTransaksi,
  hapusTransaksi,
  ubahStatusTransaksi,
  ubahTransaksi,
  batalkanTransaksi,

  // tampilan
  getDataTransaksi,
  ambilDaftarTransaksi,
  ambilDaftarTransaksiDeveloper,
  printLaporanTransaksi,
  findTransaksi,
  laporanTransaksi,
};
