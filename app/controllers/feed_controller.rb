class FeedController < ApplicationController
  before_filter :find_feed



  private
  def find_feed
    @feed = Feed.find(params[:id]) if params[:id]
  end


  def show
    render json: @feed
  end

  def paginate
    render json: Feed.paginate(:page => params[:page], :per_page => 5), status: 200
  end
  #show
  # pagination api call
end
