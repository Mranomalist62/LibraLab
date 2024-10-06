<?php
// Mohammad Hikam AK - 2211102278

// input ke db
function publishBook($title, $author, $publisher, $category, $price, $stock, $coverFile) {
    if (empty($title) || empty($author) || empty($publisher) || empty($category) || empty($price) || empty($stock) || empty($coverFile)) {
        return "Input tidak valid. Silakan periksa kembali.";
    }

    if (!is_numeric($price) || $price <= 0) {
        return "Harga harus lebih besar dari 0.";
    }

    if (!is_numeric($stock) || $stock < 0) {
        return "Stok harus bilangan positif.";
    }

    // cek ekstensi cover
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    $coverFileExtension = strtolower(pathinfo($coverFile['name'], PATHINFO_EXTENSION));

    if (!in_array($coverFileExtension, $allowedExtensions)) {
        return "Cover harus berupa file gambar (jpg, jpeg, png, gif).";
    }

    // buat path baru
    $coverPath = "uploads/" . basename($coverFile['name']);

    // cek file diupload
    if (!move_uploaded_file($coverFile['tmp_name'], $coverPath)) {
        return "Gagal meng-upload gambar cover.";
    }

    // koneksi ke db
    $conn = new mysqli("localhost", "username", "password", "libralab");

    if ($conn->connect_error) {
        die("Koneksi database gagal: " . $conn->connect_error);
    }

    // query insert
    $sql = "INSERT INTO books (title, author, publisher, category, price, stock, cover)
            VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    // prepare statement
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssdis", $title, $author, $publisher, $category, $price, $stock, $coverPath);

    // execute statement
    if ($stmt->execute()) {
        $stmt->close();
        $conn->close();
        return "Buku berhasil diterbitkan.";
    } else {
        $stmt->close();
        $conn->close();
        return "Terjadi kesalahan saat menyimpan data buku.";
    }
}

// contoh fungsi publishBook saat submit
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $result = publishBook(
        $_POST['title'],
        $_POST['author'],
        $_POST['publisher'],
        $_POST['category'],
        $_POST['price'],
        $_POST['stock'],
        $_FILES['cover']
    );
    echo $result;
}
?>
