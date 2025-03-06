.
├── biome.json
├── docker-compose.yml
├── info.md
├── package.json
├── pnpm-lock.yaml
├── prisma
│   ├── migrations
│   └── schema.prisma
├── README.md
├── src
│   ├── adapter
│   │   └── express
│   │       ├── adapterMiddleware.ts
│   │       └── adapterRoute.ts
│   ├── config
│   │   └── env.ts
│   ├── data
│   │   └── usecase
│   │       ├── Cryptography
│   │       │   └── CryptographyUseCase.ts
│   │       └── User
│   │           ├── AddUserUseCase.ts
│   │           ├── ListUserUseCase.ts
│   │           ├── LoadUserUseCase.ts
│   │           ├── LoginUserUseCase.ts
│   │           └── UpdateUserUseCase.ts
│   ├── database
│   │   ├── index.ts
│   │   ├── interfaces
│   │   │   ├── LogRepository.ts
│   │   │   └── UserRepository.ts
│   │   ├── prisma
│   │   │   └── client
│   │   │       ├── default.d.ts
│   │   │       ├── default.js
│   │   │       ├── edge.d.ts
│   │   │       ├── edge.js
│   │   │       ├── index-browser.js
│   │   │       ├── index.d.ts
│   │   │       ├── index.js
│   │   │       ├── libquery_engine-debian-openssl-1.1.x.so.node
│   │   │       ├── package.json
│   │   │       ├── runtime
│   │   │       │   ├── edge-esm.js
│   │   │       │   ├── edge.js
│   │   │       │   ├── index-browser.d.ts
│   │   │       │   ├── index-browser.js
│   │   │       │   ├── library.d.ts
│   │   │       │   ├── library.js
│   │   │       │   ├── react-native.js
│   │   │       │   └── wasm.js
│   │   │       ├── schema.prisma
│   │   │       ├── wasm.d.ts
│   │   │       └── wasm.js
│   │   └── repositories
│   │       ├── LogMongoDBRepository.ts
│   │       └── UserMongoDBRepository.ts
│   ├── factories
│   │   ├── CreateUser
│   │   │   ├── CreateUserController.ts
│   │   │   ├── CreateUserFactory.ts
│   │   │   └── CreateUserValidation.ts
│   │   ├── ListUser
│   │   │   ├── ListUserController.ts
│   │   │   └── ListUserFactory.ts
│   │   ├── LoadUser
│   │   │   ├── LoadUserController.ts
│   │   │   └── LoadUserFactory.ts
│   │   ├── LoginUser
│   │   │   ├── LoginUserController.ts
│   │   │   └── LoginUserFactory.ts
│   │   ├── middleware
│   │   │   └── AuthMiddewareFactory.ts
│   │   ├── SignUp
│   │   │   ├── SignUpController.ts
│   │   │   ├── SignUpFactory.ts
│   │   │   └── SignUpValidation.ts
│   │   └── UpdateUser
│   │       ├── UpdateUserController.ts
│   │       ├── UpdateUserFactory.ts
│   │       └── UpdateUserValidation.ts
│   ├── infra
│   │   ├── cache
│   │   │   └── redis.ts
│   │   └── queue
│   │       ├── Messages.ts
│   │       └── startConsumer.ts
│   ├── main
│   │   ├── app.ts
│   │   └── server.ts
│   ├── middleware
│   │   └── AuthMiddleware.ts
│   ├── routes
│   │   ├── auth
│   │   │   └── index.ts
│   │   ├── router.ts
│   │   └── users
│   │       └── index.ts
│   ├── shared
│   │   ├── errors
│   │   │   ├── accessDeniedError.ts
│   │   │   ├── emailInUseError.ts
│   │   │   ├── index.ts
│   │   │   ├── inUseError.ts
│   │   │   ├── invalidParamError.ts
│   │   │   ├── missingParamErrors.ts
│   │   │   ├── notFoundError.ts
│   │   │   ├── serverError.ts
│   │   │   ├── unauthorizedError.ts
│   │   │   ├── unexpectedError.ts
│   │   │   └── validateError.ts
│   │   ├── http
│   │   │   └── httpHelpers.ts
│   │   └── interfaces
│   │       ├── controller.ts
│   │       ├── http.ts
│   │       ├── middleware.ts
│   │       └── validation.ts
│   └── @types
│       └── express.d.ts
└── tsconfig.json

100 directories, 146 files
