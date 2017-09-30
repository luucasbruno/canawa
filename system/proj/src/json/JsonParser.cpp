////////////////////////////////////////////////////////////////////////////////////////////////////
//
// JsonParser.cpp
//
// Analizador sintáctico para el formato JSON
//
// Autor: Germán Martínez
// Licencia: GPL-3.0
//
////////////////////////////////////////////////////////////////////////////////////////////////////
#include "JsonParser.h"
#include "JsonValue.h"
#include "JsonArray.h"
#include "JsonObject.h"

JsonParser::JsonParser()
{
}
JsonParser::~JsonParser()
{
}
JsonObject* JsonParser::parse(const QString& s)
{
	if(s.isEmpty())
		return NULL;
#ifdef QT_DEBUG
	qDebug("s=%ls", (const wchar_t*)s.constData());
#endif
	if(lex.init(s))
	{
		next();
#if 0
		while(tok != TOK_EOF)
		{
			qDebug("%ls", tok.lexeme.constData());
			next();
		}
#else
		return parseObject();
#endif
	}
	return NULL;
}
void JsonParser::next()
{
	tok = lex.nextToken();
}
void JsonParser::match(int t)
{
	if(tok != t)
	{
		qDebug("expected \"%ls\" but found \"%ls\"", (const wchar_t*)(JsonToken(t, QString(QChar(t))).lexeme.constData()), (const wchar_t*)(tok.lexeme.constData()));
		exit(1);
	}
	next();
}
JsonValue* JsonParser::parseValue()
{
	JsonValue* jv = NULL;

	if(tok == '[')
	{
		JsonArray* value;
		if(NULL != (value = parseArray()))
			jv = new JsonValue(value);
	}
	else if(tok == '{')
	{
		JsonObject* value;
		if(NULL != (value = parseObject()))
			jv = new JsonValue(value);
	}
	else if(tok == TOK_STRING)
	{
		jv = new JsonValue(tok.lexeme);
		next();
	}
	else if(tok == TOK_NUMBER)
	{
		jv = new JsonValue(tok.lexeme.toDouble());
		next();
	}
	return jv;
}
JsonArray* JsonParser::parseArray()
{
	JsonArray* arr = new JsonArray();
	match('[');
	while(tok != ']')
	{
		arr->insertValue(parseValue());
		if(tok == ',')
			next();
	}
	match(']');
	return arr;
}
JsonObject* JsonParser::parseObject()
{
	JsonObject* obj = new JsonObject();

	match('{');
	while(tok != '}')
	{
		QString key;

		// Obtener clave
		if(!parseKey(key))
			return NULL;

		obj->insertValue(key, parseValue());
		if(tok == ',')
			next();
	}
	match('}');
	return obj;
}
bool JsonParser::parseKey(QString& key)
{
	if(tok != TOK_STRING)
	{
		// TODO: error
	}
	key = tok.lexeme;
	next();

	match(':');
	return true;
}



