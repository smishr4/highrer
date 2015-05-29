class FeedController < ApplicationController
  before_filter :find_feed

  before_action :authenticate_user!



  private
  def find_feed
    @feed = Feed.find(params[:id]) if params[:id]
  end


  def show
    render json: @feed, status: 200
  end

  def paginate
    params[:page][:type] = params[:page][:type].to_i
    render json: Feed.paginate(:page => params[:page], :per_page => 5), status: 200
  end
  #show
  # pagination api call
end
