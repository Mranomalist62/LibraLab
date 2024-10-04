<?php
//Alif Irsyad Santoso
// Username dan password yang valid
$pengguna_valid = "admin";
$kata_sandi_valid = "1234";

// Cek apakah form sudah disubmit
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama_pengguna = $_POST['nama_pengguna'];
    $kata_sandi = $_POST['kata_sandi'];

    // Validasi login
    if ($nama_pengguna == $pengguna_valid && $kata_sandi == $kata_sandi_valid) {
        // Jika login berhasil, arahkan ke halaman homepage.php
        header("Location: homepage.php");
        exit();
    } else {
        // Jika login gagal, tampilkan pesan error
        echo "Nama pengguna atau kata sandi salah!";
        header("Location: register.php");
    }
}
?>

<!-- Form untuk login -->
<form method="post" action="">
    <input type="text" name="nama_pengguna" placeholder="Nama Pengguna" required>
    <input type="password" name="kata_sandi" placeholder="Kata Sandi" required>
    <input type="submit" value="Login">
</form>
