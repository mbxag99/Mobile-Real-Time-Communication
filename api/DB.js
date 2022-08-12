import loki from "lokijs";
var roomsDB = new loki("rooms.db");
var rooms = roomsDB.addCollection("rooms");

export const get_all_rooms = async (req, res) => {
  try {
    const All = await rooms.find();
    res.status(200).json(All);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const create_new_room = async (req, res) => {
  const roomInfo = req.body;
  try {
    const ID = uuid();
    await rooms.insert({ ...roomInfo, ID: ID });
    res.status(201).json(ID);
  } catch (error) {
    res.status(410).json({ message: error });
  }
};

export const increase_user_count_to_room = async (req, res) => {
  const { roomID } = req.body;
  try {
    var ROOM = rooms.findOne({ ID: roomID });
    ROOM.numParticipants += 1;
    rooms.update(ROOM);
    res.status(201).json("");
  } catch (error) {
    res.status(410).json({ message: error });
  }
};

export const decrease_user_count_to_room = async (req, res) => {
  const { roomID } = req.body;
  try {
    var ROOM = rooms.findOne({ ID: roomID });
    ROOM.numParticipants -= 1;
    rooms.update(ROOM);
    res.status(201).json("");
  } catch (error) {
    res.status(410).json({ message: error });
  }
};

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
