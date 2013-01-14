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
	db_connect
	@db.execute "CREATE TABLE IF NOT EXISTS Images(Id INTEGER PRIMARY KEY, Name TEXT, Disc TEXT, link TEXT)"
    
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

post '/upload' do
	db_connect
	path = 'img/' + params['image'][:filename]
	@db.execute "INSERT INTO Images VALUES( NULL,'#{params[:title]}','#{params[:opis]}','#{path}')"

	File.open('assets/img/' + params['image'][:filename],"w") do |f|
		f.write(params['image'][:tempfile].read())
	end
	return "Dodawanie udane!"


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

get '/file' do
  attachment "info.txt"
  "store it!"
end

get '/last' do
	db_connect
	@images = @db.execute "SELECT * from Images"
	id = @db.last_insert_row_id
    "The last id of the inserted row is #{id}"
end