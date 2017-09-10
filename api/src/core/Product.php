<?php
include_once 'core/Brand.php';
include_once 'core/Provider.php';
include_once 'core/Category.php';

/**
 * Clase que representa un producto
 * 
 * @author Germán Martínez
 *
 */
class Product
{
	private $productId;
	
	/**
	 * Constructor
	 * 
	 * @param integer $id Id del producto
	 */
	public function __construct($id)
	{
		$this->productId = $id;
	}
	/**
	 * Obtener el id del producto
	 * 
	 * @return integer Id del producto
	 */
	public function getId()
	{
		return $this->productId;
	}
	/**
	 * Obtener el nombre del producto
	 * 
	 * @return string Nombre del producto
	 */
	public function getName()
	{
		return getFieldFromTable('PRODUCT', 'NAME', $this->productId);
	}
	/**
	 * Obtener la marca del producto
	 * 
	 * @return Brand Marca del producto
	 */
	public function getBrand()
	{
		return new Brand(getFieldFromTable('PRODUCT', 'BRAND_ID', $this->productId));
	}
	/**
	 * Obtener el proveedor del producto
	 * 
	 * @return Provider Proveedor del producto
	 */
	public function getProvider()
	{
		return new Provider(getFieldFromTable('PRODUCT', 'PROVIDER_ID', $this->productId));
	}
	/**
	 * Obtener la categoría del producto
	 * 
	 * @return Category Categoria del producto
	 */
	public function getCategory()
	{
		return new Category(getFieldFromTable('PRODUCT', 'CATEGORY_ID', $this->productId));
	}
	/**
	 * Obtener el precio minorista del producto
	 * 
	 * @return number Precio minorista del producto
	 */
	public function getRetailPrice()
	{
		return getFieldFromTable('PRODUCT', 'RETAIL_PRICE', $this->productId);
	}
	/**
	 * Obtener el precio mayorista del producto
	 *
	 * @return number Precio mayorista del producto
	 */
	public function getWholesalePrice()
	{
		return getFieldFromTable('PRODUCT', 'WHOLESALE_PRICE', $this->productId);
	}
}

?>
