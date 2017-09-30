////////////////////////////////////////////////////////////////////////////////////////////////////
//
// JsonValue.cpp
//
// Representa un valor en un objeto JSON
//
// Autor: Germán Martínez
// Licencia: GPL-3.0
//
////////////////////////////////////////////////////////////////////////////////////////////////////
#include "JsonValue.h"
#include "JsonArray.h"
#include "JsonObject.h"

JsonValue::JsonValue() : type(TYPE_NULL)
{
}
JsonValue::JsonValue(bool v) : type(TYPE_BOOL)
{
	bValue = v;
}
JsonValue::JsonValue(int v) : type(TYPE_NUMBER)
{
	nValue = v;
}
JsonValue::JsonValue(double v) : type(TYPE_NUMBER)
{
	nValue = v;
}
JsonValue::JsonValue(JsonArray* v) : type(TYPE_ARRAY)
{
	aValue = v;
}
JsonValue::JsonValue(JsonObject* v) : type(TYPE_OBJECT)
{
	oValue = v;
}
JsonValue::JsonValue(const QString& v) : type(TYPE_STRING)
{
	sValue = v;
}
JsonValue::~JsonValue()
{
#if 0
	qDebug("~JsonValue() - %d", type);
#endif
	if(type == TYPE_ARRAY) delete aValue;
	if(type == TYPE_OBJECT) delete oValue;
}
QString     JsonValue::toString() const
{
	if(type == TYPE_BOOL)
	{
		return bValue ? "true" : "false";
	}
	else if(type == TYPE_NULL)
	{
		return "NULL";
	}
	return sValue;
}
