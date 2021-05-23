import Attendee from "./entities/attendee.js";

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
      .setOnUserProfileUpgrade(this.onUserProfileUpgrade())
      .build();
  }

  onUserProfileUpgrade() {
    return (data) => {
      const attendee = new Attendee(data);
      console.log(`${attendee.username} upgrade to speaker!`);

      if (attendee.isSpeaker) {
        this.view.addAttendeeOnGrid(attendee, true);
      }
    }
  }

  onRoomUpdated() {
    return (room) => {
      console.log('room list!', room);

      this.view.updateAttendeesOnGrid(room);
    };
  }

  onUserDisconnected() {
    return (data) => {
      const attendee = new Attendee(data);
      console.log(`${attendee.username} disconnected!`);

      this.view.removeItemFromGrid(attendee.id);
    };
  }

  onUserConnected() {
    return (data) => {
      const attendee = new Attendee(data);
      console.log(`${attendee.username} connected!`);

      this.view.addAttendeeOnGrid(attendee);
    };
  }
}