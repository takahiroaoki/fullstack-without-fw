front-check:
	cd frontend && npm run format && npm run lint

front:
	cd frontend && npm run build

back:
	cd backend && go run main.go

run: front back