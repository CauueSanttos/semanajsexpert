import Room from './entities/room.js';
import getTemplate from './templates/lobbyItem.js';

const roomGrid = document.querySelector('#roomGrid');
const btnCreateRoomWithoutTopic = document.querySelector('#btnCreateRoomWithoutTopic');
const btnCreateRoomWithTopic = document.querySelector('#btnCreateRoomWithTopic');
const txtTopic = document.querySelector('#txtTopic');

export default class View {
  static configureCreateRoomButton() {
    btnCreateRoomWithoutTopic.addEventListener('click', () => {
      View.redirectToRoom();
    });
 
    btnCreateRoomWithTopic.addEventListener('click', () => {
      const topic = txtTopic.value;

      View.redirectToRoom(topic);
    });
  }

  static redirectToRoom(topic = '') {
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2);

    window.location = View.generateRoomLink({
      id, 
      topic
    });
  }

  static updateRoomList(rooms) {
    View.clearRoomList();
    
    rooms.forEach(room => {
      const params = new Room({
        ...room,
        roomLink: View.generateRoomLink(room)
      });

      const htmlTemplate = getTemplate(params);

      roomGrid.innerHTML += htmlTemplate;
    });
  }

  static clearRoomList() {
    roomGrid.innerHTML = '';
  }

  static generateRoomLink({ id, topic }) {
    console.log(topic);

    return `./../room/index.html?id=${id}&topic=${topic}`;
  }

  static updateUserImage({ img, username }) {
    imgUser.src = img;
    imgUser.alt = username;
  }
}