"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Transaction, { foreignKey: "transaksi_id" });
    }
  }
  Payment.init(
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
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
