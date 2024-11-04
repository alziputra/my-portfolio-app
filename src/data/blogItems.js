const blogItems = [
  {
    id: 1,
    image: "https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_1280.png",
    title: "JavaScript: Dasar-Dasar",
    content: `
    JavaScript adalah bahasa pemrograman yang digunakan untuk membuat situs web lebih interaktif. Bahasa ini awalnya dikembangkan oleh Netscape pada tahun 1995 dan kini menjadi salah satu bahasa yang paling populer di dunia pengembangan web. JavaScript digunakan di sisi klien (front-end) dan juga dapat digunakan di sisi server (back-end) dengan bantuan Node.js. Berikut adalah dasar-dasar JavaScript yang perlu dipahami:
    
    1. Menulis Kode JavaScript - Kode JavaScript dapat ditulis langsung di HTML menggunakan tag <script>.
    2. Variabel - Variabel adalah cara untuk menyimpan data dalam JavaScript. Ada tiga kata kunci yang bisa digunakan untuk mendeklarasikan variabel: var, let, dan const.
    3. Tipe Data - JavaScript memiliki beberapa tipe data dasar: String, Number, Boolean, Object, Array, Undefined, dan Null.
    4. Operator - Operator digunakan untuk melakukan operasi pada variabel atau nilai. Beberapa operator umum dalam JavaScript meliputi aritmatika, perbandingan, dan logika.
    5. Kondisional - JavaScript menggunakan pernyataan kondisional untuk membuat keputusan berdasarkan kondisi tertentu.
    6. Loop - Loop digunakan untuk menjalankan blok kode berulang kali.
    7. Fungsi - Fungsi adalah blok kode yang dapat digunakan kembali dan menjalankan tugas tertentu.
    8. DOM Manipulation - JavaScript dapat digunakan untuk memanipulasi Document Object Model (DOM).
    9. Event Handling - Event handling memungkinkan JavaScript bereaksi terhadap interaksi pengguna.
    
    JavaScript adalah bahasa pemrograman yang sangat fleksibel dan kaya fitur. Menguasai dasar-dasar ini adalah langkah awal untuk membuat situs web interaktif dan dinamis. Selanjutnya, Anda dapat mendalami lebih lanjut tentang topik lanjutan seperti async/await, API, dan framework JavaScript seperti React atau Vue. Semoga panduan ini membantu Anda memahami dasar-dasar JavaScript!
    `,
    createdAt: "10 Oktober 2023",
    updateAt: "15 Oktober 2023",
  },
  {
    id: 2,
    image: "https://cdn.pixabay.com/photo/2019/02/18/19/59/graphic-4005286_640.png",
    title: "React untuk Pemula: Memahami Komponen dan State",
    content:
      "Pelajari dasar-dasar membangun antarmuka pengguna dengan React. Artikel ini membahas apa itu komponen, cara menggunakan props untuk komunikasi antar komponen, serta bagaimana mengelola state dalam aplikasi. Sangat berguna bagi yang baru mulai dengan React.",
    createdAt: "15 November 2023",
    updateAt: "20 November 2023",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/600",
    title: "Menguasai MySQL: Manajemen Database dan Optimasi Query",
    content:
      "MySQL adalah salah satu sistem manajemen basis data yang paling populer. Artikel ini mengulas cara menjalankan perintah-perintah dasar MySQL, tips untuk mengoptimalkan performa query, serta praktik terbaik dalam manajemen database yang efisien.",
    createdAt: "20 Desember 2023",
    updateAt: "25 Desember 2023",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/600",
    title: "Menggunakan Sequelize ORM dengan Node.js dan MySQL",
    content:
      "Panduan ini menjelaskan cara menggunakan Sequelize ORM dalam proyek Node.js untuk berinteraksi dengan MySQL. Mulai dari mendefinisikan model, menjalankan migrasi, hingga melakukan operasi CRUD di database secara efisien dan mudah.",
    createdAt: "10 Januari 2024",
    updateAt: "15 Januari 2024",
  },
  {
    id: 5,
    image: "https://via.placeholder.com/600",
    title: "JavaScript Lanjutan: Closures, Promises, dan Async/Await",
    content: "Dalam artikel ini, kita mendalami fitur-fitur JavaScript tingkat lanjut seperti closures, promises untuk manajemen asynchronous, serta async/await untuk penulisan kode asynchronous yang lebih sederhana dan mudah dibaca.",
    createdAt: "5 Februari 2024",
    updateAt: "20 Februari 2024",
  },
];

export default blogItems;
