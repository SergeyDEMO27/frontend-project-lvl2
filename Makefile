install:
	npm install
gendiff:
	bin/gendiff.js -h
publish:
	npm publish --dry-run
lint:
	npx eslint .
