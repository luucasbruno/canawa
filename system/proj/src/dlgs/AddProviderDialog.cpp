#include "AddProviderDialog.h"
#include "ui_AddProviderDialog.h"

#include <src/http/http.h>
#include <src/json/json.h>

#include <QMessageBox>

AddProviderDialog::AddProviderDialog(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::AddProviderDialog)
{
    ui->setupUi(this);

	setMaximumHeight(sizeHint().height());
	setMinimumHeight(sizeHint().height());
}

AddProviderDialog::~AddProviderDialog()
{
    delete ui;
}
void AddProviderDialog::accept()
{
	HttpRequest* req = new HttpRequest(this, SLOT(slotRequest_finished(HttpRequest*)));

	ui->btnOk->setEnabled(false);
	ui->btnCancel->setEnabled(false);
	ui->txtName->setEnabled(false);
	ui->txtEmail->setEnabled(false);
	ui->txtPhone->setEnabled(false);
	ui->txtCompany->setEnabled(false);

	req->addVariable("name", ui->txtName->text());
	req->addVariable("email", ui->txtEmail->text());
	req->addVariable("phone", ui->txtPhone->text());
	req->addVariable("company", ui->txtCompany->text());
	req->exec(WWW "/providers", "POST");
}
void AddProviderDialog::slotRequest_finished(HttpRequest* req)
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

		ui->btnOk->setEnabled(true );
		ui->btnCancel->setEnabled(true);
		ui->txtName->setEnabled(true);
		ui->txtEmail->setEnabled(true);
		ui->txtPhone->setEnabled(true);
		ui->txtCompany->setEnabled(true);
	}
}


