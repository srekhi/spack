import * as APIUtil from '../util/channel_api_util';

export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL'; //add channel to state;
export const RECEIVE_CHANNEL_ERRORS = 'RECEIVE_CHANNEL_ERRORS'; //errors for channel creation
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS'; //fetching all channels for user
export const DELETE_CHANNEL = 'DELETE_CHANNEL'; //fetching all channels for user


export const receiveChannel = channel => ({
  type: RECEIVE_CHANNEL,
  channel
});

export const receiveChannelErrors = errors => ({
  type: RECEIVE_CHANNEL_ERRORS,
  errors
});

export const createChannel = channel => dispatch => (
  APIUtil.createChannel(channel).then(createdChannel => (
    dispatch(receiveChannel(createdChannel))
  ), err => (
    dispatch(receiveChannelErrors(err.responseJSON))
  ))
);

export const receiveChannels = channels => ({
  type: RECEIVE_CHANNELS,
  channels
});

export const fetchChannels = userId => dispatch => (
  APIUtil.fetchChannelsForUser(userId).then(channels => (
    dispatch(receiveChannels(channels))
  ))
);

export const deleteChannel = channelId => dispatch => ({
    type: DELETE_CHANNEL,
    channelId
});

export const removeChannel = channelId => dispatch => (
  APIUtil.deleteChannel(channelId).then(deletedChannelId => (
    dispatch(deleteChannel(deletedChannelId))
  ))
);