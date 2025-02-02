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
git reset HEAD~1

# node_modules klasörünü Git'ten kaldır
git rm -r --cached node_modules

# Değişiklikleri yeniden commit et
git add .
git commit -m "Initial commit without node_modules"

# GitHub'a push et
git push -u origin main

# yontem 2
# 1. Git geçmişinden node_modules klasörünü sil
git filter-branch --force --index-filter \
  "git rm -rf --cached --ignore-unmatch frontend/node_modules" \
  --prune-empty --tag-name-filter cat -- --all

# 2. Git geçmişini temizle
git gc --prune=now

# 3. Mevcut değişiklikleri geri al
git reset --hard

# 4. node_modules klasörünü .gitignore'a ekle (zaten ekli)

# 5. Zorla push et
git push origin main --force

# yontem 3
# 1. Yeni bir branch oluştur
git checkout --orphan latest_branch

# 2. Tüm dosyaları ekle
git add -A

# 3. Değişiklikleri commit et
git commit -m "Fresh start without node_modules"

# 4. main branch'i sil
git branch -D main

# 5. Current branch'i main olarak yeniden adlandır
git branch -m main

# 6. Zorla push et
git push -f origin main
```