# Entity Generator

Mysql table을 typeorm entity class로 전환 해주는 단순 프로그램 입니다.


## Description

단순 반복 작업을 싫어하는 저를 위해서 만들었습니다.


## Getting Started

먼저 ```_env``` 파일을 ```.env```로 변경하고, 설정 값을 넣어야 합니다.

```bash
$ cp _env .evn
```

- ```.env``` 파일 내용

```
DB_HOST=                    # DB 연결 주소
DB_PORT=                    # DB PORT 
DB_USERNAME=                # DB 사용자 명
DB_PASSWORD=                # DB 비밀번호
DB_NAME=                    # DB 명

ENTITY_DIR='./entity'       # entity typescript 파일이 저장될 위치
```
### Dependencies

* mysql
* dotenv

### Installing

```bash
$ npm install
```

### Executing program

.env 설정이 완료 되었으면 다음 명령어로 실행 합니다.

```bash
$ npm run start

테이블명  :: complete
테이블명  :: complete
테이블명  :: complete
테이블명  :: complete
...

```

결과 파일은 ```테이블명(Camle표기).entity.ts``` 형식의 typescript를 가지게 됩니다.

## Authors

Contributors names and contact info

[@lahuman](https://lahuman.github.io/)

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
