#include "AddBrandDialog.h"
#include "ui_AddBrandDialog.h"

#include <src/http/http.h>
#include <src/json/json.h>

#include <QMessageBox>

AddBrandDialog::AddBrandDialog(QString token, QWidget *parent) :
	QDialog(parent),
	ui(new Ui::AddBrandDialog)
{
	ui->setupUi(this);
	authToken = token;
	setMaximumHeight(sizeHint().height());
	setMinimumHeight(sizeHint().height());
}

AddBrandDialog::~AddBrandDialog()
{
	delete ui;
}
void AddBrandDialog::accept()
{
	ui->txtName->setEnabled(false);
	ui->btnOk->setEnabled(false);
	ui->btnCancel->setEnabled(false);

	HttpRequest* req = new HttpRequest(this, SLOT(slotRequest_finished(HttpRequest*)));
	req->addHeader("Authorization", authToken);
	req->addVariable("name", ui->txtName->text());
	req->addVariable("logo", "");
	req->exec(WWW "/brands", "POST");
}
void AddBrandDialog::slotRequest_finished(HttpRequest* req)
{
	bool ok = false;

	if(req->getStatusCode() == 200)
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
			}
			delete obj;
		}
	}
	if(ok)
	{
		QDialog::accept();
	}
	else
	{
		QMessageBox::information(this, tr("Error"), tr("Unknown error"));

		ui->txtName->setEnabled(true);
		ui->btnOk->setEnabled(true );
		ui->btnCancel->setEnabled(true);
	}
}

