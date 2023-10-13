const { Payment, Transaction } = require("../models");

// bisa
// membuat data payment baru
const saveDataPembayaran = async (req, res) => {
  try {
    const { uid } = req.user;
    const {
      user_uid,
      transaksi_id,
      nama_lengkap,
      no_spr,
      perumahan,
      kavling,
      no_hp,
      jenis_pembayaran,
      nama_pembayaran,
      keterangan_pembayaran,
      jumlah_pembayaran,
      status_pembayaran,
      tanggal_pembayaran,
    } = req.body;

    const transaksi = await Transaction.findByPk(transaksi_id);
    if (!transaksi || transaksi == 0) {
      return res.status(400).json({
        status: "404",
        message: "data Transaction_id tidak tersedia",
      });
    }
    const allData = await Payment.findAll({
      where: { uid: user_uid },
    });

    console.log(allData);

    if (!allData || allData == 0) {
      return res.status(400).json({
        status: "404",
        message: "data uid tidak tersedia",
      });
    }

    const saveDataPembayaran = await Payment.create({
      uid: user_uid,
      transaksi_id: transaksi,
      nama_lengkap: nama_lengkap,
      no_spr: no_spr,
      perumahan: perumahan,
      kavling: kavling,
      no_hp: no_hp,
      jenis_pembayaran: jenis_pembayaran,
      nama_pembayaran: nama_pembayaran,
      keterangan_pembayaran: keterangan_pembayaran,
      jumlah_pembayaran: jumlah_pembayaran,
      status_pembayaran: status_pembayaran,
      tanggal_pembayaran: tanggal_pembayaran,
      created_at: Date.now(),
      created_by: { uid: uid },
    });

    res.status(200).json({
      status: "200",
      message: "Successfully created payment transaction",
      saveDataPembayaran,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// 1,2
// menampilkan data berdasarkan req. params status dari pengguna
const ambilDaftarPembayaranByStatus = async (req, res) => {
  try {
    const { uid } = req.user;
    const { status } = req.params;
    const ambilDaftarPembayaranByStatus = await Payment.findAll({
      where: {
        status_pembayaran: status,
        created_by: { uid: uid },
        deleted_at: null,
      },
      returning: true,
    });

    if (!ambilDaftarPembayaranByStatus || ambilDaftarPembayaranByStatus == 0) {
      return res.status(400).json({
        status: "400",
        message: "daftar pembayaran tidak tersedia",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Successfully update status payment",
      ambilDaftarPembayaranByStatus,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

const uploadTransfer = async (req, res) => {
  try {
    const { uid } = req.user;
    const url = req.file.path;
    const user_uid = req.params.uid;
    const id = req.query.id;
    const uploadTransfer = await Payment.update(
      {
        url: url,
        updated_at: Date.now(),
        updated_by: { uid: uid },
        tanggal_pembayaran: Date.now(),
      },
      {
        where: {
          id: id,
          created_by: { uid: user_uid },
          deleted_at: null,
        },
        returning: true,
      }
    );

    res.status(200).json({
      status: "200",
      message: "Sukses upload bukti transfer",
      uploadTransfer,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// 3
// mengupdate status pembayaran yang dilakukan oleh admin dengan mengambil data berdasarkan uid dan id payment
const updateStatusPembayaran = async (req, res) => {
  try {
    const { uid } = req.user;
    const user_id = req.params.uid;
    const { status_pembayaran, deleted_at } = req.body;
    const id = req.query.id;

    const updateStatusPembayaran = await Payment.update(
      {
        status_pembayaran: status_pembayaran,
        updated_by: { uid: uid },
        updated_at: Date.now(),
        deleted_at: deleted_at,
      },
      {
        where: { id: id, deleted_at: null, created_by: { uid: user_id } },
        returning: true,
      }
    );
    console.log(updateStatusPembayaran);
    if (updateStatusPembayaran == 0) {
      return res.status(400).json({
        status: "400",
        message: "User does not exist",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Sukses update data status pada payment",
      updateStatusPembayaran,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// 1,2
// merubah atau menambah data identitas dan pembayaran yang dapat dirubah namun harus pada kondisi status_pembayaran:'belum_lunas'
const updatePembayaran = async (req, res) => {
  try {
    const { uid } = req.user;
    const user = req.params.uid;
    const id = req.query.id;
    const {
      nama_lengkap,
      kavling,
      perumahan,
      jumlah_pembayaran,
      no_hp,
      jenis_pembayaran,
      nama_pembayaran,
      keterangan_pembayaran,
    } = req.body;

    const id_payment = await Payment.findAll({
      where: { created_by: { uid: user }, id: id, deleted_at: null },
    });

    if (id_payment == 0) {
      return res.status(400).json({
        status: "400",
        message: "id_payment tidak tersedia",
      });
    }
    const updatePembayaran = await Payment.update(
      {
        nama_lengkap: nama_lengkap,
        kavling: kavling,
        no_hp: no_hp,
        jenis_pembayaran: jenis_pembayaran,
        nama_pembayaran: nama_pembayaran,
        keterangan_pembayaran: keterangan_pembayaran,
        perumahan: perumahan,
        jumlah_pembayaran: jumlah_pembayaran,
        updated_at: Date.now(),
        updated_by: { uid: uid },
      },
      {
        where: {
          created_by: { uid: user },
          deleted_at: null,
          id: id,
          status_pembayaran: "belum_lunas",
        },
        returning: true,
      }
    );

    if (updatePembayaran == 0) {
      return res.status(400).json({
        status: "400",
        message: "id_payment tidak bisa dirubah",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Sukses update data status pada payment",
      updatePembayaran,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// 1,2
// menampilkan pembayaran berupa daftar pembayaran yang berisi status lunas
const ambilDaftarPembayaran = async (req, res) => {
  try {
    const { uid } = req.user;

    const ambilDaftarPembayaran = await Payment.findAll();

    if (!ambilDaftarPembayaran || ambilDaftarPembayaran == 0) {
      return res.status(400).json({
        status: "400",
        message: "data pembayaran dengan status lunas belum tersedia",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Sukses menampilkan semua daftar pembayaran",
      ambilDaftarPembayaran,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// menghapus secara tidak permanen dengan mengupdate deleted menjadi terisi atau tidak == null
const hapusPembayaran = async (req, res) => {
  try {
    const { uid } = req.user;
    const user = req.params.uid;
    const id = req.query.id;
    if (user !== uid) {
      return res.status(400).json({
        status: "400",
        message: "uid tidak ditemukan",
      });
    }

    const hapusPembayaran = await Payment.update(
      { deleted_at: Date.now(), status_pembayaran: "diajukan_dihapus" },
      {
        where: { created_by: { uid: user }, id: id, deleted_at: null },
        returning: true,
      }
    );
    console.log(hapusPembayaran);
    if (hapusPembayaran == 0 || !hapusPembayaran) {
      return res.status(400).json({
        status: "400",
        message: "id tidak ditemukan atau telah dihapus",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Sukses hapus daftar pembayaran",
      hapusPembayaran,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// 1,2
// menampilkan semua data pembayaran berdasarkan uid
const getDataPembayaran = async (req, res) => {
  try {
    const { uid } = req.user;
    const user_uid = req.params.user_id;

    if (user_uid !== created_by.uid) {
      return res.status(400).json({
        status: "400",
        message: "User does not exist",
      });
    }
    const data = await Payment.findAll(
      {
        created_by: { uid: user_uid },
      },
      { returning: true }
    );
    res.status(200).json({
      status: "200",
      message: "Sukses menampilkan semua data pembayaran pengguna",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// 1,2
// menampilkan data pembayaran dari pengguna berdasarkan uid
const ambilPembayaranByUid = async (req, res) => {
  try {
    const { uid } = req.user;
    const user_uid = req.params.uid;
    if (user_uid !== created_by.uid) {
      return res.status(400).json({
        status: "400",
        message: "User does not exist",
      });
    }

    const ambilPembayaranByUid = await Payment.findAll({
      created_by: { uid: user_uid },
      deleted_at: null,
    });

    if (!ambilPembayaranByUid || ambilPembayaranByUid == 0) {
      return res.status(400).json({
        status: "400",
        message: "User does not exist",
      });
    }
    // console.log(ambilPembayaranByUid);
    // console.log(uid);

    res.status(200).json({
      status: "200",
      message: "Sukses menampilkan semua data pembayaran pengguna",
      ambilPembayaranByUid,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// bisa
// menampilkan data pembayaran berdasarkan uid dari transaksi yang pernah dilakukan
const getDataPembayaranDariTransaction = async (req, res) => {
  try {
    const { uid } = req.user;
    const user_uid = req.params.uid;
    const transaksi_id = req.query;
    const getDataPembayaranDariTransaksi = await Payment.findAll({
      created_by: { uid: user_uid },
      transaksi_id: transaksi_id,
      deleted_at: null,
    });
    // console.log(getDataPembayaranDariTransaksi);
    console.log(user_uid);
    if (user_uid !== uid) {
      return res.status(400).json({
        status: "400",
        message: "User tidak tersedia",
      });
    }
    if (getDataPembayaranDariTransaksi) {
      return res.status(400).json({
        status: "400",
        message: "data transaksi tidak tersedia",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Sukses menampilkan semua data pembayaran pengguna",
      getDataPembayaranDariTransaksi,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// bisa
// menampilkan data payment berdasarkan data nama perumahan dan status_pembayaran pending
const findPendingTransakasi = async (req, res) => {
  try {
    const findPending = await Payment.findAll({
      where: {
        perumahan: req.params.perumahan,
        deleted_at: null,
      },
    });

    if (!findPending || findPending == 0) {
      return res.status(400).json({
        status: "400",
        message: "perumahan tidak tersedia dalam status pending",
      });
    }
    res.status(200).json({
      status: "200",
      message:
        "Sukses menampilkan semua data payment berdasarkan nama perumahan",
      findPending,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

module.exports = {
  // buat dan update
  saveDataPembayaran,
  ambilDaftarPembayaranByStatus,
  uploadTransfer,
  updatePembayaran,
  updateStatusPembayaran,
  hapusPembayaran,

  //   menampilkan payment
  ambilDaftarPembayaran,

  getDataPembayaran,
  ambilPembayaranByUid,
  getDataPembayaranDariTransaction,

  findPendingTransakasi,
};
