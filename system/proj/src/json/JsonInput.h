////////////////////////////////////////////////////////////////////////////////////////////////////
//
// JsonInput.h
//
// Buffer de entrada para parsear el formato JSON
//
// Autor: Germán Martínez
// Licencia: GPL-3.0
//
////////////////////////////////////////////////////////////////////////////////////////////////////
#ifndef JSONINPUT_H
#define JSONINPUT_H
#include <QChar>
#include <QString>

#define EOF (-1)

class JsonInput
{
public:
	int pos;
	int line;
	int column;
	QString buffer;
	int skip;
public:
	JsonInput();
	~JsonInput();
public:
	void init(const QString& s);
	int  peek();
	int  read();
};

#endif // JSONINPUT_H
