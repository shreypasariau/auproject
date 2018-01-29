package com.boardroomproject.controller;

import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.boardroomproject.model.RequestRoom;
import com.boardroomproject.services.RequestRoomService;
import com.boardroomproject.services.RoomService;

@RestController
@RequestMapping("/request")
public class RequestRoomController {

	static Logger logger = Logger.getLogger(RequestRoomController.class.getName());

	@Autowired
	RequestRoomService requestRoomService;

	@Autowired
	RoomService roomService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public ResponseEntity<Void> createRequest(@RequestBody RequestRoom requestRoom) {

		if (roomService.getRoomAvaiblity(requestRoom)) {
			requestRoomService.createRequest(requestRoom);
			logger.info("Room is available and creating a new request");
			return new ResponseEntity<>(HttpStatus.CREATED);
		} else {
			logger.info("Room is not available at that time");
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
	}

	@RequestMapping(value = "/accept/{requestId}", method = RequestMethod.PUT)
	public void acceptRequest(@PathVariable("requestId") int requestId) {
		logger.info("Calling service for  aceepting a request");
		requestRoomService.acceptRequest(requestId);
	}

	@RequestMapping(value = "/reject/{requestId}", method = RequestMethod.PUT)
	public void rejectRequest(@PathVariable("requestId") int requestId) {
		logger.info("Calling service for rejecting a request");
		requestRoomService.rejectRequest(requestId);
	}

	@RequestMapping(value = "/{lId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<RequestRoom> getRequestByLocation(@PathVariable("lId") int lId) {
		logger.info("Calling service for getting request by location");
		return requestRoomService.getRequestByLocation(lId);

	}

	@RequestMapping(value = "user/{userId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<RequestRoom> getRequestByUserId(@PathVariable("userId") int userId) {
		logger.info("Calling service for getting request by Id");
		return requestRoomService.getRequestByUser(userId);
	}
}
