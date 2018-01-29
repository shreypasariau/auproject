Project : Boardroom allocation system

download frontend and backend from the github repository : https://github.com/shreypasariau/auproject

For the frontend:
	do npm start from node command prompt in the project location
	change the port in constants/constants.js according to your system

For the backend:
	import  the maven project into eclipse oxygen ide
 	update the project 
 	do maven build
 	run on a tomcat server 8


Create the database as the following commands 

create database boardRoomAllocationDB;

use boardRoomAllocationDB;


CREATE TABLE USER
(
userId INT NOT NULL auto_increment,
password varchar(200),
fName VARCHAR(25),
lName VARCHAR(25),
userName VARCHAR(50),
address VARCHAR(100),
contact VARCHAR(12),
dob DATE,
gender VARCHAR(6),
location VARCHAR(30),
type VARCHAR(10),
isArchived VARCHAR(1),
PRIMARY KEY(userId)
);


CREATE TABLE LOCATION 
(
	lId INT NOT NULL auto_increment,
	lName VARCHAR(50),
	PRIMARY KEY(lId), 
	isArchived VARCHAR(1)
);

CREATE TABLE ROOM
(
	rId INT NOT NULL auto_increment,
	rName VARCHAR(50),
	isArchived VARCHAR(1),
	lId INT,
	PRIMARY KEY(rId), 
	FOREIGN KEY (lId) REFERENCES LOCATION(lId)
);

CREATE TABLE REQUESTROOM
(
	requestId INT NOT NULL auto_increment,
	lID INT,
	rId INT,
	userId INT,
	dateOfBooking DATE,
	remarkByAdmin VARCHAR(200),
	purposeOfBooking VARCHAR(200),
	approverAdminId INT,
	startTime TIME,
	endTime TIME,
	status VARCHAR(10),
	PRIMARY KEY(requestId),
	isArchived VARCHAR(1),
	FOREIGN KEY (lId) REFERENCES LOCATION(lId),
	FOREIGN KEY (rId) REFERENCES ROOM(rId),
	FOREIGN KEY (userId) REFERENCES USER(userId)
);


insert into location(lName ,isArchived ) values ('Delhi','N');
insert into location(lName ,isArchived ) values ('Kolkata','N');
insert into location(lName ,isArchived ) values ('Banglore','N');



insert into room(rName,isArchived,lId) values ('Room 1','N',1);
insert into room(rName,isArchived,lId) values ('Room 2','N',1);
insert into room(rName,isArchived,lId) values ('Room 3','N',1);
insert into room(rName,isArchived,lId) values ('Room 1','N',2);
insert into room(rName,isArchived,lId) values ('Room 2','N',2);
insert into room(rName,isArchived,lId) values ('Room 1','N',3);
insert into room(rName,isArchived,lId) values ('Room 2','N',3);


insert into user(password,fName,lName,userName,address,contact,dob,gender,location,type,isArchived) values ('shrey','shrey','pasari','shrey','delhi','9811622052','1997-09-05','M',1,'ADMIN','N');
insert into user(password,fName,lName,userName,address,contact,dob,gender,location,type,isArchived) values ('sidharth','sidharth','koti','sidharth','dharwad','7259315656','1999-11-05','M',1,'USER','N');

insert into user(password,fName,lName,userName,address,contact,dob,gender,location,type,isArchived) values ('sharanya','sharanya','mahesheka','sharanya','kolkata','7827010101','1997-09-11','F',2,'ADMIN','N');
insert into user(password,fName,lName,userName,address,contact,dob,gender,location,type,isArchived) values ('saurabh','saurabh','chalke','sourabh','bangalore','9823023456','1987-09-23','M',2,'USER','N');

insert into user(password,fName,lName,userName,address,contact,dob,gender,location,type,isArchived) values ('divya','divya','divya','divya','chitorth','8823232389','1990-11-05','F',3,'ADMIN','N');
insert into user(password,fName,lName,userName,address,contact,dob,gender,location,type,isArchived) values ('aditi','aditi','giri','aditi','sikkim','9911876543','1995-12-05','F',3,'USER','N');