"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Payment, { foreignKey: "transaksi_id" });
    }
  }
  Transaction.init(
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
      tanggal_transaksi: DataTypes.BIGINT,
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
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
