class Feed < ActiveRecord::Base


  #fields sender_id, receiver_id, message, status

  belongs_to :user, :class_name => 'User', :foreign_key => 'receiver_id'
  # def sender
  #   User.find(self.sender_id)
  # end

  # def receiver
  #   User.find(self.receiver_id)
  # end

  # def cancel
  #   self.status = Enums::CANCELLED
  #   self.save
  # end
end
