SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET collation_connection = 'utf8mb4_unicode_ci';

-- Kullanıcı oluştur ve izinleri ver
CREATE USER IF NOT EXISTS 'wordmaster'@'%' IDENTIFIED WITH mysql_native_password BY 'wordmaster123';
GRANT ALL PRIVILEGES ON wordmasterdb.* TO 'wordmaster'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

-- Root kullanıcısını güncelle
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootroot';
FLUSH PRIVILEGES;

-- Timezone tablosunu yükle
SET GLOBAL time_zone = '+00:00'; 