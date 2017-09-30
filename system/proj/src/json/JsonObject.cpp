////////////////////////////////////////////////////////////////////////////////////////////////////
//
// JsonObject.cpp
//
// Representa un objeto JSON
//
// Autor: Germán Martínez
// Licencia: GPL-3.0
//
////////////////////////////////////////////////////////////////////////////////////////////////////
#include "JsonObject.h"
#include "JsonValue.h"

JsonObject::JsonObject()
{
}
JsonObject::~JsonObject()
{
#if 0
	qDebug("~JsonObject()");
#endif
	foreach(QString key, values.keys())
	{
		delete values.value(key);
	}
	values.clear();
}
void JsonObject::insertValue(const QString& key, JsonValue* value)
{
	if(value != NULL)
	{
		values.insert(key, value);
	}
}


