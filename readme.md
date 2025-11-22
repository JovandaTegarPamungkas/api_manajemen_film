git init
git add .
git commit -m "Initial commit: setup express project structure"

buat reposetory dulu

git remote set-url origin https://github.com/USERNAME_NAMA/NAMA_REPO.git
# kalau error pakai yang bawah ini
git remote add origin https://github.com/USERNAME_NAMA/NAMA_REPO.git (https://github.com/JovandaTegarPamungkas/API-Manajemen-Film.git)

# ganti master jadi main
git branch -M main

# puhs ke github
git push -u origin main 


# push ulang
git add .
git commit -m "..."
git push origin main

================================

# push ke vercel
- Source -> main -> code

git remote add origin https://github.com/USERNAME_NAMA/NAMA_REPO.git (https://github.com/JovandaTegarPamungkas/API-Manajemen-Film.git)

https://github.com/JovandaTegarPamungkas/api_fanajemen_film.git

# push -f
git push -f origin main

# cek ke 2 github
git remote -v

git remote remove origin main

git add .

lalu git remote add origin https://github.com/JovandaTegarPamungkas/API-Manajemen-Film.git
git push -u origin main

git remote set-url origin https://github.com/JovandaTegarPamungkas/api_fanajemen_film.git
git push -u origin main