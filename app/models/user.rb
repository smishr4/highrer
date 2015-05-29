class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  ##For updating user details


  has_many :feeds, class_name: 'Feed'
  has_and_belongs_to_many :skillsets, :class_name => 'Skillset', :join_table => 'users_skillsets'
  def update_omniauth(omniauth)
    token = omniauth['credentials']['token']
    self.provider = omniauth['provider']
    self.uid = omniauth['uid']
    self.token = token
    #self.secret = omniauth['credentials']['secret']
    self.first_name = omniauth['info']['first_name'] if omniauth['info']['first_name']!=nil
    self.last_name = omniauth['info']['last_name'] if omniauth['info']['last_name']!=nil
    self.profile_picture_url = omniauth['info']['image']+"?type=large" if omniauth['info']['image']!=nil
  end

  def self.find_for_google_oauth2(access_token, signed_in_resource=nil)
    data = access_token.info
    user = User.where(:email => data["email"].downcase).first

    if user.blank?
      user = User.create(:token=> access_token['credentials']['token'],:uid=>access_token['uid'],profile_picture_url: data['image'], first_name: data["first_name"], last_name: data["last_name"], email: data["email"].downcase,password: Devise.friendly_token[0,20])
    else
      user = google_omniauth(access_token,user)
    end
    user
  end

  def self.google_omniauth(access_token,user)
    data = access_token.info
    user.token=access_token['credentials']['token']
    user.uid=access_token['uid']
    user.profile_picture_url= data['image']
    user.first_name=data["first_name"]
    user.last_name=data["last_name"]
    user.save
    user
  end

  ##For creating user
  def self.create_user(omniauth)
    user = User.new
    token = omniauth['credentials']['token']
    user.email = omniauth['info']['email']
    user.provider = omniauth['provider']
    user.uid = omniauth['uid']
    user.token = token
    user.password = Devise.friendly_token[0,20]
    #user.secret = omniauth['credentials']['secret']
    user.first_name = omniauth['info']['first_name'] if omniauth['info']['first_name']!=nil
    user.last_name = omniauth['info']['last_name'] if omniauth['info']['last_name']!=nil
    user.profile_picture_url = omniauth['info']['image'] if omniauth['info']['image']!=nil
    user.save
    return user
  end

  ##For destroying token, need to be called for facebook deauthorize callback
  def destroy_token
    self.token=nil
    self.save
  end

  def name
    res = self.first_name.to_s + " " + self.last_name.to_s
    res.strip!
    if res.blank?
      res = self.email
    end
    res
  end

  def myfacebook(oauth_token)
    @facebook ||= Koala::Facebook::API.new(oauth_token)
  end

  def to_small_hash
    {
      skillsets: self.skillsets,
      id: self.id,
    }
  end

  def to_hash
    {
      skillsets: self.skillsets,
      id: self.id,
      email: self.email,
      first_name: self.first_name,
      last_name: self.last_name,
      profile_picture_url: self.profile_picture_url,
    }
  end

  def friends
    where(:uid => :friend_ids)
  end

  #habtm educations, work_experiences, skillsets

  # accepts_nested_attributes_for all of them.

end
