////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// HttpRequest.cpp
///
/// Clase para facilitar los request's http
///
/// Autor: Germán Martínez
/// Licencia: GPL-3.0
/// Referencia: http://www.creativepulse.gr/en/blog/2014/restful-api-requests-using-qt-cpp-for-linux-mac-osx-ms-windows
///
////////////////////////////////////////////////////////////////////////////////////////////////////
#include "HttpRequest.h"
#include <QUrl>
#include <QBuffer>
#include <QtNetwork/QNetworkReply>
#include <QtNetwork/QNetworkRequest>
#include <QtNetwork/QNetworkAccessManager>
#include <QDateTime>
#include <QFileInfo>

enum
{
	LAYOUT_NONE,
	LAYOUT_ADDRESS,
	LAYOUT_MULTIPART,
	LAYOUT_URL_ENCODED,
};
QString http_attribute_encode(QString attribute_name, QString input) {
	// result structure follows RFC 5987
	bool need_utf_encoding = false;
	QString result = "";
	QByteArray input_c = input.toLocal8Bit();
	char c;
	for (int i = 0; i < input_c.length(); i++) {
		c = input_c.at(i);
		if (c == '\\' || c == '/' || c == '\0' || c < ' ' || c > '~') {
			// ignore and request utf-8 version
			need_utf_encoding = true;
		}
		else if (c == '"') {
			result += "\\\"";
		}
		else {
			result += c;
		}
	}

	if (result.length() == 0) {
		need_utf_encoding = true;
	}

	if (!need_utf_encoding) {
		// return simple version
		return QString("%1=\"%2\"").arg(attribute_name, result);
	}

	QString result_utf8 = "";
	for (int i = 0; i < input_c.length(); i++) {
		c = input_c.at(i);
		if (
			(c >= '0' && c <= '9')
			|| (c >= 'A' && c <= 'Z')
			|| (c >= 'a' && c <= 'z')
		) {
			result_utf8 += c;
		}
		else {
			result_utf8 += "%" + QString::number(static_cast<unsigned char>(input_c.at(i)), 16).toUpper();
		}
	}

	// return enhanced version with UTF-8 support
	return QString("%1=\"%2\"; %1*=utf-8''%3").arg(attribute_name, result, result_utf8);
}


