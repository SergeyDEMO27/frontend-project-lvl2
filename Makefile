install:
	npm ci
gendiff:
	bin/gendiff.js -h
test:
	npm run test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
publish:
	npm publish --dry-run
lint:
	npx eslint .