class AddFriendIdsToUser < ActiveRecord::Migration
  def change
    add_column :users, :friend_ids, :text
  end
end
