front:
	cd frontend && npm run build

copy:
	mkdir -p backend/resources
	rm -rf backend/resources/*
	cp -r frontend/build/* backend/resources/

back:
	cd backend && go run main.go

run: front copy back