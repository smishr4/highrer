class UserProfileController < ApplicationController
  before_action :authenticate_user!



  def show
    render json: current_user, status: 200
  end

  #show other user's profile by id

  def show_other
    render json: User.find(params[:id]).to_hash, status: 200
  end

  def update
    current_user.update_attributes(params[:user])
    render json: {message: 'OK'}, status: 200
  end

end
