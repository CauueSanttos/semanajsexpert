import { constants } from "../../_shared/constants.js";
import LobbyController from "./controller.js";
import LobbySocketBuilder from "./util/lobbySocket.js";
import View from "./view.js";

const user = {
  img: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/bear_russian_animal_avatar-512.png',
  username: 'Cauê Santos ' + Date.now()
};

const socketBuilder = new LobbySocketBuilder({
  socketUrl: constants.socketUrl,
  namespace: constants.socketNamespaces.lobby
});

const dependencies = {
  socketBuilder,
  user,
  view: View
}

LobbyController.initialize(dependencies);