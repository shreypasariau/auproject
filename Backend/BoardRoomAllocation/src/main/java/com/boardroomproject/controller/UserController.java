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

import com.boardroomproject.model.User;
import com.boardroomproject.services.UserService;

@RestController
@RequestMapping("/")
public class UserController {

	static Logger logger = Logger.getLogger(UserController.class.getName());

	@Autowired
	UserService userService;

	@RequestMapping(value = "user", method = RequestMethod.POST)
	public ResponseEntity<Void> createUser(@RequestBody User user) {
		logger.info("Checking if the user already exists");
		if (userService.isUserExist(user)) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}

		userService.saveUser(user);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@RequestMapping(value = "login", method = RequestMethod.POST)
	public ResponseEntity<User> loginValidate(@RequestBody User user) {
		User validatedUser = userService.validateUser(user);
		if (validatedUser != null)
			return new ResponseEntity<>(validatedUser, HttpStatus.OK);
		else
			return new ResponseEntity<>(validatedUser, HttpStatus.CONFLICT);

	}

	@RequestMapping(value = "/user/{userId}", method = RequestMethod.PUT)
	public ResponseEntity<User> updateUser(@PathVariable("userId") int userId, @RequestBody User user) {

		userService.updateUser(user);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@RequestMapping(value = "/user/{userId}", method = RequestMethod.DELETE)
	public ResponseEntity<User> deleteUser(@PathVariable("userId") int userId) {

		userService.deleteUserById(userId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@RequestMapping(value = "/user/{userId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> getUserByuserId(@PathVariable("userId") int userId) {
		User user = userService.getUserById(userId);
		if (user == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@RequestMapping(value = "/users/{lId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<User> getUserByLocation(@PathVariable("lId") int lId) {

		return userService.getUserByLocation(lId);

	}

	@RequestMapping(value = "/{userId}", method = RequestMethod.PUT)
	public void changeUserType(@PathVariable("userId") int userId) {
		logger.info("Calling Service for changing user type");
		userService.changeUserType(userId);
	}

}
