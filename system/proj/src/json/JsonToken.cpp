////////////////////////////////////////////////////////////////////////////////////////////////////
//
// JsonToken.cpp
//
// Token JSON
//
// Autor: Germán Martínez
// Licencia: GPL-3.0
//
////////////////////////////////////////////////////////////////////////////////////////////////////
#include "JsonToken.h"

JsonToken::JsonToken() : tok(TOK_EOF)
{
}
JsonToken::JsonToken(int t, const QString& s) : tok(t), lexeme(s)
{
}
JsonToken::JsonToken(const JsonToken& t)
{
	operator = (t);
}
JsonToken::~JsonToken()
{
}
JsonToken::operator int() const
{
	return tok;
}
JsonToken& JsonToken::operator = (const JsonToken& t)
{
	tok = t.tok;
	lexeme = t.lexeme;
	return *this;
}
