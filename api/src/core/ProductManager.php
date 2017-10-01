<?php
include_once 'core/Product.php';
include_once 'core/ProductIterator.php';

/**
 * Clase administrativa de productos
 * 
 * @author Germán Martínez
 *
 */
class ProductManager
{
	/**
	 * Registrar un nuevo producto
	 * 
	 * @param string  $name Nombre del producto
	 * @param integer $brandId Id de la marca
	 * @param integer $providerId Id del proveedor
	 * @param integer $categoryId Id de la categoría
	 * @param double  $retailPrice Precio minorista
	 * @param double  $wholesalePrice Precio mayorista
	 * 
	 * @return Product Producto ó código de error
	 * 
	 * @see ERROR_PRODUCT___INVALID_NAME
	 * @see ERROR_PRODUCT___INVALID_BRAND_ID
	 * @see ERROR_PRODUCT___INVALID_PROVIDER_ID
	 * @see ERROR_PRODUCT___INVALID_CATEGORY_ID
	 * @see ERROR_PRODUCT___INVALID_RETAIL_PRICE
	 * @see ERROR_PRODUCT___INVALID_WHOLESALE_PRICE
	 */
	public static function addProduct($name, $brandId, $providerId, $categoryId, $retailPrice, $wholesalePrice)
	{
		// Comprobar nombre
		if(empty($name))
			return ERROR_PRODUCT___INVALID_NAME;
		// Obtener conexión
		$con = Connection::getInstance();
		
		// Comprobar id de marca
		$res = $con->query("SELECT `ID` FROM `BRAND` WHERE `ID`='$brandId';");
		if(null == ($data = $res->fetch_array()))
			return ERROR_PRODUCT___INVALID_BRAND_ID;
		
		// Comprobar id de proveedor
		$res = $con->query("SELECT `ID` FROM `PROVIDER` WHERE `ID`='$providerId';");
		if(null == ($data = $res->fetch_array()))
			return ERROR_PRODUCT___INVALID_PROVIDER_ID;
			
		// Comprobar id de categoría
		$res = $con->query("SELECT `ID` FROM `CATEGORY` WHERE `ID`='$categoryId';");
		if(null == ($data = $res->fetch_array()))
			return ERROR_PRODUCT___INVALID_CATEGORY_ID;
		
		// Comprobar precio minorista
		if($retailPrice <= 0.0)
			return ERROR_PRODUCT___INVALID_RETAIL_PRICE;
		
		// Comprobar precio mayorista
		if($wholesalePrice <= 0.0)
			return ERROR_PRODUCT___INVALID_WHOLESALE_PRICE;
			
		// Crear nuevo id
		$id = createId();
		
		$sql = "INSERT INTO `PRODUCT`
		(
			`ID`, `NAME`, `BRAND_ID`, `PROVIDER_ID`, `CATEGORY_ID`, `RETAIL_PRICE`, `WHOLESALE_PRICE`
		)
		VALUES
		(
			'$id', '$name', '$brandId', '$providerId', '$categoryId', '$retailPrice', $wholesalePrice
		);";
		$res = $con->query($sql);
		
		return new Product($id);
	}
	/**
	 * Obtener todos los productos
	 *
	 * @return ProductIterator Iterador de productos
	 */
	public static function getProducts()
	{
		$con = Connection::getInstance();
		$res = $con->query("SELECT `ID` FROM `PRODUCT`;");
		return new ProductIterator($res);
	}
	/**
	 * Buscar productos
	 * 
	 * @param string $mode Método de búsqueda
	 * @param string $pattern Patrón de búsqueda
	 * 
	 * @return ProductIterator|integer Iterador de productos ó código de error
	 * 
	 * @see ERROR_PRODUCT___SEARCH_FAILED
	 */
	public static function searchProducts($mode, $pattern)
	{
		$con = Connection::getInstance();
		if(empty($mode))
		{
			$mode = 'name';
		}
		if($mode == 'name')
		{
			$res = $con->query("SELECT `ID` FROM `PRODUCT` WHERE `NAME` LIKE '%$pattern%';");
		}
		else if($mode == 'brand')
		{
			$res = $con->query("SELECT `PRODUCT`.`ID` AS ID FROM `PRODUCT`,`BRAND` WHERE `PRODUCT`.`BRAND_ID` = `BRAND`.`ID` AND `BRAND`.`NAME` LIKE '%$pattern%';");
		}
		else
		{
			return ERROR_PRODUCT___SEARCH_FAILED;
		}
		return new ProductIterator($res);
	}
}

?>
