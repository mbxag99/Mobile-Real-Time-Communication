import express from "express";
import {
  get_all_rooms,
  create_new_room,
  increase_user_count_to_room,
  decrease_user_count_to_room,
} from "./DB.js";

const router = express.Router();
//http://localhost:3001/rooms/get_all_rooms
router.get("/get_all_rooms", get_all_rooms);

//http://localhost:3001/rooms/create_room
router.post("/create_new_room", create_new_room);

//http://localhost:3001/rooms/user_joined_room
router.patch("/user_joined_room", increase_user_count_to_room);

//http://localhost:3001/rooms/user_quit_room
router.patch("/user_quit_room", decrease_user_count_to_room);

export default router;
