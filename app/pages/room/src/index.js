import { constants } from '../../_shared/constants.js';
import SocketBuilder from '../../_shared/socketBuilder.js'

const socketBuilder = new SocketBuilder({
  socketUrl: constants.socketUrl,
  namespace: constants.socketNamespaces.room,
});

const socket = socketBuilder
  .setOnUserConnected((user) => console.log('User connected!', user))
  .setOnUserDisconnected((user) => console.log('User disconnected!', user))
  .build();

const room = {
  id: Date.now(),
  topic: 'JS Expert'
};

const user = {
  img: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/bear_russian_animal_avatar-512.png',
  username: 'Cauê Santos'
};

socket.emit(constants.events.JOIN_ROOM, { user, room });