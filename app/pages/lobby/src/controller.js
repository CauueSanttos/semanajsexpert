import { constants } from "../../_shared/constants.js";

export default class LobbyController {
  constructor({ user, socketBuilder, view }) {
    this.user = user;
    this.socketBuilder = socketBuilder;
    this.view = view;

    this.socket = {};
  }

  static async initialize(dependencies) {
    return new LobbyController(dependencies)._initialize();
  }

  async _initialize() {
    this._setupViewEvents();
    this.socket = this._setupSocket();

    this.socket.emit(constants.events.JOIN_ROOM, this.roomInfo);
  }

  _setupViewEvents() {
    this.view.updateUserImage(this.user);
    this.view.configureCreateRoomButton();
  }

  _setupSocket() {
    return this.socketBuilder
      .setOnLobbyUpdated(this.onLobbyUpdated())
      .build();
  }

  onLobbyUpdated() {
    return (rooms) => {
      this.view.updateRoomList(rooms);
      console.log('room list!', rooms);
    };
  }
}