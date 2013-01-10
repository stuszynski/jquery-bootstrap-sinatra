require "sinatra"
require "erb"
require "mysql"


# obrazek [id, nazwa, opis, adres linku, adres miniaturki]
configure do
	@db = Mysql.new(#credentials)
	enable :sessions
end

get '/' do
	erb :index
end

get '/photo/:id' do 

	id = :id
	@img = @db.query("SELECT * where id=#{id}")
	
	erb :photo # a moze zapodaj jsonem? i zmontujmy to w js?
end

