.PHONY: setup run front back front-check
setup:
	cd frontend && npm ci
	cd backend && go mod tidy

run: front back

front:
	cd frontend && npm run build

back:
	cd backend && go run main.go

front-check:
	cd frontend && npm run format && npm run lint