-- MySQL dump 10.13  Distrib 5.7.20, for Win32 (AMD64)
--
-- Host: localhost    Database: boardRoomAllocationDB
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location` (
  `lId` int(11) NOT NULL AUTO_INCREMENT,
  `lName` varchar(50) DEFAULT NULL,
  `isArchived` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`lId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Delhi','N'),(2,'Kolkata','N'),(3,'Banglore','N');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requestroom`
--

DROP TABLE IF EXISTS `requestroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `requestroom` (
  `requestId` int(11) NOT NULL AUTO_INCREMENT,
  `lID` int(11) DEFAULT NULL,
  `rId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `dateOfBooking` date DEFAULT NULL,
  `remarkByAdmin` varchar(200) DEFAULT NULL,
  `purposeOfBooking` varchar(200) DEFAULT NULL,
  `approverAdminId` int(11) DEFAULT NULL,
  `startTime` time DEFAULT NULL,
  `endTime` time DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `isArchived` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`requestId`),
  KEY `lID` (`lID`),
  KEY `rId` (`rId`),
  KEY `userId` (`userId`),
  CONSTRAINT `requestroom_ibfk_1` FOREIGN KEY (`lID`) REFERENCES `location` (`lId`),
  CONSTRAINT `requestroom_ibfk_2` FOREIGN KEY (`rId`) REFERENCES `room` (`rId`),
  CONSTRAINT `requestroom_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requestroom`
--

LOCK TABLES `requestroom` WRITE;
/*!40000 ALTER TABLE `requestroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `requestroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room` (
  `rId` int(11) NOT NULL AUTO_INCREMENT,
  `rName` varchar(50) DEFAULT NULL,
  `isArchived` varchar(1) DEFAULT NULL,
  `lId` int(11) DEFAULT NULL,
  PRIMARY KEY (`rId`),
  KEY `lId` (`lId`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`lId`) REFERENCES `location` (`lId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'Room 1','N',1),(2,'Room 2','N',1),(3,'Room 3','N',1),(4,'Room 1','N',2),(5,'Room 2','N',2),(6,'Room 1','N',3),(7,'Room 2','N',3);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(200) DEFAULT NULL,
  `fName` varchar(25) DEFAULT NULL,
  `lName` varchar(25) DEFAULT NULL,
  `userName` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `contact` varchar(12) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `location` varchar(30) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `isArchived` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'shrey','shrey','pasari','shrey','delhi','9811622052','1997-09-05','M','1','ADMIN','N'),(2,'sidharth','sidharth','koti','sidharth','dharwad','7259315656','1999-11-05','M','1','USER','N'),(3,'sharanya','sharanya','mahesheka','sharanya','kolkata','7827010101','1997-09-11','F','2','ADMIN','N'),(4,'saurabh','saurabh','chalke','sourabh','bangalore','9823023456','1987-09-23','M','2','USER','N'),(5,'aditi','aditi','giri','aditi','sikkim','9911876543','1995-12-05','F','3','USER','N'),(6,'divya','divya','divya','divya','chitorth','8823232389','1990-11-05','F','3','ADMIN','N');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-29  9:22:56
