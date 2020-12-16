-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `plot_rent_database` DEFAULT CHARACTER SET utf8 ;
USE `plot_rent_database` ;

-- -----------------------------------------------------
-- Table `plot_rent_database`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plot_rent_database`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `plot_rent_database`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plot_rent_database`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(128) NOT NULL,
  `password_hash` VARCHAR(512) NOT NULL,
  `salt` VARCHAR(256) NOT NULL,
  `nickname` VARCHAR(64) NOT NULL,
  `age` INT NOT NULL,
  `about` VARCHAR(2048) NULL,
  `image_url` VARCHAR(512) NULL,
  `is_online` BIT(1) NOT NULL DEFAULT 1,
  `latitude` DOUBLE NOT NULL,
  `longitude` DOUBLE NOT NULL,
  `role_id` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `user_ix_role_id` (`role_id` ASC) VISIBLE,
  INDEX `user_ix_latitude` (`latitude` ASC) VISIBLE,
  INDEX `user_ix_longitude` (`longitude` ASC) VISIBLE,
  UNIQUE INDEX `user_ux_email` (`email` ASC) VISIBLE,
  UNIQUE INDEX `user_ux_nickname` (`nickname` ASC) VISIBLE,
  CONSTRAINT `role_id`
    FOREIGN KEY (`role_id`)
    REFERENCES `pacer_database`.`role` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `plot_rent_database`.`user_settings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plot_rent_database`.`user_settings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `search_radius` INT NOT NULL DEFAULT 10,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `pacer_database`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Trigger to create user_settings every time we create user
-- -----------------------------------------------------
DROP TRIGGER IF EXISTS `user_trg_create_settings`;
DELIMITER $$
CREATE TRIGGER `user_trg_create_settings` AFTER INSERT ON `user`
FOR EACH ROW
BEGIN
  INSERT INTO `plot_rent_database`.`user_settings` (`user_id`)
  VALUES (NEW.`id`);
END $$
DELIMITER ;

-- -----------------------------------------------------
-- Table `plot_rent_database`.`plot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plot_rent_database`.`plot` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `address` VARCHAR(50) NULL DEFAULT 'address',
  `map_polygon` POLYGON NULL,
  `area` INT NULL DEFAULT 0,
  `price` INT NULL DEFAULT 0,
  `description` VARCHAR(1000) NULL DEFAULT 'description',
  `photo_url` VARCHAR(512) NULL,
  `doc_url` VARCHAR(512) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `pacer_database`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `plot_rent_database`.`chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plot_rent_database`.`chat` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user1_id` INT,
  `user2_id` INT,
  PRIMARY KEY (`id`),
  INDEX `chat_ix_user1_id` (`user1_id` ASC) VISIBLE,
  INDEX `chat_ix_user2_id` (`user2_id` ASC) VISIBLE,
  CONSTRAINT `user1_id`
    FOREIGN KEY (`user1_id`)
    REFERENCES `pacer_database`.`user` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `user2_id`
    FOREIGN KEY (`user2_id`)
    REFERENCES `pacer_database`.`user` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `plot_rent_database`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plot_rent_database`.`message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `chat_id` INT NOT NULL,
  `user_sender_id` INT,
  `text` VARCHAR(4096) NOT NULL,
  `datetime` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `message_ix_chat_id` (`chat_id` ASC) VISIBLE,
  INDEX `message_ix_user_sender_id` (`user_sender_id` ASC) VISIBLE,
  CONSTRAINT `chat_id`
    FOREIGN KEY (`chat_id`)
    REFERENCES `pacer_database`.`chat` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `user_sender_id`
    FOREIGN KEY (`user_sender_id`)
    REFERENCES `pacer_database`.`user` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Add default values
-- -----------------------------------------------------
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE `role`;
INSERT INTO `role` (`name`) VALUES ('user');

TRUNCATE TABLE `user_settings`;
TRUNCATE TABLE `user`;
INSERT INTO `user` (
  `email`,
  `password_hash`,
  `salt`,
  `nickname`,
  `age`,
  `about`,
  `image_url`,
  `is_online`,
  `latitude`,
  `longitude`,
  `role_id`)
