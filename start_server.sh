sudo docker image build -t projmural . &&
sudo docker container run --rm -p 8000:8000 -p 8080:8080 projmural