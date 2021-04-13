# Webclass API

## Structure du projet
Exemple :
```
├── src
│   ├── app.module.ts
│   ├── sale
│   │   ├── sale.controller.ts
│   │   ├── sale.dto.create.ts
│   │   ├── sale.dto.update.ts
│   │   ├── sale.module.ts
│   │   ├── sale.schema.ts
│   │   ├── sale.service.ts
│   │   └── sale.ts
│   ├── [+] invitation
```
## Code scaffolding

Run `nest generate controller controller-name` to generate a new controller. You can also use `nest generate class|controller|decorator|filter|gateway|guard|interface|interceptor|library|middleware|module|pipe|provider|resolver|service`.

More information on CLI : [https://docs.nestjs.com/cli/usages](https://docs.nestjs.com/cli/usages)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
