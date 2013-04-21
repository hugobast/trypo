class Trypo < Sinatra::Base
  get '/' do
    erb :index
  end
end
