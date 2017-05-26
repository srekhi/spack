# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  channel_id :integer          not null
#  content    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  chat_time  :string
#

class Message < ApplicationRecord
  # need to add an after create hook so that when message is created, it is
  # sent to the appropriate subscriberes.

  after_commit :broadcast_message


  # after_initialize :set_formatted_time
  # after_commit { MessageBroadcastJob.perform_later(self, self.channel) }
  validates :user_id, :channel_id, :content, presence: true
  belongs_to :user
  belongs_to :channel
  has_many :emoticons
  #
  # def format_created_at
  #   self.created_at = self.created_at.localtime.strftime("%I:%M %p")
  # end

  def set_formatted_time
    self.chat_time = Time.now.localtime.strftime("%I:%M %p")
  end

  def broadcast_message
    message_author = self.user
    # users = channel.users
    MessageBroadcastJob.perform_later(self, self.channel_id, message_author)
    NotificationBroadcastJob.perform_later(self.channel_id, message_author)
  end
    # users.each do |user|
      # NotificationBroadcastJob.perform_later()
    #   next if user.id == message_author.id
    #   notification = Notification.create(user_id: user.id, channel_id: channel.id)
    #   user_id = user.id
    #   notification = Api::NotificationsController.render(
    #       partial: 'api/notifications/notification',
    #       locals: { notification: notification, user_id: user_id, channel_id: channel.id }
    #       )
    #   ActionCable.server.broadcast("new_channel_#{user_id}",
    #       notification: JSON.parse(notification))
    #   end
    # NotificationBroadcastJob.perform_later(channel, user)
  # end
end