VALUES (
  'a@a.com',
  '7bc4b6722ad8ff9bda38491382c446a28fa081723c8b36f38e45fd38eb912c4503af1ced92159e930fd24a61d543d5ef1cd5dec4021883f5b336ec46c199f328',
  'b77f0140cab9be25cfcc2e9b2a1aa272e81eec50befe556092af39f6cd6bf8bbd001491cf87ebee2e72a4d862f8c621c2d97051d178b802c5938d9e6c310a89921cf5f134e5e9006b1305e363fae4acafd28570149a2ff3edad06fc860cbd1d8e1be8cae23707c8fb223096c5b38592913a4b6899acde4208b49cc561617bba9',
  'UserA',
  '54',
  'I\'m too old for this',
  'http://localhost:3000/images/notFound.jpg',
  false,
  '53.91',
  '27.56',
  '1');
INSERT INTO `user` (
  `email`,
  `password_hash`,
  `salt`,
  `nickname`,
  `age`,
  `about`,
  `image_url`,
  `is_online`,
  `latitude`,
  `longitude`,
  `role_id`)
VALUES (
  'b@b.com',
  '7bc4b6722ad8ff9bda38491382c446a28fa081723c8b36f38e45fd38eb912c4503af1ced92159e930fd24a61d543d5ef1cd5dec4021883f5b336ec46c199f328',
  'b77f0140cab9be25cfcc2e9b2a1aa272e81eec50befe556092af39f6cd6bf8bbd001491cf87ebee2e72a4d862f8c621c2d97051d178b802c5938d9e6c310a89921cf5f134e5e9006b1305e363fae4acafd28570149a2ff3edad06fc860cbd1d8e1be8cae23707c8fb223096c5b38592913a4b6899acde4208b49cc561617bba9',
  'UserB',
  '100',
  'I\'m very old, let me rest',
  'http://localhost:3000/images/notFound.jpg',
  false,
  '53.91',
  '27.56',
  '1');
INSERT INTO `user` (
  `email`,
  `password_hash`,
  `salt`,
  `nickname`,
  `age`,
  `about`,
  `image_url`,
  `is_online`,
  `latitude`,
  `longitude`,
  `role_id`)
VALUES (
  'c@c.com',
  '7bc4b6722ad8ff9bda38491382c446a28fa081723c8b36f38e45fd38eb912c4503af1ced92159e930fd24a61d543d5ef1cd5dec4021883f5b336ec46c199f328',
  'b77f0140cab9be25cfcc2e9b2a1aa272e81eec50befe556092af39f6cd6bf8bbd001491cf87ebee2e72a4d862f8c621c2d97051d178b802c5938d9e6c310a89921cf5f134e5e9006b1305e363fae4acafd28570149a2ff3edad06fc860cbd1d8e1be8cae23707c8fb223096c5b38592913a4b6899acde4208b49cc561617bba9',
  'UserC',
  '15',
  'You\'re weak and in pain',
  'http://localhost:3000/images/notFound.jpg',
  false,
  '53.89',
  '27.54',
  '1');

TRUNCATE TABLE `plot`;
SET @polygon = 'POLYGON((53.900649 27.444117, 53.900704 27.444126, 53.900696 27.444257, 53.900629 27.444241, 53.900649 27.444117))';
INSERT INTO `plot` (
  `user_id`,
  `address`,
  `map_polygon`,
  `price`,
  `description`)
VALUES (
  1,
  'Belarus, Minsk, Odintsova 22/1, 117',
  ST_GeomFromText(@polygon),
  123,
  'Cool flat in Minsk Odintsova 22/1!');
SET @polygon = 'POLYGON((53.991127 27.470971, 53.989775 27.477118, 53.987313 27.475467, 53.989099 27.469408, 53.991127 27.470971))';
INSERT INTO `plot` (
  `user_id`,
  `address`,
  `map_polygon`,
  `price`,
  `description`)
VALUES (
  2,
  'Belarus, Minsk region 1',
  ST_GeomFromText(@polygon),
  322,
  'Best land 1 around Minsk!');

SET FOREIGN_KEY_CHECKS = 1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
