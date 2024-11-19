user-- Table for Province
CREATE TABLE provinsi (
    ID_Provinsi INT PRIMARY KEY AUTO_INCREMENT,
    nama_Provinsi VARCHAR(255) NOT NULL
);

-- Table for District
CREATE TABLE kabupaten (
    ID_Kabupaten INT PRIMARY KEY AUTO_INCREMENT,
    nama_Kabupaten VARCHAR(255) NOT NULL,
    ID_Provinsi INT,
    FOREIGN KEY (ID_Provinsi) REFERENCES Provinsi(ID_Provinsi) ON DELETE SET NULLuser
);

-- Table for User
CREATE TABLE user (
    ID_User INT PRIMARY KEY AUTO_INCREMENT,
    Nama_user VARCHAR(100) NOT NULL,
    ID_Provinsi INT,
    ID_Kabupaten INT,
    Ket_alamat TEXT,
    notel_user VARCHAR(20),
    norek_user VARCHAR(20),
    password_user VARCHAR(255) NOT NULL,
    email_user VARCHAR(100) UNIQUE,
    FOREIGN KEY (ID_Provinsi) REFERENCES Provinsi(ID_Provinsi) ON DELETE SET NULL,
    FOREIGN KEY (ID_Kabupaten) REFERENCES Kabupaten(ID_Kabupaten) ON DELETE SET NULL
);

-- Table for Author
CREATE TABLE Author (
    ID_Author INT PRIMARY KEY AUTO_INCREMENT,
    nama_author VARCHAR(100) NOT NULL,
    ID_Provinsi INT,
    ID_Kabupaten INT,
    Ket_alamat TEXT,
    notel_author VARCHAR(15),
    norek_author VARCHAR(20),
    password_author VARCHAR(255) NOT NULL,
    email_author VARCHAR(100) UNIQUE NOT NULL,
    FOREIGN KEY (ID_Provinsi) REFERENCES Provinsi(ID_Provinsi) ON DELETE SET NULL,
    FOREIGN KEY (ID_Kabupaten) REFERENCES Kabupaten(ID_Kabupaten) ON DELETE SET NULL
);

-- Table for Admin
CREATE TABLE Admin (
    ID_Admin INT PRIMARY KEY AUTO_INCREMENT,
    nama_admin VARCHAR(100) NOT NULL,
    password_admin VARCHAR(255) NOT NULL
);

-- Table for Book
CREATE TABLE book (
    ID_Buku INT PRIMARY KEY AUTO_INCREMENT,
    judul_buku VARCHAR(255) NOT NULL,
    ID_Author INT NOT NULL,
    tahun_terbit YEAR NOT NULL,
    ISBN VARCHAR(20) UNIQUE NOT NULL,
    halaman INT,
    lebar_buku DECIMAL(5, 2),
    bahasa VARCHAR(50),
    panjang_buku DECIMAL(5, 2),
    berat_buku DECIMAL(5, 2),
    harga_buku DECIMAL(10, 2),
    format_buku VARCHAR(50),
    rating_buku DECIMAL(3, 2),
    FOREIGN KEY (ID_Author) REFERENCES Author(ID_Author) ON DELETE CASCADE
);

-- Table for Jobdesk
CREATE TABLE jobdesk (
    ID_Jobdesk INT PRIMARY KEY AUTO_INCREMENT,
    jobdesk_staff VARCHAR(255) NOT NULL
);

-- Table for Staff
CREATE TABLE staff (
    ID_Staff INT PRIMARY KEY AUTO_INCREMENT,
    nama_staff VARCHAR(255) NOT NULL,
    email_staff VARCHAR(255) UNIQUE NOT NULL,
    ID_Jobdesk INT,
    FOREIGN KEY (ID_Jobdesk) REFERENCES Jobdesk(ID_Jobdesk) ON DELETE SET NULL
);

-- Table for Warehouse
CREATE TABLE gudang (
    ID_Gudang INT PRIMARY KEY AUTO_INCREMENT,
    ID_Provinsi INT,
    ID_Kabupaten INT,
    Ket_alamat VARCHAR(255),
    Nama_gudang VARCHAR(255) NOT NULL,
    FOREIGN KEY (ID_Provinsi) REFERENCES Provinsi(ID_Provinsi) ON DELETE SET NULL,
    FOREIGN KEY (ID_Kabupaten) REFERENCES Kabupaten(ID_Kabupaten) ON DELETE SET NULL
);

-- Table for Transaction
CREATE TABLE transaction (
    ID_Transaksi INT PRIMARY KEY AUTO_INCREMENT,
    rating_transaksi INT,
    format_buku VARCHAR(255),
    status_transaksi VARCHAR(255),
    ID_Gudang INT,
    ID_Buku INT,
    ID_Admin INT,
    ID_Staff INT,
    ID_User INT,
    FOREIGN KEY (ID_Gudang) REFERENCES Gudang(ID_Gudang) ON DELETE SET NULL,
    FOREIGN KEY (ID_Buku) REFERENCES Book(ID_Buku) ON DELETE SET NULL,
    FOREIGN KEY (ID_Admin) REFERENCES Admin(ID_Admin) ON DELETE SET NULL,
    FOREIGN KEY (ID_Staff) REFERENCES Staff(ID_Staff) ON DELETE SET NULL,
    FOREIGN KEY (ID_User) REFERENCES User(ID_User) ON DELETE SET NULL
);

CREATE TABLE UserOTP (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email_user VARCHAR(100) UNIQUE NOT NULL,
    otp VARCHAR(4) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


