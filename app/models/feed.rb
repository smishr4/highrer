class Feed < ActiveRecord::Base


  #fields sender_id, receiver_id, message, status


  def sender
    User.find(self.sender_id)
  end

  def receiver
    User.find(self.receiver_id)
  end
end
