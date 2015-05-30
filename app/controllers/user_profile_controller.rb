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
    current_user.skillsets.delete_all
    params[:names].each{|name|
      current_user.skillsets.create(:name => name)
    }
    current_user.user_type = params[:user][:type].to_i
    if current_user.save
      render json: {message: 'OK'}, status: 200
    else
      render json: {message: current_user.errors.join(', ')}, status: 400
    end
  end

end
