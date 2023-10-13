"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uid: {
        type: Sequelize.STRING,
      },
      transaksi_id: {
        type: Sequelize.STRING,
      },
      nama_lengkap: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.TEXT,
      },
      no_spr: {
        type: Sequelize.STRING,
      },
      perumahan: {
        type: Sequelize.STRING,
      },
      kavling: {
        type: Sequelize.STRING,
      },
      no_hp: {
        type: Sequelize.STRING,
      },
      jenis_pembayaran: {
        type: Sequelize.STRING,
      },
      nama_pembayaran: {
        type: Sequelize.STRING,
      },
      keterangan_pembayaran: {
        type: Sequelize.STRING,
      },
      jumlah_pembayaran: {
        type: Sequelize.STRING,
      },
      status_pembayaran: {
        type: Sequelize.ENUM(
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
      tanggal_pembayaran: {
        type: Sequelize.BIGINT,
      },
      created_at: {
        type: Sequelize.BIGINT,
      },
      updated_at: {
        type: Sequelize.BIGINT,
      },
      deleted_at: {
        type: Sequelize.BIGINT,
      },
      created_by: {
        type: Sequelize.JSON,
      },
      updated_by: {
        type: Sequelize.JSON,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Payments");
  },
};
