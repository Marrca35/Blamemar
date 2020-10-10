@ECHO OFF

docker build -t heist ../.
docker run -dp 3000:3000 heist

@ECHO ON