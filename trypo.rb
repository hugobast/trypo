require 'base64'

FONTS = Dir.glob('fonts/*').map do |file|
  CheapRedWine.meta file 
end

class Trypo < Sinatra::Base
  get '/' do
    erb :index
  end

  get '/fonts' do
    content_type :json
    FONTS.map do |font|
      { family: font.family, style: font.style, src: "" }
    end.to_json
  end

  get '/features' do
    content_type :json
    FONTS.first.features.map do |feature|
      { tag: feature } 
    end.to_json
  end

  post '/images' do
    content_type :json
    params = JSON.parse request.body.read
    images = FONTS.map do |font|
      features = params['features'].map { |f| f['tag'] }
      image = CheapRedWine.image font,
        params['text'],
        size: params['size'].to_i,
        color: params['color'],
        features: features
      data = { family: font.family, style: font.style, src: "data:image/png;base64,#{Base64.encode64(image.read)}" }
      image.close
      data
    end
    images.to_json
  end
end
