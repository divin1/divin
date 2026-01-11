.PHONY: format lint typecheck

format:
	npm run format

lint:
	npm run lint
	npx tsc --noEmit
	
