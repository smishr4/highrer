# use elastic search for search filter

class SearchController < ApplicationController

  def search_users
    #params filters -> skillset
    render json: Skillset.where(:name => params[:name]).first.users + Education.where(:degree => params[:degree]).first.users
  end


end
