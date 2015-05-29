class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def facebook
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.where(:email => request.env["omniauth.auth"]['info']['email']).first
    if @user.blank?
      @user = User.create_user(request.env["omniauth.auth"])
    else
      @user.update_omniauth(request.env["omniauth.auth"])
    end

    result=@user.myfacebook(@user.token).get_connections("me","friends",:fields=>"id")
    friends_array=Hash[result.map(&:values).map(&:flatten)].keys.join(',')
    User.update(@user.id, :friend_ids => friends_array)


    sign_in @user
    set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
    # render json: {message: 'OK', user: @user}, status: 200

    redirect_to "/?session=#{authenticity_token}"
  end

  def authenticity_token
    if current_user
      form_authenticity_token
    end
  end

  def google_oauth2
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.find_for_google_oauth2(request.env["omniauth.auth"], current_user)

    if @user.persisted?
      flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Google"
      sign_in @user
      redirect_to "/"
    else
      session["devise.google_data"] = request.env["omniauth.auth"]
      redirect_to "/"
    end
  end

  def failure
    if request.env['REQUEST_PATH']=~/google/
      redirect_to "/", :alert=>'Google authentication was not successful.'
    else
      redirect_to "/", :alert=>'FaceBook authentication was not successful.'
    end
  end
end
