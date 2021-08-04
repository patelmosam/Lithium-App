import * as SQLite from 'expo-sqlite';

export function InitDB(quary) {
  const db = SQLite.openDatabase('database3.db')
  db.transaction(tx => {
        tx.executeSql(quary)
  })
}

export function InitTable(table, fields){
  let quary_str = `CREATE TABLE IF NOT EXISTS ${table} `;

  let field_str = "(id INTEGER PRIMARY KEY AUTOINCREMENT, ";
  for (let key in fields){
    let temp = key +' '+ fields[key] +', ';
    field_str += temp;
  }
  field_str = field_str.substring(0, field_str.length - 2);
  field_str += ')'

  let quary = quary_str + field_str;
  console.log(quary);

  const db = SQLite.openDatabase('database3.db')
  db.transaction(tx => {
        tx.executeSql(quary)
  })
}


export function InsertInfo(data) {
  const db = SQLite.openDatabase('database3.db')
  const schema = JSON.stringify(data.schema);
  // console.log(data[1], fields_data);
  db.transaction(tx => {
    tx.executeSql('INSERT INTO TablesInfo (name, schema) values (?, ?)', 
    [data.name, schema],
      (txObj, resultSet) => console.log('Data Added'),
      (txObj, error) => console.log('Error', error))
  })
}

// function getData(table) {
//   const db = SQLite.openDatabase('database3.db')
//   db.transaction(tx => {
//     tx.executeSql(`SELECT  FROM ${table}`, null, 
//       (txObj, { rows: { _array } }) =>  console.log(_array) ,
//       (txObj, error) => console.log('Error ', error)
//       ) 
//   })
// }

export function InsertData(table, data) {

  let quary_str = `INSERT INTO ${table} `; //values (`;;

  const results = Object.keys(data).map((key) => data[key]);
  const coloums = Object.keys(data);
  quary_str += '('
  coloums.map((key) => quary_str += key + ',');
  quary_str = quary_str.substring(0, quary_str.length-1) + ') values (';
  results.map(() => quary_str += ' ?,');
  quary_str = quary_str.substring(0, quary_str.length-1) + ')';
  console.log(quary_str);

  const db = SQLite.openDatabase('database3.db') 
  db.transaction(tx => {
    tx.executeSql(quary_str, results,
      (txObj, resultSet) => console.log('Data Added'),
      (txObj, error) => console.log('Error', error))
  })
}

export function DeleteData(table, id) {
  const db = SQLite.openDatabase('database3.db')
    db.transaction(tx => {
        tx.executeSql(`DELETE FROM ${table} WHERE id = ? `, [id],
          (txObj, resultSet) => {
            console.log('deleted contact, id: ', id)
        })
    })
}

export function updateData(table, data){
  let quary_str = `UPDATE ${table} SET `;;
  // 'UPDATE Contacts SET name = ?, surname= ?, phone_no = ?, gander = ?, discription = ? WHERE id = ?'
  const results = Object.keys(data).map((key) => data[key]);
  const coloums = Object.keys(data).map((key) => key);
  coloums.map((col) => quary_str += col + ' = ?, ');
  quary_str = quary_str.substring(0, quary_str.length-2) + ' WHERE id = ';
  quary_str += data.id.toString();

  console.log(quary_str);
  console.log(results);
  const db = SQLite.openDatabase('database3.db')
  db.transaction(tx => {
    tx.executeSql(quary_str, results,
      (txObj, resultSet) => {
        console.log('Data Updated, id: ', data.id);
      })
  })
}