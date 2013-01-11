require "sinatra"
require "erb"
require "sqlite3"

set :public_folder, Proc.new { File.join(root, "assets") }

# obrazek [id, nazwa, opis, adres linku, adres miniaturki]
configure do
	#@db = Mysql.new(#credentials)
	#enable :sessions
end

get '/' do
	erb :index2
end


get '/photo/:id' do 

#	id = :id
#	@img = @db.query("SELECT * where id=#{id}")
	
#	erb :photo # a moze zapodaj jsonem? i zmontujmy to w js?
end

