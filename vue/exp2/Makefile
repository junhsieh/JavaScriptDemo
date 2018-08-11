PACKAGES := \
	github.com/junxie6/JavaScriptDemo/vue/exp2

DEPENDENCIES := \
	github.com/gin-gonic/gin

all: build silent-test

start: build run

build:
	go build -o bin/main main.go

run:
	./bin/main 2>&1 | tee test.log

test:
	go test -v $(PACKAGES)

silent-test:
	go test $(PACKAGES)

format:
	go fmt $(PACKAGES)

deps:
	go get $(DEPENDENCIES)

not-yet:
	git co master && git pull && make build && npm run build
