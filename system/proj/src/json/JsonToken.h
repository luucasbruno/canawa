////////////////////////////////////////////////////////////////////////////////////////////////////
//
// JsonToken.h
//
// Token JSON
//
// Autor: Germán Martínez
// Licencia: GPL-3.0
//
////////////////////////////////////////////////////////////////////////////////////////////////////
#ifndef JSONTOKEN_H
#define JSONTOKEN_H
#include <QString>

enum
{
	TOK_EOF = 256,
	TOK_NULL,
	TOK_TRUE,
	TOK_FALSE,
	TOK_NUMBER,
	TOK_STRING,
};

class JsonToken
{
public:
	int			tok;
	QString		lexeme;
public:
	JsonToken();
	JsonToken(int t, const QString& s);
	JsonToken(const JsonToken& t);
	~JsonToken();
public:
	operator int() const;
	JsonToken& operator = (const JsonToken& t);
};

#endif // JSONTOKEN_H
