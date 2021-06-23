install:
	npm install
gendiff:
	bin/gendiff.js -h
test:
	npm run test
coverage:
	npm test -- --coverage
publish:
	npm publish --dry-run
lint:
	npx eslint .