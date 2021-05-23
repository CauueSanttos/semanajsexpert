import { constants } from "../../_shared/constants.js";

export default class RoomController {
  constructor({ roomInfo, socketBuilder, view }) {
    this.roomInfo = roomInfo;
    this.socketBuilder = socketBuilder;
    this.view = view;

    this.socket = {};
  }

  static async initialize(dependencies) {
    return new RoomController(dependencies)._initialize();
  }

  async _initialize() {
    this._setupViewEvents();
    this.socket = this._setupSocket();

    this.socket.emit(constants.events.JOIN_ROOM, this.roomInfo);
  }

  _setupViewEvents() {
    this.view.updateUserImage(this.roomInfo.user);
    this.view.updateRoomTopic(this.roomInfo.room);
  }

  _setupSocket() {
    return this.socketBuilder
      .setOnUserConnected(this.onUserConnected())
      .setOnUserDisconnected(this.onUserDisconnected())
      .setOnRoomUpdated(this.onRoomUpdated())
      .build();
  }

  onRoomUpdated() {
    return (room) => {
      console.log('room list!', room);

      this.view.updateAttendeesOnGrid(room);
    };
  }

  onUserDisconnected() {
    return (user) => console.log('user disconnected!', user);
  }

  onUserConnected() {
    return (user) => {
      console.log('user connected!', user);

      this.view.addAttendeeOnGrid(user);
    };
  }
}