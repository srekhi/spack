# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  avatar_url      :string
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  attr_reader :password
  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true

  DEFAULT_URLS = [
    "https://res.cloudinary.com/dbbzpmyvc/image/upload/c_scale,w_38/v1494989557/default_logo1_msxm8z.png",
    "https://res.cloudinary.com/dbbzpmyvc/image/upload/c_scale,w_38/v1494989557/Screen_Shot_2017-05-16_at_7.51.53_PM_hzckom.png",
    "https://res.cloudinary.com/dbbzpmyvc/image/upload/c_scale,w_38/v1494989557/Screen_Shot_2017-05-16_at_7.51.53_PM_hzckom.png",
    "https://res.cloudinary.com/dbbzpmyvc/image/upload/c_scale,w_38/v1494989557/Screen_Shot_2017-05-16_at_7.51.04_PM_te3gr9.png",
    "https://res.cloudinary.com/dbbzpmyvc/image/upload/c_scale,w_38/v1494989557/Screen_Shot_2017-05-16_at_7.51.33_PM_yyhcbn.png",
  ]
  validates :password, length: { minimum: 6, allow_nil: true }
  has_many :memberships
  has_many :channels, through: :memberships
  has_many :messages
  has_many :emoticons
  has_many :notifications

  after_initialize :ensure_session_token, :ensure_avatar_url

  def self.find_by_credentials(username, password)
    u = User.find_by(username: username)
    return u if u && u.is_password?(password)
    nil
  end

  def ensure_avatar_url
    self.avatar_url ||= DEFAULT_URLS.sample
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def generate_session_token
    SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save
  end
end
