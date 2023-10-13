"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uid: {
        type: Sequelize.STRING,
      },
      referral: {
        type: Sequelize.STRING,
      },
      cara_pembayaran: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      alamat: {
        type: Sequelize.STRING,
      },
      harga: {
        type: Sequelize.STRING,
      },
      desa: {
        type: Sequelize.STRING,
      },
      harga_kesepakatan: {
        type: Sequelize.STRING,
      },
      kavling: {
        type: Sequelize.STRING,
      },
      kecamatan: {
        type: Sequelize.STRING,
      },
      keterangan: {
        type: Sequelize.STRING,
      },
      kota: {
        type: Sequelize.STRING,
      },
      nama_developer: {
        type: Sequelize.STRING,
      },
      no_hp: {
        type: Sequelize.STRING,
      },
      no_spr: {
        type: Sequelize.STRING,
      },
      npwp: {
        type: Sequelize.STRING,
      },
      provinsi: {
        type: Sequelize.STRING,
      },
      tag: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      tipe: {
        type: Sequelize.STRING,
      },
      url_foto_ktp: {
        type: Sequelize.TEXT,
      },
      tanggal_transaksi: {
        type: Sequelize.BIGINT,
      },
      status: {
        type: Sequelize.ENUM(
          "pending",
          "belum_bayar",
          "progress",
          "realisasi",
          "lunas",
          "batal"
        ),
        defaultValue: "belum_bayar",
      },
      uang_muka: {
        type: Sequelize.BIGINT,
      },
      booking_fee: {
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
    await queryInterface.dropTable("Transactions");
  },
};
