require "sqlite3"


db = SQLite3::Database.open "db/data.db"
puts db.get_first_value 'SELECT SQLITE_VERSION()'


	db.execute "CREATE TABLE IF NOT EXISTS Images(Id INTEGER PRIMARY KEY, 
        Name TEXT, Disc TEXT, link TEXT)"
    #db.execute "INSERT INTO Images VALUES(1,'Tapeta1','Taka sobie tapeta','img/1.jpg')"
    #db.execute "INSERT INTO Images VALUES(2,'Tapeta2','Boska tapeta','img/2.jpg')"
  
  	response = db.execute "SELECT * from Images"

  	puts response.join "\s "
