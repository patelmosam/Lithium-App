import * as SQLite from 'expo-sqlite';

export function InitDB() {
  const db = SQLite.openDatabase('database3.db')
  db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, surname TEXT, phone_no INTEGER, gander TEXT, discription TEXT)'
        )
  })
}

export function fetchData() {
  
  const db = SQLite.openDatabase('database3.db')
  let results;
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM Contacts', null, 
          (txObj, { rows: { _array } }) =>  results = _array  ,
          (txObj, error) => console.log('Error ', error)
          ) 
    })
  console.log('fatch ', results);
  return results;
}

export function InsertData(contact) {
  const db = SQLite.openDatabase('database3.db')
  db.transaction(tx => {
    tx.executeSql('INSERT INTO Contacts (name, surname, phone_no, gander, discription) values (?, ?, ?, ?, ?)', 
    [contact.name, contact.surname, contact.phone_no, contact.gander, contact.discription],
      (txObj, resultSet) => console.log('Data Added'),
      (txObj, error) => console.log('Error', error))
  })
}

export function DeleteData(id) {
  const db = SQLite.openDatabase('database3.db')
    db.transaction(tx => {
        tx.executeSql('DELETE FROM Contacts WHERE id = ? ', [id],
          (txObj, resultSet) => {
            console.log('deleted contact, id: ', id)
        })
    })
}

export function updateData(contact){
  const db = SQLite.openDatabase('database3.db')
  db.transaction(tx => {
    tx.executeSql('UPDATE Contacts SET name = ?, surname= ?, phone_no = ?, gander = ?, discription = ? WHERE id = ?', 
    [contact.id, contact.name, contact.surname, contact.phone_no, contact.gander, contact.discription],
      (txObj, resultSet) => {
        console.log('Data Updated, id: ', );
      })
  })
}