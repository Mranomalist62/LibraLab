<?php
session_start();
//IQBALSUWANDI
// Inisialisasi keranjang belanja jika belum ada
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart($productId, $productName, $quantity, $price) {
    $item = [
        'id' => $productId,
        'name' => $productName,
        'quantity' => $quantity,
        'price' => $price
    ];
    
    // Periksa apakah produk sudah ada di keranjang
    foreach ($_SESSION['cart'] as &$cartItem) {
        if ($cartItem['id'] == $productId) {
            // Tambah kuantitas jika produk sudah ada
            $cartItem['quantity'] += $quantity;
            return;
        }
    }

    // Jika produk belum ada di keranjang, tambahkan sebagai item baru
    $_SESSION['cart'][] = $item;
}

// Menampilkan isi keranjang
function displayCart() {
    if (empty($_SESSION['cart'])) {
        echo "Keranjang belanja kosong.";
    } else {
        echo "Isi keranjang belanja:<br>";
        foreach ($_SESSION['cart'] as $cartItem) {
            echo "{$cartItem['name']} ({$cartItem['quantity']} x Rp. {$cartItem['price']})<br>";
        }
    }
}

// Contoh: Menambahkan produk ke keranjang
addToCart(1, "ada apa dengan cinta", 2, 50000);  // Produk 1
addToCart(2, "psycology of money", 1, 70000);     // Produk 2

// Tampilkan keranjang belanja
displayCart();
?>
