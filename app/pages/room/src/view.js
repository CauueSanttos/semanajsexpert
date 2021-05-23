import Attendee from "./entities/attendee.js";
import getTemplate from './templates/attendeeTemplate.js';

const imgUser = document.querySelector('#imgUser');
const roomTopic = document.querySelector('#pTopic');
const gridAttendees = document.querySelector('#gridAttendees');
const gridSpeakers = document.querySelector('#gridSpeakers');

export default class View {
  static updateUserImage({ img, username }) {
    imgUser.src = img;
    imgUser.alt = username;
  }

  static updateRoomTopic({ topic }) {
    roomTopic.innerHTML = topic;
  }

  static updateAttendeesOnGrid(users) {
    users.forEach(item => View.addAttendeeOnGrid(item));
  }

  static addAttendeeOnGrid(item) {
    const attendee = new Attendee(item);

    const htmlTemplate = getTemplate(attendee);
    const baseElement = attendee.isSpeaker ? gridSpeakers : gridAttendees;

    baseElement.innerHTML += htmlTemplate;
  }
}