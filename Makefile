.PHONY: run front back front-check
run: front back

front:
	cd frontend && npm run build

back:
	cd backend && go run main.go

front-check:
	cd frontend && npm run format && npm run lint