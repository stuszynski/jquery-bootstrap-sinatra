require "sinatra"
require "erb"
require "sqlite3"

def db_connect
	@db = SQLite3::Database.open "db/data.db"
	@db.results_as_hash = true
end

def db_disconnect
	@db.close if @db
end

set :public_folder, Proc.new { File.join(root, "assets") }

# obrazek [id, nazwa, opis, adres linku, adres miniaturki]
configure do	
	#enable :sessions
	#@db.execute "CREATE TABLE IF NOT EXISTS Images(Id INTEGER PRIMARY KEY, Name TEXT, Disc TEXT, link TEXT)"
    
end




get '/'  do
	db_connect
	@images = @db.execute "SELECT * from Images"
	erb :index
	#db_disconnect
end


get '/photo/:id' do 

#	id = :id
#	@img = @db.query("SELECT * where id=#{id}")
	
#	erb :photo # a moze zapodaj jsonem? i zmontujmy to w js?
end


get '/upload' do
	erb :upload
end

get '/gallery' do

	if request.xhr? 
	db_connect
	@images = @db.execute "SELECT * from Images"
	erb :gallery 
	#db_disconnect
    else
    	"To nie jest ajax!"
	end
end

