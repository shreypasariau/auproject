package com.boardroomproject.controller;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.boardroomproject.model.Location;
import com.boardroomproject.services.LocationService;

@RestController
@RequestMapping("/location")
public class LocationController {

	static Logger logger = Logger.getLogger(LocationController.class.getName());
	@Autowired
	LocationService locationService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public void addLocation(@RequestBody Location location) {
		logger.info("Adding a location");
		locationService.addLocation(location);
	}

	@RequestMapping(value = "/{lId}", method = RequestMethod.DELETE)
	public void deleteLocation(@PathVariable("lId") int lId) {
		logger.info("Deleting a location");
		locationService.deleteLocation(lId);
	}

	@RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Location> getAllLocations() {
		logger.info("Getting all location");
		return locationService.getAllLocations();
	}

}