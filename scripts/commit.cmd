@ECHO OFF

git pull
git commit -m %1
git push

@ECHO ON