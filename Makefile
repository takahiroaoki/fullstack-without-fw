front:
	cd frontend && npm run build

back:
	cd backend && go run main.go

run: front back