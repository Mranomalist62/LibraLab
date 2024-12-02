// document.addEventListener('DOMContentLoaded', function () {
//   const dropdowns = document.querySelectorAll('.dropdown');
//   const mainContent = document.querySelector('body'); // Pilih seluruh konten body

//   dropdowns.forEach((dropdown) => {
//     // Event ketika dropdown dibuka
//     dropdown.addEventListener('show.bs.dropdown', function () {
//       // Cek apakah dropdown yang diklik
//       mainContent.classList.add('blur');
//     });

//     // Event ketika dropdown ditutup
//     dropdown.addEventListener('hide.bs.dropdown', function () {
//       mainContent.classList.remove('blur');
//     });
//   });
// });

$(document).ready(function () {
  $('.slider').slick({
    slidesToShow: 5, // Jumlah slide yang ditampilkan sekaligus
    slidesToScroll: 1,
    arrows: true, // Tampilkan tombol navigasi
    dots: true, // Tampilkan navigasi dot
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Pengaturan responsif untuk ukuran layar lebih kecil
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});

