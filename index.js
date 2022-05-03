require("dotenv").config();

const mysql = require("mysql");
const fs = require("fs");
const { SQL, generator } = require("./template");

const toCamel = (s) => {
  const str = s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// 디렉토리가 없을 경우 생성
if (!fs.existsSync(process.env.ENTITY_DIR)) {
  fs.mkdirSync(process.env.ENTITY_DIR);
}
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect();

connection.query(SQL, function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  // entity 테이블을 생성할 디렉토리를 만든다.
  results.map((r) => {
    const camelCaseTableName = toCamel(r.TABLE_NAME);

    fs.writeFileSync(
      `${process.env.ENTITY_DIR}/${camelCaseTableName}.entity.ts`,
      generator(camelCaseTableName, r.field)
    );
    console.log(`${camelCaseTableName} :: complete`);
  });
});

connection.end();
