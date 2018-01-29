package com.boardroomproject.controller;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.boardroomproject.model.Room;
import com.boardroomproject.services.RoomService;

@RestController
@RequestMapping("/room")
public class RoomController {

	static Logger logger = Logger.getLogger(RoomController.class.getName());

	@Autowired
	RoomService roomService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void createRoom(@RequestBody Room room) {
		logger.info("Callinf service for creating a room");
		roomService.createRoom(room);
	}

	@RequestMapping(value = "/{rId}", method = RequestMethod.DELETE)
	public ResponseEntity<Integer> deleteRoom(@PathVariable("rId") int rId) {
		logger.info("Callinf service for deleting a room");
		roomService.deleteRoom(rId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@RequestMapping(value = "/{lId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Room> getRoomByLocation(@PathVariable("lId") int lId) {
		logger.info("Callinf service for getting rooms");
		return roomService.getRoomByLocation(lId);

	}

	@RequestMapping(value = "roomId/{rId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Room getRoomById(@PathVariable("rId") int rId) {
		return roomService.getRoomById(rId);
	}
}
