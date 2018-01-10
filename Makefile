
.PHONY: test

build:
	tsc

test:
	npm test

install:
	npm install

publish: build install
	npm publish


bib: build
	echo "DONE"
