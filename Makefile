front:
	cd frontend && npm run format && npm run build

back:
	cd backend && go run main.go

run: front back