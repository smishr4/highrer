class UserProfileController < ApplicationController


  before_filter :find_user

  private
  def find_user
    @user = User.find(params[:id]) if params[:id]
  end

  def update
    @user.update_attributes(params[:user])
    render json: {message: 'OK'}, status: 200
  end

end
