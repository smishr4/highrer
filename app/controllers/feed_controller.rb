class FeedController < ApplicationController
  before_filter :find_model



  private
  def find_model
    @feed = Feed.find(params[:id]) if params[:id]
  end


  def show
  end

  def paginate
  end
  #show
  # pagination api call
end
