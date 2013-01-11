require "sinatra"
require "erb"
require "sqlite3"

set :public_folder, Proc.new { File.join(root, "assets") }
@db = SQLite3::Database.open "db/data.db"
# obrazek [id, nazwa, opis, adres linku, adres miniaturki]
configure do
	
	#enable :sessions
	@db.execute "CREATE TABLE IF NOT EXISTS Images(Id INTEGER PRIMARY KEY, 
        Name TEXT, Disc TEXT, link TEXT)"
   
end

get '/' do
	@images = @db.execute "SELECT * from Images"
	erb :index2
end


get '/photo/:id' do 

#	id = :id
#	@img = @db.query("SELECT * where id=#{id}")
	
#	erb :photo # a moze zapodaj jsonem? i zmontujmy to w js?
end

