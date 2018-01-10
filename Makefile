
.PHONY: test

build:
	-tsc

test:
	npm test

install:
	npm install

publish: install build
	npm publish
