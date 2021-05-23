import { constants } from "../../_shared/constants";

export default class RoomController {
  constructor({ roomInfo, socketBuilder }) {
    this.roomInfo = roomInfo;
    this.socketBuilder = socketBuilder;

    this.socket = {};
  }

  static async initialize(dependencies) {
    return new RoomController(dependencies).initialize();
  }

  async _initialize() {
    this.socket = this._setupSocket();
    this.socket.emit(constants.events.JOIN_ROOM, this.roomInfo);
  }

  _setupSocket() {
    return this.socketBuilder
      .setOnUserConnected(this.onUserConnected())
      .setOnUserDisconnected(this.onUserDisconnected())
      .setOnRoomUpdated(this.onRoomUpdated())
      .build();
  }

  onRoomUpdated() {
    return (room) => console.log('room list!', room);
  }

  onUserDisconnected() {
    return (user) => console.log('user disconnected!', user);
  }

  onUserConnected() {
    return (user) => console.log('user connected!', user);
  }
}