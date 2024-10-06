<?php

//Mario Firdaus Abdillah
//Fungsi Check Pembayaran
function Check_payment($orderDataServer,$orderDataUser) {
        $author_price = $orderDataServer->price;  // Ambil harga dari Order Data server

        // Bandingkan jumlah pembayaran dengan pembayaran dari user
        if ($orderDataUser->payment == $author_price) {
            return 200; // Kembalikan kode 200 untuk Pembayaran cocok
        } elseif ($orderDataUser->payment < $author_price) {
            return 400; // Kembalikan kode 400 untuk Pembayaran kurang
        } else {
            $difference = $orderDataUser - $author_price;
            return 406; // Kembalikan kode 406 untuk Pembayaran kelebihan
        }
}
?>