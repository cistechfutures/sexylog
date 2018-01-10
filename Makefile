
.PHONY: test

test:
	npm test

install:
	npm install

publish: install
	npm publish

