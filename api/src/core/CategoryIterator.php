<?php

/**
 * Iterador de categorias
 *
 * @author Germán Martínez
 *
 */
class CategoryIterator extends SQLQueryResultIterator
{
	/**
	 * Constructor
	 *
	 * @param SQLQueryResult $res Resultado de una consulta SQL[ID]
	 */
	public function __construct($res)
	{
		parent::__construct($res);
	}
	/**
	 * Obtener la categoria actual del iterador
	 *
	 * @return Category Categoria
	 */
	public function getCategory()
	{
		return new Category($this->data['ID']);
	}
}