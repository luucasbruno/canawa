////////////////////////////////////////////////////////////////////////////////////////////////////
//
// JsonObject.h
//
// Representa un objeto JSON
//
// Autor: Germán Martínez
// Licencia: GPL-3.0
//
////////////////////////////////////////////////////////////////////////////////////////////////////
#ifndef JSONOBJECT_H
#define JSONOBJECT_H
#include <QHash>

class JsonValue;
class JsonObject;

class JsonObject
{
public:
	QHash<QString, JsonValue*> values;
public:
	JsonObject();
	~JsonObject();
public:
	JsonValue* value(const QString& key)
	{
		return values[key];
	}
	QHash<QString, JsonValue*> getValues() { return values; }
	void insertValue(const QString& key, JsonValue* value);
};

#endif // JSONOBJECT_H
