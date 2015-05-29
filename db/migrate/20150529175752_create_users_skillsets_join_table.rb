class CreateUsersSkillsetsJoinTable < ActiveRecord::Migration
  def change
    create_table :users_skillsets, :id => false do |t|
      t.integer :user_id
      t.integer :skillset_id
      t.float :ratings
    end
  end
end