HttpRequest::HttpRequest(QObject* obj, const char* slot) : requestId(0)
{
	mngr = new QNetworkAccessManager(this);
	connect(mngr, SIGNAL(finished(QNetworkReply*)), this, SLOT(slotNetworkManager_finished(QNetworkReply*)));
	connect(this, SIGNAL(onFinished(HttpRequest*)), obj, slot);
}
HttpRequest::HttpRequest(int id, QObject* obj, const char* slot) : requestId(id)
{
	mngr = new QNetworkAccessManager(this);
	connect(mngr, SIGNAL(finished(QNetworkReply*)), this, SLOT(slotNetworkManager_finished(QNetworkReply*)));
	connect(this, SIGNAL(onFinished(HttpRequest*)), obj, slot);
}
HttpRequest::~HttpRequest()
{
#ifdef QT_DEBUG
	qDebug("~HttpRequest()");
#endif
}
void HttpRequest::exec(QString url, const QString& httpMethod)
{
	//
	// Limpieza
	//
	response.clear();
	errorType = 0;
	errorString.clear();
	statusCode = 0;


	int variableLayout;

	//
	// Decidir el layout de varibles
	//
	variableLayout = LAYOUT_NONE;
	if(!files.isEmpty())
	{
		variableLayout = LAYOUT_MULTIPART;
	}
	if(variableLayout == LAYOUT_NONE)
	{
		if(httpMethod == "GET" || httpMethod == "HEAD")
			variableLayout = LAYOUT_ADDRESS;
		else
			variableLayout = LAYOUT_URL_ENCODED;
	}

	//
	// Tratar variables
	//
	QString boundary = "__-----------------------"
					   + QString::number(QDateTime::currentDateTime().toTime_t())
					   + QString::number(qrand())
					;//   + "__";
	QByteArray requestContent = "";

	if(variableLayout == LAYOUT_ADDRESS || variableLayout == LAYOUT_URL_ENCODED)
	{
		if(!variables.isEmpty())
		{
			bool first = true;
			foreach(QString key, variables.keys())
			{
				if(!first)
					requestContent.append("&");
				first = false;
				requestContent.append(QUrl::toPercentEncoding(key));
				requestContent.append("=");
				requestContent.append(QUrl::toPercentEncoding(variables.value(key)));
			}
			if(variableLayout == LAYOUT_ADDRESS)
			{
				url += "?" + requestContent;
				requestContent.clear();
			}
		}
	}
	else // LAYOUT_MULTIPART
	{
		QString eol = "\r\n";
		QString boundaryDelimiter = "--";

		//
		// Agregar las variables
		//
		foreach(QString key, variables.keys())
		{
			// Agregar boundary
			requestContent.append(boundaryDelimiter);
			requestContent.append(boundary);
			requestContent.append(eol);

			// Agregar header
			requestContent.append("Content-Disposition: form-data; ");
			requestContent.append(http_attribute_encode("name", key));
			requestContent.append(eol);
			requestContent.append("Content-Type: text/plain");
			requestContent.append(eol);

			// ...
			requestContent.append(eol);

			// Agregar el contenido de la variable
			requestContent.append(variables.value(key));
			requestContent.append(eol);
		}
		//
		// Agregar los archivos
		//
		foreach(HttpRequestFile info, files)
		{
			QFileInfo fi(info.localFilename);

			//
			// Asegurarse de que existes las dos
			// variables necesarias son válidas
			//
			if(info.varName.isEmpty()
				|| info.localFilename.isEmpty()
				|| !fi.exists()
				|| !fi.isFile()
				|| !fi.isReadable())
			{
				continue;
			}
			//
			// Abrir el archivo
			//
			QFile iod(info.localFilename);
			if(!iod.open(QIODevice::ReadOnly))
			{
				continue;
			}
			//
			// ...
			//
			if(info.requestFilename.isEmpty())
			{
				info.requestFilename = fi.fileName();
				if(info.requestFilename.isEmpty())
				{
					info.requestFilename = "file";
				}
			}
			// ...
			requestContent.append(boundaryDelimiter);
			requestContent.append(boundary);
			requestContent.append(eol);

			//
			// Agregar header del archivo
			//
			requestContent.append(QString("Content-Disposition: form-data; %1; %2")
								  .arg(http_attribute_encode("name", info.varName),
									   http_attribute_encode("filename", info.requestFilename)));
			requestContent.append(eol);

			//
			// Agregar el tipo del archivio
			//
			if(!info.mimeType.isEmpty())
			{
				requestContent.append("Content-Type: ");
				requestContent.append(info.mimeType);
				requestContent.append(eol);
			}
			//
			// Agregar el contenido del archivo
			//
			requestContent.append("Content-Transfer-Encoding: binary");
			requestContent.append(eol);

			requestContent.append(eol);
			requestContent.append(iod.readAll());
			requestContent.append(eol);
			iod.close();
		}
		//
		// Agregar fin de cuerpo
		//
		requestContent.append(boundaryDelimiter);
		requestContent.append(boundary);
		requestContent.append(boundaryDelimiter);
	}

	//
	// Hacer el request
	//
	QNetworkRequest networkRequest = QNetworkRequest(QUrl(url));

	//
	// Preparar el header
	//
	networkRequest.setRawHeader("User-Agent", "HttpRequestAgent");
	switch(variableLayout)
	{
		case LAYOUT_MULTIPART:
			networkRequest.setHeader(QNetworkRequest::ContentTypeHeader, "multipart/form-data; boundary="+boundary);
			break;
		case LAYOUT_URL_ENCODED:
			networkRequest.setHeader(QNetworkRequest::ContentTypeHeader, "application/x-www-form-urlencoded");
			break;
	}

	foreach(QString key, headers.keys())
	{
#if (QT_VERSION_MAJOR==4)
		networkRequest.setRawHeader(key.toAscii(), headers.value(key).toAscii());
#elif(QT_VERSION_MAJOR==5)
		networkRequest.setRawHeader(key.toLatin1(), headers.value(key).toLatin1());
#endif
	}

	if(httpMethod.toUpper() == "GET")
	{
		mngr->get(networkRequest);
	}
	else if(httpMethod.toUpper() == "POST")
	{
		mngr->post(networkRequest, requestContent);
	}
	else if(httpMethod.toUpper() == "PUT")
	{
		mngr->put(networkRequest, requestContent);
	}
	else if(httpMethod.toUpper() == "HEAD")
	{
		mngr->head(networkRequest);
	}
	else if(httpMethod.toUpper() == "DELETE")
	{
		mngr->deleteResource(networkRequest);
	}
	else
	{
		class Buffer : public QBuffer
		{
		public:
			QByteArray a;
			Buffer(const QByteArray& _a, QObject* parent) : QBuffer(&a, parent), a(_a)
			{
			}
			~Buffer()
			{
#ifdef QT_DEBUG
				qDebug("~Buffer");
#endif
			}
		};
		mngr->sendCustomRequest(networkRequest, httpMethod.toLatin1(), new Buffer(requestContent, this));
	}
}
void HttpRequest::addFile(QString varName, QString localFilename, QString requestFilename, QString mimeType)
{
	HttpRequestFile file;

	file.varName = varName;
	file.mimeType = mimeType;
	file.localFilename = localFilename;
	file.requestFilename = requestFilename;

	files.append(file);
}
void HttpRequest::addHeader(QString key, QString value)
{
	headers[key] = value;
}
void HttpRequest::addVariable(QString key, QString value)
{
	variables[key] = value;
}
void HttpRequest::slotNetworkManager_finished(QNetworkReply* reply)
{
#ifdef QT_DEBUG
	qDebug("slotNetworkManager_finished");
#endif
	if(QNetworkReply::NoError != (errorType = reply->error()))
	{
		errorString = reply->errorString();
	}
	response = reply->readAll();
	statusCode = reply->attribute(QNetworkRequest::HttpStatusCodeAttribute).toInt();

	reply->deleteLater();

	emit onFinished(this);

	this->deleteLater();
}



