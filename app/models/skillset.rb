class Skillset < ActiveRecord::Base

  has_and_belongs_to_many :users, :class_name => 'User', :join_table => 'users_skillsets'
end
