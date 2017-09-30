////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// HttpRequest.h
///
/// Clase para facilitar los request's http
///
/// Autor: Germán Martínez
/// Licencia: GPL-3.0
/// Referencia: http://www.creativepulse.gr/en/blog/2014/restful-api-requests-using-qt-cpp-for-linux-mac-osx-ms-windows
///
////////////////////////////////////////////////////////////////////////////////////////////////////
#ifndef HTTPREQUEST_H
#define HTTPREQUEST_H
#include <QVector>
#include <QObject>
#include <QMap>
#include <QList>

class QNetworkReply;
class QNetworkAccessManager;

class HttpRequest : public QObject
{
	Q_OBJECT
	class HttpRequestFile
	{
	public:
		QString varName;		// Nombre de la variable
		QString mimeType;
		QString localFilename;
		QString requestFilename;
	};

	QNetworkAccessManager*	mngr;


	QList<HttpRequestFile>	files;
	QMap<QString,QString>	headers;
	QMap<QString,QString>	variables;

	//
	// Resultado
	//
	QByteArray				response;
	int						errorType;
	QString					errorString;
	int						statusCode;
	int						requestId;
public:
	HttpRequest(QObject* obj, const char* slot);
	HttpRequest(int id, QObject* obj, const char* slot);
	~HttpRequest();
public:
	void exec(QString url, const QString& method);
public:
	int getId() const { return requestId; }
	int getStatusCode() const { return statusCode; }
	QByteArray getResponse() const { return response; }
public:
	void addFile(QString varName, QString localFilename, QString requestFilename, QString mimeType);
	void addHeader(QString key, QString value);
	void addVariable(QString key, QString value);
signals:
	void onFinished(HttpRequest* req);
private slots:
	void slotNetworkManager_finished(QNetworkReply* reply);
};

#endif // HTTPREQUEST_H
