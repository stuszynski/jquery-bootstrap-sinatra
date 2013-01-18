require "sinatra"
require "erb"
require "sqlite3"
require 'json'

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
	db_connect
	@db.execute "CREATE TABLE IF NOT EXISTS Images(Id INTEGER PRIMARY KEY, Name TEXT, Disc TEXT, link TEXT)"
end

before do
	enable :sessions
end

get '/'  do
	db_connect

	session['counter'] ||=0
	session['counter'] += 1

	@images = @db.execute "SELECT * from Images LIMIT 5"
	erb :index
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
   	#"To nie jest ajax!"
   	redirect '/'
   end
end

get '/last' do
	db_connect
	@images = @db.execute "SELECT * from Images"
	id = @db.last_insert_row_id
	"The last id of the inserted row is #{id}"
end

get '/api/:id' do
	content_type :json

	@images

	db_connect

	if params[:id] == 'all'
		@images = @db.execute "SELECT * from Images"
		@images.to_json
	elsif params[:id] == 'last'
		@images = @db.execute "SELECT * from Images"
		@images.last.to_json
	elsif params[:id] != nil
		@images = @db.execute "SELECT * from Images WHERE Id='#{params[:id]}'"
		@images = @images.nil? ? @images : { :error => 'Nie ma takiego obrazka' }
		@images.to_json
	else
		{ :error => 'Nie ma takiego obrazka' }.to_json
	end
end