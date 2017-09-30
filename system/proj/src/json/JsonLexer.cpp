////////////////////////////////////////////////////////////////////////////////////////////////////
//
// JsonLexer.cpp
//
// Analizador léxico para el formato JSON
//
// Autor: Germán Martínez
// Licencia: GPL-3.0
//
////////////////////////////////////////////////////////////////////////////////////////////////////
#include "JsonLexer.h"


static int is_eof(int c){return (c == (-1));}
static int is_blank(int c){return (c == ' ' || c == '\t' || c == '\v' || c == '\f' || c == '\r' || c == '\n');}
static int is_digit(int c) { return (c >= '0' && c <= '9'); }
//static int is_identifier(int c){return ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c == '_') || (c >= '0' && c <= '9'));}
//static int is_start_identifier(int c){return ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c == '_'));}

JsonLexer::JsonLexer()
{
}
JsonLexer::~JsonLexer()
{
}
bool JsonLexer::init(const QString& s)
{
	in.init(s);
	while(is_blank(in.peek()))
		in.read();
	if(in.peek() == '{')
		return true;
	return false;
}
JsonToken JsonLexer::nextToken()
{
	int c;
	int tok = 0;
//	int line;
//	int column;
	QString lexeme;

	while(tok == 0)
	{
		c = in.peek();
//		line = in.line;
//		column = in.column;

		if(is_eof(c))
		{
			tok = TOK_EOF;
			lexeme = "<EOF>";
		}
		else if(is_blank(c))
		{
			in.read();
		}
		else if(is_digit(c))
		{
			lexeme += in.read();
			while(is_digit(in.peek()))
			{
				lexeme += in.read();
			}
			tok = TOK_NUMBER;
		}
		else if(c == '\"')
		{
			in.read();	// Salta '\"'
			while(1)
			{
				c = in.peek();
				if(c == '\"' || c == EOF)
				{
					break;
				}
				else if(c == '\\')
				{
					in.read();
					lexeme += in.read();
				}
				else
				{
					lexeme += in.read();
				}
			}
			if(c == EOF)
			{
				// TODO
			}
			else if(c == '\"')
			{
				in.read();
				tok = TOK_STRING;
			}
		}
		else
		{
			tok = in.read();
			lexeme += QChar(tok);
		}
	}
	return JsonToken(tok, lexeme);
}

