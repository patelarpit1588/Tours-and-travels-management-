-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 22, 2025 at 08:20 AM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `new_tours_travels`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

DROP TABLE IF EXISTS `tbl_admin`;
CREATE TABLE IF NOT EXISTS `tbl_admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone_no` varchar(10) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`admin_id`, `admin_name`, `email`, `phone_no`, `password`) VALUES
(1, 'Admin', 'admin@gmail.com', '9898298982', '12345');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_booking`
--

DROP TABLE IF EXISTS `tbl_booking`;
CREATE TABLE IF NOT EXISTS `tbl_booking` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `tour_id` int NOT NULL,
  `travel_date` date NOT NULL,
  `persons` int NOT NULL,
  `total_amount` int NOT NULL,
  `booking_status` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`booking_id`)
) ENGINE=MyISAM AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_booking`
--

INSERT INTO `tbl_booking` (`booking_id`, `user_id`, `tour_id`, `travel_date`, `persons`, `total_amount`, `booking_status`, `created_at`) VALUES
(101, 300001, 28, '2025-11-26', 5, 5000, 'Cancelled', '2025-11-26 19:45:08'),
(102, 300001, 28, '2025-11-26', 5, 5000, 'Confirm', '2025-11-26 19:45:29'),
(103, 300001, 29, '2025-11-26', 5, 5000, 'Confirm', '2025-11-26 19:45:30'),
(104, 10, 29, '2025-11-01', 5, 1000, 'Pending', '2025-11-27 21:27:39'),
(27, 104, 31, '2026-01-14', 3, 12000, 'Confirm', '2025-12-18 21:19:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_enquiries`
--

DROP TABLE IF EXISTS `tbl_enquiries`;
CREATE TABLE IF NOT EXISTS `tbl_enquiries` (
  `enquiry_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone_no` varchar(10) NOT NULL,
  `message` text NOT NULL,
  `enquiry_status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `reply_message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`enquiry_id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_enquiries`
--

INSERT INTO `tbl_enquiries` (`enquiry_id`, `user_id`, `name`, `email`, `phone_no`, `message`, `enquiry_status`, `reply_message`, `created_at`) VALUES
(25, 12, 'MAKKAWALA AKSHAT RAJENDRAKUMAR', 'akshatmakka150205@gmail.com', '0884916047', 'I Want To Know About Tour PackagesI Want To Know About Tour PackagesI Want To Know About Tour PackagesI Want To Know About Tour PackagesI Want To Know About Tour PackagesI Want To Know About Tour PackagesI Want To Know About Tour Packages', 'Replied', 'I Want To Know About Tour PackagesI Want To Know About Tour PackagesI Want To Know About Tour PackagesI Want To Know About Tour PackagesI Want To Know About Tour PackagesI Want To Know About Tour PackagesI Want To Know About Tour Packages', '2025-12-21 22:36:50'),
(24, 12, 'MAKKAWALA AKSHAT RAJENDRAKUMAR', 'akshatmakka150205@gmail.com', '0884916047', 'I Want To Know About Tour PackagesI Want To Know About Tour PackagesI Want To Know About Tour PackagesI Want To Know About Tour PackagesI Want To Know About Tour PackagesI Want To Know About Tour PackagesI Want To Know About Tour Packages', 'Pending', 'Thank you for contacting us and showing interest in our tour packages.\r\n\r\nWe have received your enquiry successfully. Our team is reviewing the details and will get back to you shortly with complete information regarding pricing, itinerary, and availability.', '2025-12-21 21:15:09');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_review`
--

DROP TABLE IF EXISTS `tbl_review`;
CREATE TABLE IF NOT EXISTS `tbl_review` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `tour_id` int NOT NULL,
  `user_id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `rating` int NOT NULL,
  `review_text` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`)
) ENGINE=MyISAM AUTO_INCREMENT=146 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_review`
--

INSERT INTO `tbl_review` (`review_id`, `tour_id`, `user_id`, `username`, `rating`, `review_text`, `created_at`) VALUES
(134, 37, 15, 'Akshat', 5, 'Good Job', '2025-12-22 00:03:57'),
(145, 38, 15, 'Akshat', 5, 'Very Nice', '2025-12-22 13:31:21'),
(144, 38, 15, 'Akshat', 5, 'Very Nice', '2025-12-22 13:31:04'),
(143, 38, 15, 'Akshat', 5, 'Very Nice', '2025-12-22 13:30:51'),
(141, 37, 15, 'Akshat', 5, 'Very Nice', '2025-12-22 12:34:38'),
(142, 37, 15, 'Akshat', 5, '1234', '2025-12-22 12:39:38');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tours`
--

DROP TABLE IF EXISTS `tbl_tours`;
CREATE TABLE IF NOT EXISTS `tbl_tours` (
  `tour_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `location` varchar(50) NOT NULL,
  `duration` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` int NOT NULL,
  `main_image` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tour_id`)
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_tours`
--

INSERT INTO `tbl_tours` (`tour_id`, `title`, `description`, `location`, `duration`, `price`, `main_image`, `created_at`) VALUES
(37, 'Gujarat Tour', '• This 5 Days and 4 Nights tour package is designed to provide a complete, comfortable, and memorable travel experience covering religious, cultural, wildlife, and coastal destinations.\r\n• The tour focuses on spiritual temple visits, scenic sightseeing, relaxed travel schedules, and quality accommodation for travelers of all age groups.\r\n• This package is suitable for families, couples, senior citizens, students, and group travelers.\r\n• The itinerary is carefully planned to avoid travel fatigue while ensuring maximum sightseeing coverage.\r\n\r\nDESTINATIONS COVERED DURING THE TOUR\r\n• Somnath – A sacred pilgrimage destination famous for the Somnath Temple, one of the twelve Jyotirlingas of Lord Shiva, along with nearby spiritual landmarks.\r\n• Dwarka – An ancient and holy city associated with Lord Krishna, known for Dwarkadhish Temple, Gomti Ghat, and surrounding temples.\r\n• Gir National Park – A protected wildlife sanctuary and the only natural habitat of the Asiatic Lions, offering a jungle safari experience.\r\n• Diu – A peaceful coastal destination famous for its beaches, Portuguese-era forts, churches, and scenic sea views.', 'Somnath - Dwarka - Diu - Girnar', '5 Days', 10000, '1766341882311.jpg', '2025-12-22 00:01:22'),
(38, 'Goa Tour', ' • This 5 Days and 4 Nights tour package is designed to provide a complete, comfortable, and memorable travel experience covering religious, cultural, wildlife, and coastal destinations. • The tour focuses on spiritual temple visits, scenic sightseeing, relaxed travel schedules, and quality accommodation for travelers of all age groups. • This package is suitable for families, couples, senior citizens, students, and group travelers. • The itinerary is carefully planned to avoid travel fatigue while ensuring maximum sightseeing coverage. DESTINATIONS COVERED DURING THE TOUR • Somnath – A sacred pilgrimage destination famous for the Somnath Temple, one of the twelve Jyotirlingas of Lord Shiva, along with nearby spiritual landmarks. • Dwarka – An ancient and holy city associated with Lord Krishna, known for Dwarkadhish Temple, Gomti Ghat, and surrounding temples. • Gir National Park – A protected wildlife sanctuary and the only natural habitat of the Asiatic Lions, offering a jungle safari experience. • Diu – A peaceful coastal destination famous for its beaches, Portuguese-era forts, churches, and scenic sea views.', 'Bagha Beach - Saint\'s Row Church', '5 Days', 15000, '1766390401175.png', '2025-12-22 13:30:01');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tour_images`
--

DROP TABLE IF EXISTS `tbl_tour_images`;
CREATE TABLE IF NOT EXISTS `tbl_tour_images` (
  `img_id` int NOT NULL AUTO_INCREMENT,
  `tour_id` int NOT NULL,
  `image` varchar(100) NOT NULL,
  PRIMARY KEY (`img_id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_tour_images`
--

INSERT INTO `tbl_tour_images` (`img_id`, `tour_id`, `image`) VALUES
(39, 28, '1765959681942.jpg'),
(40, 36, '1766255247898.jpeg'),
(41, 36, '1766255247915.jpg'),
(42, 36, '1766255247917.png'),
(43, 36, '1766255247924.jpg'),
(44, 36, '1766255247924.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contact_no` varchar(10) NOT NULL,
  `password` varchar(20) NOT NULL,
  `registration_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `username`, `email`, `contact_no`, `password`, `registration_datetime`) VALUES
(15, 'Akshat', 'akshat@gmail.com', '8849160478', '12345', '2025-12-22 00:03:12');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
