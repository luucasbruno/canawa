////////////////////////////////////////////////////////////////////////////////////////////////////
//
// JsonParser.h
//
// Analizador sintáctico para el formato JSON
//
// Autor: Germán Martínez
// Licencia: GPL-3.0
//
////////////////////////////////////////////////////////////////////////////////////////////////////
#ifndef JSONPARSER_H
#define JSONPARSER_H
#include "Json.h"
#include <QString>
#include "JsonToken.h"
#include "JsonLexer.h"

class JsonValue;
class JsonArray;

class JsonParser
{
	JsonToken tok;
	JsonLexer lex;
public:
    JsonParser();
	~JsonParser();
public:
	JsonObject* parse(const QString& s);
private:
	void next();
	void match(int t);

	JsonValue* parseValue();
	JsonArray* parseArray();
	JsonObject* parseObject();
	bool parseKey(QString& key);
};

#endif // JSONPARSER_H
