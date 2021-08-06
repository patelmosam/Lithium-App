import * as SQLite from 'expo-sqlite';

export function InitDB(db_path, quary) {
  const db = SQLite.openDatabase(db_path)
  db.transaction(tx => {
        tx.executeSql(quary)
  })
}

export function InitTable(db_path, table, fields){
  let quary_str = `CREATE TABLE IF NOT EXISTS "${table}" `;

  let field_str = "(id INTEGER PRIMARY KEY AUTOINCREMENT, ";
  for (let key in fields){
    let temp = `'${key}' '${fields[key]}', `;
    field_str += temp;
  }
  field_str = field_str.substring(0, field_str.length - 2);
  field_str += ')'

  let quary = quary_str + field_str;
  console.log(quary);

  const db = SQLite.openDatabase(db_path)
  db.transaction(tx => {
        tx.executeSql(quary,[],
          (txObj, resultSet) => console.log('Table Created'),
          (txObj, error) => console.log('Error', error))
  })
}


export function InsertInfo(db_path, data) {
  const db = SQLite.openDatabase(db_path)
  const schema = JSON.stringify(data.schema);
  // console.log(data[1], fields_data);
  db.transaction(tx => {
    tx.executeSql('INSERT INTO TablesInfo (name, schema) values (?, ?)', 
    [data.name, schema],
      (txObj, resultSet) => console.log('Data Added'),
      (txObj, error) => console.log('Error', error))
  })
}

// function getData(db_path, table) {
//   const db = SQLite.openDatabase(db_path)
//   db.transaction(tx => {
//     tx.executeSql(`SELECT  FROM ${table}`, null, 
//       (txObj, { rows: { _array } }) =>  console.log(_array) ,
//       (txObj, error) => console.log('Error ', error)
//       ) 
//   })
// }

export function InsertData(db_path, table, data) {

  let quary_str = `INSERT INTO "${table}" `; //values (`;;

  const results = Object.keys(data).map((key) => data[key]);
  const coloums = Object.keys(data);
  quary_str += '('
  coloums.map((key) => quary_str += `'${key}',`);
  quary_str = quary_str.substring(0, quary_str.length-1) + ') values (';
  results.map(() => quary_str += ' ?,');
  quary_str = quary_str.substring(0, quary_str.length-1) + ')';
  console.log(quary_str);

  const db = SQLite.openDatabase(db_path) 
  db.transaction(tx => {
    tx.executeSql(quary_str, results,
      (txObj, resultSet) => console.log('Data Added'),
      (txObj, error) => console.log('Error', error))
  })
}

export function DeleteData(db_path, table, id) {
  const db = SQLite.openDatabase(db_path)
    db.transaction(tx => {
        tx.executeSql(`DELETE FROM "${table}" WHERE id = ? `, [id],
          (txObj, resultSet) => {
            console.log('deleted row, id: ', id)
        },
        (tx, error) => {
          console.log(error);
        })
    })
}

export function updateData(db_path, table, data){
  let quary_str = `UPDATE "${table}" SET `;;
  // 'UPDATE Contacts SET name = ?, surname= ?, phone_no = ?, gander = ?, discription = ? WHERE id = ?'
  const results = Object.keys(data).map((key) => data[key]);
  const coloums = Object.keys(data).map((key) => key);
  coloums.map((col) => quary_str += `'${col}' = ?, `);
  quary_str = quary_str.substring(0, quary_str.length-2) + ' WHERE id = ';
  quary_str += data.id.toString();

  console.log(db_path, quary_str);
  console.log(results);
  const db = SQLite.openDatabase(db_path)
  db.transaction(tx => {
    tx.executeSql(quary_str, results,
      (txObj, resultSet) => {
        console.log('Data Updated, id: ', data.id);
      })
  })
}

export function UpdateTable(db_path, table, new_table) {
  const db = SQLite.openDatabase(db_path);
  let quary_str = `ALTER TABLE "${table}" RENAME TO "${new_table}"`;
  db.transaction(tx => {
    tx.executeSql(quary_str,
      (txObj, resultSet) => {
        console.log('Table Update ');
      },
        (txObj, error) => console.log('Error', error))
      
  })
}


export function DeleteTable(db_path, table) {
  const quary = `DROP TABLE "${table}"`

  const db = SQLite.openDatabase(db_path);
  db.transaction(tx => {
    tx.executeSql(
      quary, [],
      (tx, results) => {
          console.log('table dropped')
      },
      (tx, error) => {
        console.log(error);
      }
    )
  });
  

}