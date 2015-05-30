# use elastic search for search filter

class SearchController < ApplicationController
  before_action :authenticate_user!

  def search_users
    #params filters -> skillset
    render json: current_user.friends(params[:name]), status: 200
  end

  def get_tags
    render json: Skillset.pluck(:name), status: 200
  end




end
