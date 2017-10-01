#include "AddClientDialog.h"
#include "ui_AddClientDialog.h"

#include <src/http/http.h>
#include <src/json/json.h>

#include <QMessageBox>

AddClientDialog::AddClientDialog(QString token, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::AddClientDialog)
{
    ui->setupUi(this);
	authToken = token;
	setMaximumHeight(sizeHint().height());
	setMinimumHeight(sizeHint().height());
}

AddClientDialog::~AddClientDialog()
{
    delete ui;
}
void AddClientDialog::accept()
{
	ui->txtName->setEnabled(false);
	ui->txtCuit->setEnabled(false);
	ui->txtEmail->setEnabled(false);
	ui->txtPhone->setEnabled(false);
	ui->txtLocation->setEnabled(false);

	HttpRequest* req = new HttpRequest(this, SLOT(slotRequest_finished(HttpRequest*)));
	req->addHeader("Authorization", authToken);
	req->addVariable("name", ui->txtName->text());
	req->addVariable("cuit", ui->txtCuit->text());
	req->addVariable("email", ui->txtEmail->text());
	req->addVariable("phone", ui->txtPhone->text());
	req->addVariable("location", ui->txtLocation->text());
	req->exec(WWW "/clients", "POST");
}
void AddClientDialog::slotRequest_finished(HttpRequest* req)
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
		ui->txtCuit->setEnabled(true);
		ui->txtEmail->setEnabled(true);
		ui->txtPhone->setEnabled(true);
		ui->txtLocation->setEnabled(true);
	}
}
