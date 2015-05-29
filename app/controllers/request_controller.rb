class RequestController < ApplicationController
  before_action :authenticate_user!

  #post request seeker/employee
  #cancel request

  def match_request
    Feed.create(params[:feed])
    render json: {message: 'OK'}, status: 200
  end

  def cancel
    Feed.find(params[:feed][:id]).cancel
  end

end
