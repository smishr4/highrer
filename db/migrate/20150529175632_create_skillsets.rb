class CreateSkillsets < ActiveRecord::Migration
  def change
    create_table :skillsets do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
