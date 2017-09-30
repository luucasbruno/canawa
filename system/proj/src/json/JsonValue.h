////////////////////////////////////////////////////////////////////////////////////////////////////
//
// JsonValue.h
//
// Representa un valor en un objeto JSON
//
// Autor: Germán Martínez
// Licencia: GPL-3.0
//
////////////////////////////////////////////////////////////////////////////////////////////////////
#ifndef JSONVALUE_H
#define JSONVALUE_H
#include <QString>

class JsonArray;
class JsonObject;

class JsonValue
{
	enum
	{
		TYPE_NULL = 0,
		TYPE_BOOL = 1,
		TYPE_ARRAY = 2,
		TYPE_NUMBER = 3,
		TYPE_OBJECT = 4,
		TYPE_STRING = 5,
	};
	int type;
	union
	{
		bool bValue;
		double nValue;
		JsonArray* aValue;
		JsonObject* oValue;
	};
	QString sValue;
public:
	JsonValue();
	JsonValue(bool v);
	JsonValue(int v);
	JsonValue(double v);
	JsonValue(JsonArray* v);
	JsonValue(JsonObject* v);
	JsonValue(const QString& v);
	~JsonValue();
public:
	bool isNull() const { return type == TYPE_NULL; }
	bool isBool() const { return type == TYPE_BOOL; }
	bool isArray() const { return type == TYPE_ARRAY; }
	bool isNumber() const { return type == TYPE_NUMBER; }
	bool isObject() const { return type == TYPE_OBJECT; }
	bool isString() const { return type == TYPE_STRING; }

	bool        toBool() const { return bValue; }
	int         toInt() const { return (int)nValue; }
	double      toDouble() const { return nValue; }
	JsonArray*  toArray() const { return aValue; }
	JsonObject* toObject() const { return oValue; }
	QString     toString() const;
};

#endif // JSONVALUE_H
