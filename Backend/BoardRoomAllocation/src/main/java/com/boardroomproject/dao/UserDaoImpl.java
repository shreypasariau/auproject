package com.boardroomproject.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import com.boardroomproject.model.User;

public class UserDaoImpl implements UserDao {

	@Autowired
	private JdbcTemplate jdbcTemplateObject;
	static Logger logger = Logger.getLogger(UserDaoImpl.class.getName());

	public void setJdbcTemplate(JdbcTemplate jdbcTemplateObject) {
		this.jdbcTemplateObject = jdbcTemplateObject;
	}

	@Override
	public void saveUser(User user) {
		String saveUser = "insert into User (fName,lName,userName,dob,password,contact,address,gender,location,type,isArchived) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		user.setType("USER");
		jdbcTemplateObject.update(saveUser, user.getfName(), user.getlName(), user.getUserName(), user.getDob(),
				user.getPassword(), user.getContact(), user.getAddress(), Character.toString(user.getGender()),
				user.getLocation(), user.getType(), "N");
	}

	@Override
	public void deleteUserById(int id) {
		String deleteUser = "update user set isArchived = ? where userId = ?";
		jdbcTemplateObject.update(deleteUser, "Y", id);
	}

	@Override
	public void updateUser(User user) {
		String updateUser = "update user set password = ?,fName = ?, lName = ?, userName = ?, address = ?, contact = ?,dob = ?, gender = ?,type = ? where userId = ?";
		jdbcTemplateObject.update(updateUser, user.getPassword(), user.getfName(), user.getlName(), user.getUserName(),
				user.getAddress(), user.getContact(), user.getDob(), Character.toString(user.getGender()),
				user.getType(), user.getUserId());
	}

	@Override
	public boolean isUserExist(User user) {
		String checkExist = "select * from user where userName = ? and isArchived = ?";

		try {
			jdbcTemplateObject.queryForObject(checkExist, new Object[] { user.getUserName(), "N" },
					new BeanPropertyRowMapper<User>(User.class));
		} catch (EmptyResultDataAccessException e) {
			return false;
		}
		return true;
	}

	@Override
	public List<User> getUserByLocation(int lid) {
		logger.info("Getting LOcations By User Id");
		return jdbcTemplateObject.query("select * from user where location = ? and isArchived = ? and type=?",
				new RowMapper<User>() {
					@Override
					public User mapRow(ResultSet rs, int row) throws SQLException {
						User u = new User();
						u.setUserId(Integer.parseInt(rs.getString(1)));
						u.setPassword(rs.getString(2));
						u.setfName(rs.getString(3));
						u.setlName(rs.getString(4));
						u.setUserName(rs.getString(5));
						u.setAddress(rs.getString(6));
						u.setContact(rs.getString(7));

						u.setGender(rs.getString(9).charAt(0));
						u.setLocation(rs.getString(10));
						u.setIsArchived(rs.getString(11).charAt(0));
						return u;
					}
				}, lid, "N", "USER");
	}

	@Override
	public User getUserById(int userId) {
		String checkExist = "select * from user where userId  = ? and isArchived = ?";
		return jdbcTemplateObject.queryForObject(checkExist, new Object[] { userId, "N" },
				new BeanPropertyRowMapper<User>(User.class));
	}

	@Override
	public void changeUserType(int userId) {
		String updateUser = "update user set type = ? where userId  = ?";
		jdbcTemplateObject.update(updateUser, "ADMIN", userId);
	}

	@Override
	public User validateUser(User user) {
		String validateUser = "select * from user where userName=? and password= ? and isArchived = ?";
		User validUser;
		try {
			validUser = jdbcTemplateObject.queryForObject(validateUser,
					new Object[] { user.getUserName(), user.getPassword(), "N" },
					new BeanPropertyRowMapper<User>(User.class));
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
		return validUser;
	}

}
