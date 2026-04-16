front:
	cd frontend && npm run build

copy:
	rm -rf backend/resources/*
	mkdir -p backend/resources
	cp -r frontend/build/* backend/resources/

run: front copy
	cd backend && go run main.go