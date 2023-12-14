-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-11-2023 a las 17:01:39
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `asientos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asientos`
--

CREATE TABLE `asientos` (
  `codigo` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `monto` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asientos`
--

INSERT INTO `asientos` (`codigo`, `nombre`, `monto`, `tipo`, `fecha`, `hora`, `estado`) VALUES
('100', '', 3465000, '1', '2011-09-29', '00:00:00', 0),
('525', '', 35000, '1', '0000-00-00', '00:00:00', 0),
('315', '', 1500000, '0', '0000-00-00', '00:00:00', 0),
('310', '', 2000000, '0', '0000-00-00', '00:00:00', 0),
('120', 'ehwa', 100, '1', '2011-09-29', '00:00:00', 0),
('400', 'ehwa', 100, '0', '2011-09-29', '00:00:00', 0),
('400', '300', 300, '1', '2011-09-29', '00:00:00', 0),
('100', '300', 300, '0', '2011-09-29', '00:00:00', 0),
('100', '', 3465000, '1', '2011-09-29', '00:00:00', 0),
('525', '', 35000, '1', '2023-11-22', '00:00:00', 0),
('315', '', 1500000, '0', '2023-11-23', '00:00:00', 0),
('310', '', 2000000, '0', '2023-11-23', '00:00:00', 0),
('100', '', 200, '1', '2011-09-17', '00:01:00', 0),
('100', '', 200, '0', '2023-12-01', '03:00:00', 0),
('120', 'tulipanes', 300, '1', '2011-09-23', '00:00:00', 0),
('400', 'tulipanes', 300, '0', '2011-09-23', '00:00:00', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catalogo`
--

CREATE TABLE `catalogo` (
  `codigo` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `saldo` int(11) NOT NULL,
  `saldoNormal` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `catalogo`
--

INSERT INTO `catalogo` (`codigo`, `nombre`, `saldo`, `saldoNormal`) VALUES
('100', 'Efectivo', 3465000, '1'),
('105', 'Cuentas por cobrar', 0, '1'),
('110', 'Documento por cobrar', 0, '1'),
('115', 'Alquiler por cobrar', 0, '1'),
('120', 'Inventario', 300, '1'),
('200', 'Terrenos', 0, '1'),
('205', 'Edificios', 0, '1'),
('210', 'Vehículos', 0, '1'),
('215', 'Mobiliario', 0, '1'),
('300', 'Renta pagada por adelantado', 0, '1'),
('305', 'Aporte de socios', 0, '0'),
('310', 'Ingresos', 2000000, '0'),
('315', 'Capital Social', 1500000, '0'),
('400', 'Cuentas por pagar', 300, '0'),
('405', 'Documento por pagar', 0, '0'),
('410', 'Alquiler por pagar', 0, '0'),
('415', 'Renta consolidada por pagar', 0, '0'),
('420', 'Retiro de socios', 0, '1'),
('425', 'Capital Social', 0, '0'),
('505', 'Electricidad', 0, '1'),
('510', 'Seguros', 0, '1'),
('520', 'Salarios', 0, '1'),
('525', 'Combustibles', 35000, '1'),
('530', 'Teléfonos', 0, '1'),
('535', 'Internet', 0, '1'),
('600', 'Depreciaciones', 0, '1'),
('700', 'Perdidas y Ganancias', 1965000, '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `codigo` varchar(100) NOT NULL,
  `proveedor` varchar(100) NOT NULL,
  `producto` varchar(100) NOT NULL,
  `monto` int(11) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `facturas`
--

INSERT INTO `facturas` (`codigo`, `proveedor`, `producto`, `monto`, `fecha`) VALUES
('001', 'inventario', 'tulipanes', 300, '2011-09-23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `codigo` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `numero_telefono` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`codigo`, `nombre`, `correo_electronico`, `numero_telefono`) VALUES
('001', 'inventario', 'gmail.com', '88887777'),
('002', 'Cuenta por pagar', 'hotmail.com', '99996666');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `catalogo`
--
ALTER TABLE `catalogo`
  ADD PRIMARY KEY (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
