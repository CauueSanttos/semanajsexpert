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

  static addAttendeeOnGrid(item, removeFirst = false) {
    const attendee = new Attendee(item);
    const { id } = attendee;

    const htmlTemplate = getTemplate(attendee);
    const baseElement = attendee.isSpeaker ? gridSpeakers : gridAttendees;

    if (removeFirst) {
      View.removeItemFromGrid(id);
      
      baseElement.innerHTML += htmlTemplate;

      return;
    }

    const existingItem = View._getExistingItemOnGrid({ id, baseElement });
    if (existingItem) {
      existingItem.innerHTML = htmlTemplate;

      return;
    }

    baseElement.innerHTML += htmlTemplate;
  }

  static removeItemFromGrid(id) {
    const existingElement = View._getExistingItemOnGrid({ id });
    existingElement?.remove();
  }

  static _getExistingItemOnGrid({ id, baseElement = document }) {
    return baseElement.querySelector(`[id="${id}"]`);
  }
}