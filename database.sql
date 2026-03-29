-- FSD Lab 04: Student Registration System
-- Run this in phpMyAdmin or MySQL CLI

CREATE DATABASE IF NOT EXISTS student_db;
USE student_db;

CREATE TABLE IF NOT EXISTS students (
    roll_no     VARCHAR(20) PRIMARY KEY,
    first_name  VARCHAR(50) NOT NULL,
    last_name   VARCHAR(50) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    confirm_password VARCHAR(255) NOT NULL,
    contact     VARCHAR(15) NOT NULL
);
