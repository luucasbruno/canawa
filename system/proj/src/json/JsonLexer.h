////////////////////////////////////////////////////////////////////////////////////////////////////
//
// JsonLexer.h
//
// Analizador l�xico para el formato JSON
//
// Autor: Germ�n Mart�nez
// Licencia: GPL-3.0
//
////////////////////////////////////////////////////////////////////////////////////////////////////
#ifndef JSONLEXER_H
#define JSONLEXER_H
#include "JsonToken.h"
#include "JsonInput.h"

class JsonLexer
{
	JsonInput in;
public:
	JsonLexer();
	~JsonLexer();
public:
	bool init(const QString& s);
	JsonToken nextToken();
};

#endif // JSONLEXER_H
