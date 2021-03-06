SHELL = /bin/bash -o pipefail

APP_NAME = exp2

ROOT_DIR = $(CURDIR)
BIN_DIR = $(ROOT_DIR)/bin
APP = $(BIN_DIR)/$(APP_NAME)

LOG_DIR = $(ROOT_DIR)/log
LOG_FILE = $(LOG_DIR)/$(APP_NAME).log
LOG_FILE_BUILD = $(LOG_DIR)/build-$(APP_NAME).log
LOG_CONFIG = $(ROOT_DIR)/logrotate.conf
LOG_STATUS = $(LOG_DIR)/status

DOCKER_IMAGE_DIR = $(ROOT_DIR)/docker-image

REFLEX = $(BIN_DIR)/reflex
REFLEX_DIR = $(ROOT_DIR)/reflex

PACKAGES := \
	github.com/junxie6/JavaScriptDemo/vue/exp2

DEPENDENCIES := \
	github.com/gin-gonic/gin

# check we have a couple of dependencies
dependencies:
	@cd $(ROOT_DIR) && command -v $(REFLEX) >/dev/null 2>&1 || { printf >&2 $(REFLEX)" is not installed, please run: make reflex\n"; exit 1; }
	cd $(ROOT_DIR) && mkdir -p $(BIN_DIR)
	cd $(ROOT_DIR) && mkdir -p $(LOG_DIR)

#all: build silent-test
#
#start: build run
#
#build:
#	go build -o bin/main main.go
#
#run:
#	./bin/main 2>&1 | tee test.log
#
#test:
#	go test -v $(PACKAGES)
#
#silent-test:
#	go test $(PACKAGES)
#
#format:
#	go fmt $(PACKAGES)
#
#deps:
#	go get $(DEPENDENCIES)
#
#not-yet:
#	git co master && git pull && make build && npm run build

# run formatting tool and build
go-build: dependencies
	cd $(ROOT_DIR) && logrotate -v --state $(LOG_STATUS) $(LOG_CONFIG)
	cd $(ROOT_DIR) && go mod vendor -v 2>&1 | tee --append $(LOG_FILE_BUILD)
	cd $(ROOT_DIR) && go build -o $(APP) -v -x -mod vendor 2>&1 | tee --append $(LOG_FILE_BUILD)

go-run:
	cd $(ROOT_DIR) && go run -v -mod vendor -race main.go

# NOTE: -count 1 to disable go test cache.
go-test:
	cd $(ROOT_DIR) && go test -v -count 1 -mod vendor -race $(APP_NAME)/...

go-tidy:
	cd $(ROOT_DIR) && go mod tidy -v

go-clean:
	cd $(ROOT_DIR) && go clean -i -x -modcache

start: go-build
	cd $(ROOT_DIR) && logrotate -v --state $(LOG_STATUS) $(LOG_CONFIG)
	cd $(ROOT_DIR) && $(APP) 2>&1 | tee --append $(LOG_FILE)

run:
	cd $(ROOT_DIR) && bin/reflex --start-service -d none -r '\.go$$' -R '^vendor/' -R '^node_modules/' -- make start

reflex:
	cd $(ROOT_DIR) && mkdir -p $(BIN_DIR)
	cd $(ROOT_DIR) && git clone https://github.com/cespare/reflex.git --depth 1
	cd $(REFLEX_DIR) && go mod vendor -v
	cd $(REFLEX_DIR) && go build -o $(REFLEX) -v -x -mod vendor
	rm -rf $(REFLEX_DIR)

vue-build:
	npm run build

vue-watch:
	npm run watch

vue-lint:
	npm run lint
