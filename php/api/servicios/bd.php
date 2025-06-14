<?php
/**
	Clase de Servicio de acceso a base de datos por PDO.
	Está configurada para acceder a un SGBD MySQL.
**/

class BD{
	//Se configura por inyección de dependencias
	public static $host = null;
	public static $bd = null;
	public static $usuario = null;
	public static $clave = null;
	
	private static $conexion = null;	

	/**
		Realiza la conexión con la base de datos.
		Los parámetros de conexión deben "inyectarse" en los atributos de la clase.
		@return {PDO} Devuelve un objeto PDO conectado a la base de datos.
	**/
	public static function conectar(){
		if (!self::$conexion){
			$uri = 'mysql:host='.self::$host.';dbname='.self::$bd;
			$opciones = array(
				PDO::ATTR_PERSISTENT => true,
				PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
				PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
				PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
				//PDO::ATTR_EMULATE_PREPARES => true);
			self::$conexion = new PDO($uri, self::$usuario, self::$clave, $opciones);
		}

		return self::$conexion;
	}
	/**
		Inicia una transacción SQL.
		@returns {bool} True si la función tiene éxito. False en caso contrario.
	**/
	public static function iniciarTransaccion(){
		$conexion = BD::conectar();
		return $conexion->beginTransaction();
	}
	/**
		Confirma una transacción.
		@returns {bool} True si la función tiene éxito. False en caso contrario.
	**/
	public static function commit(){
		return self::$conexion->commit();
	}
	/**
		Cancela una transacción.
		@returns {bool} True si la función tiene éxito. False en caso contrario.
	**/
	public static function rollback(){
		return self::$conexion->rollBack();
	}
	/**
		Realiza una consulta de SELECT a la base de datos.
		@param $sql SQL de la sentencia.
		@param $params Parámetros de la consulta.
		@return Devuelve un array de resultados.
	**/
	public static function seleccionar($sql, $params){
		$conexion = BD::conectar();
		$sentencia = $conexion->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$sentencia->execute($params);
		return $sentencia->fetchAll();
	}
	/**
		Realiza una consulta de DELETE a la base de datos.
		@param $sql SQL de la sentencia.
		@param $params Parámetros de la sentencia.
	**/
	public static function borrar($sql, $params){
		BD::ejecutar($sql, $params, false);
	}
	/**
		Realiza una consulta de UPDATE a la base de datos.
		@param $sql SQL de la sentencia.
		@param $params Parámetros de la sentencia.
	**/
	public static function actualizar($sql, $params){
		BD::ejecutar($sql, $params, false);
	}
	/**
		Realiza una consulta de INSERT a la base de datos.
		@param $sql SQL de la sentencia.
		@param $params Parámetros de la sentencia.
		@return El identificador del objeto insertado.
	**/
	public static function insertar($sql, $params = null){
		return BD::ejecutar($sql, $params, true);
	}
	/**
		Realiza una sentencia sobre la base de datos.
		@param $sql SQL de la sentencia.
		@param $params Parámetros de la sentencia.
		@param $devolverId Indica si se debe devolver el último id insertado. Si es falso la función no devuelve nada.
		@return Opcionalmente, si $devolverId es false, se devuelve el identificador del objeto insertado.
	**/
	static function ejecutar($sql, $params, $devolverId = false){
		file_put_contents("debug.log", "SQL: " . $sql . "\nParámetros: " . print_r($params, true) . "\n", FILE_APPEND);
		

		$conexion = BD::conectar();
		$sentencia = $conexion->prepare($sql);
		$sentencia->execute($params);

		if ($devolverId)
			return $conexion->lastInsertId();
	}
}
