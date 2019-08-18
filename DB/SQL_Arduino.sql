CREATE DATABASE IF NOT EXISTS `Banana_Arduino_Data_2`
  DEFAULT CHARACTER SET = utf8mb4
  DEFAULT COLLATE = utf8mb4_general_ci;

USE `Banana_Arduino_Data_2`;

/**/
CREATE TABLE IF NOT EXISTS `UserData` (
  `id` int(11) ZEROFILL AUTO_INCREMENT NOT NULL,
  PRIMARY KEY (`id`),
  `temperature` float(3,1) ZEROFILL NOT NULL,
  `humidity` float(3,1) ZEROFILL NOT NULL,
  `pH` float(4,2) ZEROFILL NOT NULL,
  `soilHum` float(4,2) ZEROFILL NOT NULL,
  `time_purchased` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB 
  DEFAULT CHARSET = utf8mb4
  DEFAULT COLLATE = utf8mb4_general_ci;