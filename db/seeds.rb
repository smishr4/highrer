# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Skillset.create(:name => 'c++')
Skillset.create(:name => 'frontend')
Skillset.create(:name => 'backend')
Skillset.create(:name => 'full stack')

ActiveRecord::Base.connection.execute("INSERT INTO users_skillsets (user_id, skillset_id) VALUES (1, 1);");
