////////////////////////////////////////////////////////////////////////////////////////////////////
//
// JsonArray.cpp
//
// Representa un array en un objeto JSON
//
// Autor: Germán Martínez
// Licencia: GPL-3.0
//
////////////////////////////////////////////////////////////////////////////////////////////////////
#include "JsonArray.h"
#include "JsonValue.h"

JsonArray::JsonArray()
{
}
JsonArray::~JsonArray()
{
#if 0
	qDebug("~JsonArray()");
#endif
	for(int i = 0; i < values.size(); i++)
		delete values.at(i);

	values.clear();
}
int JsonArray::size() const
{
	return values.size();
}
JsonValue* JsonArray::at(int i) const
{
	return values.at(i);
}
void JsonArray::insertValue(JsonValue* value)
{
	if(value != NULL)
		values.append(value);
}

