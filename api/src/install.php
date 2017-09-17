<?php
$drop = true;
$server = "localhost";
$db_name = "canawa";
$db_username = "root";
$db_password = "root1234";

//
// Establecer conexión
//
$con = new mysqli($server, $db_username, $db_password);
if(!$con)
{
	echo "ERROR: No se ha podido establecer la conexión el servidor MySQL.";
	exit;
}

if($drop)
{
	$res = $con->query("DROP DATABASE IF EXISTS $db_name;");
}

//
// Comprobar si mi base de datos está creada, sino crearla
//
$result = $con->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$db_name'");
if($result == false)
{
	// ERROR
	exit;
}
else
{
	if(empty(mysqli_fetch_array($result)))
	{
		//
		// Crear db
		//
		echo "TRACE: Creando base de datos.<br>";
		if($con->query("CREATE DATABASE $db_name") === true)
		{
			echo "TRACE: La base de datos se ha creado satisfactoriamente.<br>";
			
			//
			// Seleccionar la db como la default
			//
			$con->select_db($db_name);
			
			//
			// Crear tablas
			//
			createTableUSER($con);
			createTableCLIENT($con);
			
			// ...
			echo "SUCCESS: La base de datos se ha creado exitosamente.<br>";
		}
		else
		{
			echo "ERROR: No se ha podido crear la base de datos."; 
			exit();
		}
	}
}
echo "INFORMATION: Base de datos instalada.<br>";
$con->close();

exit();

////////////////////////////////////////////////////////////////////////////////////////////////////
// Crear la tabla USER
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param Connection $con
 */
function createTableUSER($con)
{
	$sql = "CREATE TABLE IF NOT EXISTS `USER`
			(
				`ID` INT NOT NULL ,
				`NAME` TEXT NOT NULL,
				`PASSWORD` TEXT NOT NULL,
				`EMAIL` TEXT NULL,
				`FULLNAME` TEXT NULL,
			
				PRIMARY KEY (`ID`)
			)
			ENGINE = InnoDB
			DEFAULT CHARACTER SET = utf8
			COLLATE = utf8_bin;";
	$res = $con->query($sql);
	
	// Insertar admin
	$sql = "INSERT INTO `user` (`ID`, `NAME`, `PASSWORD`) VALUES ('1', 'admin', '123');";
	$res = $con->query($sql);
}
////////////////////////////////////////////////////////////////////////////////////////////////////
// Crear la tabla CLIENT
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param Connection $con
 */
function createTableCLIENT($con)
{
	$sql = "CREATE  TABLE IF NOT EXISTS `CLIENT`
			(
		 		`ID` INT NOT NULL ,
				`NAME` TEXT NOT NULL ,
				`CUIT` TEXT NOT NULL ,
				`EMAIL` TEXT NULL ,
				`PHONE` TEXT NULL ,
				`LOCATION` TEXT NULL ,
				
				PRIMARY KEY (`ID`)
			)
			ENGINE = InnoDB
			DEFAULT CHARACTER SET = utf8
			COLLATE = utf8_bin;";
	
	$res = $con->query($sql);
}
////////////////////////////////////////////////////////////////////////////////////////////////////
// Crear la tabla PROVIDER
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param Connection $con
 */
function createTablePROVIDER($con)
{
	$sql = "CREATE  TABLE IF NOT EXISTS `ayds2_2017`.`PROVIDER`
			(
				`ID` INT NOT NULL ,
				`NAME` TEXT NOT NULL ,
				`EMAIL` TEXT NOT NULL ,
				`PHONE` TEXT NOT NULL ,
				`COMPANY` TEXT NOT NULL ,
				
				PRIMARY KEY (`ID`)
			)
			ENGINE = InnoDB
			DEFAULT CHARACTER SET = utf8
			COLLATE = utf8_bin;";
	$res = $con->query($sql);
}

?>
