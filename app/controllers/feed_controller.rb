class FeedController < ApplicationController
  before_filter :find_feed

  before_action :authenticate_user!

  private
  def find_feed
    @feed = Feed.find(params[:id]) if params[:id]
  end

  def index
    render json: Feed.where(receiver_id: current_user.id), status: 200
  end

  def show
    render json: @feed, status: 200
  end

end
