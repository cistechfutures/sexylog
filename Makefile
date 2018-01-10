
.PHONY: test

build:
	npm start

test:
	npm test

install:
	npm install

publish: install
	npm publish

