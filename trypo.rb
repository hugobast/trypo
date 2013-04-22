FONTS = Dir.glob('fonts/*').map do |file|
  Tipo.info file
end


class Trypo < Sinatra::Base
  get '/' do
    erb :index
  end

  get '/fonts' do
    content_type :json
    FONTS.map do |font|
      { family: font.naming.family_name, style: font.naming.style }
    end.to_json
  end

  get '/features' do
    content_type :json
    FONTS.first.substitution.feature_list.map do |feature|
      { tag: feature.tag }
    end.to_json
  end

  post '/images' do
    content_type :json
    params = JSON.parse request.body.read
    params.to_json
  end
end
