FONTS = Dir.glob('fonts/*').map do |file|
  Tipo.info file
end


class Trypo < Sinatra::Base
  get '/' do
    @fonts = FONTS
    erb :index
  end
end
