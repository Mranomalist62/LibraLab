e<?php
//Arief Budi Mulyawan
// Koneksi ke database (ganti sesuai konfigurasi database Anda)
$host = "localhost";
$user = "root";
$pass = "";
$db = "db_libralab";

$koneksi = mysqli_connect($host, $user, $pass, $db);

// Cek koneksi
if (!$koneksi) {
    die("Koneksi gagal: " . mysqli_connect_error());
}

// Cek apakah form sudah disubmit
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama_pengguna = $_POST['nama_pengguna'];
    $kata_sandi = $_POST['kata_sandi'];
    $konfirmasi_sandi = $_POST['konfirmasi_sandi'];

    // Validasi input
    $error = false;
    $pesan_error = "";

    // Cek apakah username sudah ada
    $query = "SELECT * FROM akun WHERE username = '$nama_pengguna'";
    $result = mysqli_query($koneksi, $query);

    if (mysqli_num_rows($result) > 0) {
        $error = true;
        $pesan_error = "Nama pengguna sudah digunakan!";
    }

    // Cek apakah password dan konfirmasi password sama
    if ($kata_sandi !== $konfirmasi_sandi) {
        $error = true;
        $pesan_error = "Kata sandi dan konfirmasi kata sandi tidak cocok!";
    }

    // Jika tidak ada error, simpan ke database
    if (!$error) {
        // Hash password sebelum disimpan ke database
        $kata_sandi_hash = password_hash($kata_sandi, PASSWORD_DEFAULT);

        $query = "INSERT INTO akun (username, password) VALUES ('$nama_pengguna', '$kata_sandi_hash')";

        if (mysqli_query($koneksi, $query)) {
            echo "Registrasi berhasil! Silakan <a href='login.php'>login</a>";
            exit();
        } else {
            echo "Error: " . $query . "<br>" . mysqli_error($koneksi);
        }
    } else {
        echo $pesan_error;
    }
}

// Tutup koneksi database
mysqli_close($koneksi);
?>

<!-- Form untuk registrasi -->
<form method="post" action="">
    <input type="text" name="nama_pengguna" placeholder="Nama Pengguna" required>
    <input type="password" name="kata_sandi" placeholder="Kata Sandi" required>
    <input type="password" name="konfirmasi_sandi" placeholder="Konfirmasi Kata Sandi" required>
    <input type="submit" value="Daftar">
</form>
<p>Sudah punya akun? <a href="login.php">Login di sini</a></p>
