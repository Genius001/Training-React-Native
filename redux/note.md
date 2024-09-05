# REDUX

## State

Status Produksi (State): Ini adalah kondisi dari data di gudang pada suatu waktu tertentu. Setiap kali ada perintah kerja yang dilakukan, status produksi akan berubah.

## Store

Gudang (Store): Ini adalah tempat penyimpanan semua data tentang bagian-bagian mobil. Setiap perubahan data akan disimpan di sini.

## Action

Perintah Kerja (Actions): Ini adalah instruksi yang diberikan kepada sistem untuk mengubah data. Misalnya, "tambah 100 baut ke gudang", "kurangi jumlah mesin yang tersedia", atau "ubah tanggal produksi".

## Reducer

Bayangkan seorang kepala gudang di pabrik mobil. Setiap kali ada barang masuk atau keluar gudang, kepala gudang harus memperbarui catatan tentang jumlah barang yang ada. Inilah yang dilakukan oleh Redux reducer.

Apa itu Redux Reducer?

Redux reducer adalah fungsi khusus dalam Redux yang bertanggung jawab untuk mengubah state (data) aplikasi berdasarkan action yang diberikan. Sederhananya, reducer ini seperti resep yang menentukan bagaimana data di dalam store (gudang) harus diperbarui.

Redux reducer adalah fungsi yang menentukan bagaimana status aplikasi berubah sebagai respons terhadap tindakan yang dikirim ke penyimpanan

## Slice

Membagi Data Pabrik Menjadi Bagian-Bagian yang Lebih Kecil

Slice membagi store Redux menjadi bagian-bagian yang lebih kecil, disebut slice. Setiap slice bertanggung jawab untuk mengelola satu bagian spesifik dari state aplikasi.

## Mengapa Redux Penting untuk Pabrik Mobil?

- Organisasi Data: Redux membantu menjaga data pabrik tetap terstruktur dan mudah dipahami, seperti gudang yang tertata rapi.
- Keterlacakan: Setiap perubahan data dapat dilacak, sehingga kita dapat dengan mudah menemukan penyebab jika terjadi masalah produksi.
- Efisiensi: Redux hanya memperbarui data yang benar-benar berubah, sehingga sistem menjadi lebih cepat dan efisien.
- Kolaborasi: Redux sangat cocok untuk pabrik besar yang melibatkan banyak departemen, karena setiap departemen dapat mengakses dan memperbarui data yang sama.
