#include "LoginDialog.h"
#include "ui_LoginDialog.h"

#include "json/Json.h"
#include "json/JsonValue.h"
#include "json/JsonObject.h"
#include "json/JsonParser.h"

#include "http/http.h"
#include <QMessageBox>

#include <src/http/http.h>

LoginDialog::LoginDialog(QWidget *parent) :
	QDialog(parent),
	ui(new Ui::LoginDialog)
{
	ui->setupUi(this);

	setMinimumSize(sizeHint());
	setMaximumSize(sizeHint());
}

LoginDialog::~LoginDialog()
{
	delete ui;
}
void LoginDialog::accept()
{
	HttpRequest* req = new HttpRequest(this, SLOT(slotRequest_finished(HttpRequest*)));

	req->addVariable("username", ui->txtUsername->text());
	req->addVariable("password", ui->txtPassword->text());
	req->exec(WWW "/auth/login", "POST");
}
void LoginDialog::slotRequest_finished(HttpRequest* req)
{
	bool ok = false;
	int code = req->getStatusCode();
	if(code == 200)
	{
		QByteArray a = req->getResponse();
		QString    s = QString::fromUtf8(a.constData(), a.size());
#if 1
		// https://stackoverflow.com/questions/25898873/how-to-decode-a-qbytearray-using-utf-8-with-latin-1-fallback
		if(s.toUtf8() != a)
		{
			s = QString::fromLatin1(a.constData(), a.size());
		}
#endif
		JsonObject* obj;

		if(NULL != (obj = JsonParser().parse(s)))
		{
			if(obj->value("ret")->toInt() == 0)
			{
				ok = true;
				token = obj->value("token")->toString();
			}
			delete obj;
		}
	}
	else if(code == 500)
	{
		QMessageBox::information(0, tr("Error"), tr("System error"));
	}
	if(ok)
		QDialog::accept();
}
