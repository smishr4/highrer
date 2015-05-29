class CreateFeeds < ActiveRecord::Migration
  def change
    create_table :feeds do |t|
      t.integer :sender_id
      t.integer :receiver_id
      t.integer :type
      t.string :message
      t.boolean :status

      t.timestamps null: false
    end
  end
end
