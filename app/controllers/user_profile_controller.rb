class UserProfileController < ApplicationController
  before_action :authenticate_user!

  def show
    render json: current_user, status: 200
  end

  #show other user's profile by id

  def show_other
    render json: User.find(params[:id]).to_hash.merge!({is_already_requested: !Feed.where(:sender_id => current_user.id, :receiver_id => params[:id]).blank?}), status: 200
  end

  def update
    debugger
    params[:user][:type] = params[:user][:type].to_i
    current_user.update_attributes(params[:user])
    render json: {message: 'OK'}, status: 200
  end

end
