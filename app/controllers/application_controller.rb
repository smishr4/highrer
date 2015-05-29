class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # def after_sign_in_path_for(resource)
  #   logger.info "gggggggggggggg#{session[:check_url]}"
  #   logger.info "hhhhhhhhhhhhhhh#{current_user.inspect}"

  #   result=current_user.myfacebook(current_user.oauth_token).get_connections("me","friends",:fields=>"id")
  #   friends_array=Hash[result.map(&:values).map(&:flatten)].keys
  #   # User.update(current_user.id, :friendlist => friends_array)

  #   # session[:check_url] || root_path # <- Path you want to redirect the user to.
  # end
end
