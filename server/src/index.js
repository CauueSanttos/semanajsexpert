import RoomsController from './controllers/roomsController.js';
import LobbyController from './controllers/lobbyController.js';
import SocketServer from './util/socket.js';
import Event from 'events';

import { constants } from './util/constants.js';

const port = process.env.PORT || 3333;
const socketServer = new SocketServer({ port });
const server = await socketServer.start();

const roomPubSub = new Event();

const roomsController = new RoomsController();
const lobbyController = new LobbyController({
  activeRooms: roomsController.rooms,
  roomListener: roomPubSub,
});

const namespaces = {
  room: {
    controller: roomsController,
    eventEmmiter: new Event()
  },
  lobby: {
    controller: lobbyController,
    eventEmmiter: roomPubSub,
  }
};

const routeConfig = Object.entries(namespaces)
  .map(([namespace, { controller, eventEmmiter }]) => {
    const controllerEvents = controller.getEvents();

    eventEmmiter.on(
      constants.events.USER_CONNECTED,
      controller.onNewConnection.bind(controller)
    );

    return {
      [namespace]: { events: controllerEvents, eventEmmiter }
    }
  });

socketServer.attachEvents({ routeConfig });

console.log('socket server is running at', server.address().port);