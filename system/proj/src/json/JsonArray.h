////////////////////////////////////////////////////////////////////////////////////////////////////
//
// JsonArray.h
//
// Representa un array en un objeto JSON
//
// Autor: Germ�n Mart�nez
// Licencia: GPL-3.0
//
////////////////////////////////////////////////////////////////////////////////////////////////////
#ifndef JSONARRAY_H
#define JSONARRAY_H
#include <QVector>

class JsonValue;

class JsonArray
{
	QVector<JsonValue*> values;
public:
    JsonArray();
	~JsonArray();
public:
	int size() const;
	JsonValue* at(int i) const;
	void insertValue(JsonValue* value);
};

#endif // JSONARRAY_H
