exports.SQL = `select
TABLE_NAME,
GROUP_CONCAT(CONCAT(
                '  /* ',
                case when length(COLUMN_COMMENT) > 0 then 
                    COLUMN_COMMENT 
                else 
                    COLUMN_NAME 
                end,
                ' */',
                CHAR(13),
                case 
                    when COLUMN_NAME = 'id' then '  @PrimaryGeneratedColumn()'
                    else                '  @Column()'
                end,
                CHAR(13),

                CONCAT('  ',
                    TRIM(CN1), 
                    TRIM(CONCAT(UPPER(SUBSTRING(CN2, 1, 1)) , SUBSTRING(CN2, 2, length(CN2)))), 
                    TRIM(CONCAT(UPPER(SUBSTRING(CN3, 1, 1)) , SUBSTRING(CN3, 2, length(CN3)))),
                    TRIM(CONCAT(UPPER(SUBSTRING(CN4, 1, 1)) , SUBSTRING(CN4, 2, length(CN4)))),
                    TRIM(CONCAT(UPPER(SUBSTRING(CN5, 1, 1)) , SUBSTRING(CN5, 2, length(CN5))))
                ), 
                case 
                    when LOWER(DATA_TYPE) = 'varchar' then ' :string'
                    when INSTR(LOWER(DATA_TYPE), 'int') > 0 then ' :number ' 
                    when LOWER(DATA_TYPE) = 'text' then ' :string ' 
                    when LOWER(DATA_TYPE) = 'datetime' then ' :date '
                    else ' :object '
                end, 
                ';',
                CHAR(13),
                CHAR(13)
            ) separator '') as field
from
(
select
    A.TABLE_NAME,
    B.ORDINAL_POSITION,
    B.COLUMN_NAME,
    case
        when length(B.COLUMN_NAME) - length(replace(B.COLUMN_NAME, '_', '')) + 1 >= 1 then 
                SUBSTRING_INDEX(SUBSTRING_INDEX(LCASE(B.COLUMN_NAME), '_', 1), '_', -1)
        else ' '
    end as CN1,
    case
        when length(B.COLUMN_NAME) - length(replace(B.COLUMN_NAME, '_', '')) + 1 >= 2 then 
                SUBSTRING_INDEX(SUBSTRING_INDEX(LCASE(B.COLUMN_NAME), '_', 2), '_', -1)
        else ' '
    end as CN2,
    case
        when length(B.COLUMN_NAME) - length(replace(B.COLUMN_NAME, '_', '')) + 1 >= 3 then 
                SUBSTRING_INDEX(SUBSTRING_INDEX(LCASE(B.COLUMN_NAME), '_', 3), '_', -1)
        else ' '
    end as CN3,
    case
        when length(B.COLUMN_NAME) - length(replace(B.COLUMN_NAME, '_', '')) + 1 >= 4 then 
                SUBSTRING_INDEX(SUBSTRING_INDEX(LCASE(B.COLUMN_NAME), '_', 4), '_', -1)
        else ' '
    end as CN4,
    case
        when length(B.COLUMN_NAME) - length(replace(B.COLUMN_NAME, '_', '')) + 1 >= 5 then 
                SUBSTRING_INDEX(SUBSTRING_INDEX(LCASE(B.COLUMN_NAME), '_', 5), '_', -1)
        else ' '
    end as CN5,
    B.DATA_TYPE,
    B.COLUMN_COMMENT
from
    information_schema.TABLES A
inner join information_schema.COLUMNS B on
    (A.TABLE_NAME = B.TABLE_NAME)
where
    A.TABLE_SCHEMA = '${process.env.DB_NAME}'
) A
group by
TABLE_NAME
order by
table_name`;

exports.generator = (
  camelCaseTableName,
  columns
) => `import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
          
@Entity()
export class ${camelCaseTableName}  {
${columns}
}`;
