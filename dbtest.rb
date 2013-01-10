require "sqlite3"


db = SQLite3::Database.open "db/data.db"
puts db.get_first_value 'SELECT SQLITE_VERSION()'


db.execute "CREATE TABLE IF NOT EXISTS Cars(Id INTEGER PRIMARY KEY, 
        Name TEXT, Price INT)"
    db.execute "INSERT INTO Cars VALUES(1,'Audi',52642)"
    db.execute "INSERT INTO Cars VALUES(2,'Mercedes',57127)"
    db.execute "INSERT INTO Cars VALUES(3,'Skoda',9000)"
    db.execute "INSERT INTO Cars VALUES(4,'Volvo',29000)"


