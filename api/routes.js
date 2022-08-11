import express from "express";
import { get_all_rooms, create_new_room } from "./DB.js";

const router = express.Router();
//http://localhost:3001/rooms/get_all_rooms
router.get("/get_all_rooms", get_all_rooms);

//http://localhost:3001/rooms/create_room
router.post("/create_new_room", create_new_room);

export default router;
