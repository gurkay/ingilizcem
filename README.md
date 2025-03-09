# Spring Boot JWT Authentication example with Spring Security & Spring Data JPA

```
## Run Spring Boot application
```
# src/main/resources/application.yml
# saas.app.jwtSecret:
openssl rand -base64 32 
```
# backend/target/backend-0.0.1-SNAPSHOT.jar
cd backend && mvn clean package && cd ..
```
docker system prune -a // tüm container'ları kaldır
docker system prune -f // tüm image'ları kaldır
docker system prune -v // tüm volume'ları kaldır
docker-compose build --no-cache
docker-compose down -v
docker-compose up --build -d
```
## Run following SQL insert statements
```
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');
```
## Run git commands
```
# yontem 1
# Mevcut commit'i geri al
git reset --soft HEAD~1

# node_modules klasörünü Git'ten kaldır
git rm -r --cached node_modules

# Değişiklikleri yeniden commit et
git add .
git commit -m "Initial commit without node_modules"

# GitHub'a push et
git push -u origin main


```
## Run docker build and push to docker hub
# Projenin backend dizininde
# Create a new builder instance
docker buildx create --use
cd backend && docker buildx build --platform linux/amd64 -t gurkay/backend-image:latest --push . && cd ..

# Projenin frontend dizininde
cd frontend && docker buildx build --platform linux/amd64 -t gurkay/frontend-image:latest --push . && cd ..

# Projenin root dizininde
docker images

# Kullanıcı adı ve şifrenizi girin
docker login
```
```
## container işlemleri
# container listesi
docker ps -a

# container logları
docker logs -f <container-id>

# container'ı kapat
docker stop <container-id>

# container'ı başlat
docker start <container-id>

# container'ı kaldır
docker rm <container-id>

# container'ı yeniden başlat
docker restart <container-id>

# container'ın içine gir
docker exec -it <container-id> bash

# container'ın dışına çık
exit

# container'ın loglarını görüntüle
docker logs -f <container-id>

```
```
## linux sunucuda swap oluşturma
# login to server
ssh root@143.110.232.75

# copy files
scp -r /Users/gurkay/Documents/myCodes/cursorAI/ingilizcem-ai root@143.110.232.75:/root/

# run docker compose
cd /root/proje
docker-compose up --build -d

# delete file in server
rm -rf /root/proje

# swap dosyasını oluştur
sudo fallocate -l 2G /swapfile

# dosyayı sadece root erişebilir yap
sudo chmod 600 /swapfile

# swap dosyasını swap alanına dönüştür
sudo mkswap /swapfile

# swap alanını etkinleştir
sudo swapon /swapfile

# swap'in durumunu kontrol et
sudo swapon --show

# swap'in boyutunu kontrol et
sudo swapon --summary

# swap'i devre dışı bırak
sudo swapoff /swapfile

```
## curl commands
```
curl -X POST http://localhost:8080/api/auth/signin -H "Content-Type: application/json" -d '{"email":"gunesebak@gmail.com","password":"123456"}'

curl -X POST http://localhost:8080/api/auth/signup -H "Content-Type: application/json" -d '{"email":"user@gmail.com","password":"123456"}'

curl -X POST http://localhost:8080/api/auth/signin -H "Content-Type: application/json" -d '{"email":"user@gmail.com","password":"123456"}'

curl -X POST http://localhost:8080/api/auth/_log -H "Content-Type: application/json" -d '{"email":"user@gmail.com","password":"123456"}'

curl -X GET http://localhost:8080/api/auth/error -H "Content-Type: application/json"

```
## mysql connection in container
```
# login to server
ssh root@<droplet-ip-adresi>

# connect to mysql
docker exec -it <container-id> mysql -u root -p wordmasterdb

# show databases
show databases; 

# show tables
show tables;

# show users
show users;

# show current database
select database();

# show current user
select user();


```