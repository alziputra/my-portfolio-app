import Card from "../components/Card";

const AboutMe = () => {
  return (
    <div className="container mx-auto p-8 grid gap-8">
      {/* Objectif Section */}
      <Card title="Objectif">
        <p>Sebagai lulusan Sarjana Informatika yang sedang memperdalam keahlian dalam Cloud Computing dan Full-Stack Web Development, saya berkomitmen untuk menerapkan kemampuan teknis dan analitis saya di perusahaan teknologi...</p>
      </Card>

      {/* Pendidikan Section */}
      <Card title="Pendidikan">
        <ul className="list-disc list-inside">
          <li>
            Universitas Teknokrat Indonesia / Sarjana Informatika | IPK: 3.59 / 4.00
            <br />
            Bandarlampung / 2020 – 2024
            <br />
            • Mengikuti Bangkit Academy by Google, Tokopedia, Gojek, & Traveloka 2023, fokus pada Cloud Computing.
            <br />• Mengikuti Skilvul #Tech4Impact Kampus Merdeka Cycle 5, fokus pada Full-Stack Web Development
          </li>
        </ul>
      </Card>

      {/* Pengalaman Section */}
      <Card title="Pengalaman">
        <ul className="list-disc list-inside">
          <li>
            <strong>Bangkit Academy by Google, Tokopedia, Gojek, & Traveloka 2023 Batch 1 - Cloud Computing | Peserta</strong>
            <br />
            Daring | Februari 2023 - Juli 2023
            <br />
            Selama program ini, saya mendapatkan kesempatan untuk mempelajari Cloud Computing secara mendalam melalui pembelajaran individu...
            <ul className="list-disc list-inside pl-6">
              <li>Aktivitas Studi Independen...</li>
              <li>Detil Pembelajaran...</li>
              <li>Tugas Akhir...</li>
            </ul>
          </li>
          <li className="mt-4">
            <strong>Skilvul #Tech4Impact Kampus Merdeka Cycle 5: Full-Stack Web Development | Peserta</strong>
            <br />
            Daring | Agustus 2023 – Desember 2023
            <br />
            Dalam program ini, saya memperdalam keterampilan Full-Stack Web Development dengan berfokus pada pengembangan aplikasi web...
          </li>
        </ul>
      </Card>

      {/* Sertifikasi Section */}
      <Card title="Sertifikasi">
        <ul className="list-disc list-inside">
          <li>Menjadi Google Cloud Engineer, Dicoding Indonesia, Nomor: MRZMQQRGKPYQ, 2023-2026</li>
          <li>Belajar Dasar Pemrograman JavaScript, Dicoding Indonesia, Nomor: RVZKKVOLEZD5, 2023-2026</li>
          <li>Belajar Dasar Pemrograman Web, Dicoding Indonesia, Nomor: 4EXG9RQ8GZRL, 2023-2026</li>
          <li>Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud, Dicoding Indonesia, Nomor: MEPJK832QX3V, 2023-2026</li>
        </ul>
      </Card>

      {/* Skills Section */}
      <Card title="Skills">
        <ul className="list-disc list-inside">
          <li>
            <strong>Hard Skill:</strong> HTML, CSS, PHP, JavaScript, MySQL
          </li>
          <li>
            <strong>Soft Skill:</strong> Adaptive, Problem Solving, Teamwork
          </li>
          <li>
            <strong>Software Skill:</strong> Adobe Photoshop, Office, Figma
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default AboutMe;
