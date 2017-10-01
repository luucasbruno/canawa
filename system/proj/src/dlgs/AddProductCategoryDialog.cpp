#include "AddProductCategoryDialog.h"
#include "ui_AddProductCategoryDialog.h"

#include <http/http.h>

AddProductCategoryDialog::AddProductCategoryDialog(QString token, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::AddProductCategoryDialog)
{
    ui->setupUi(this);
	authToken = token;
	setMaximumHeight(sizeHint().height());
	setMinimumHeight(sizeHint().height());
}

AddProductCategoryDialog::~AddProductCategoryDialog()
{
    delete ui;
}
void AddProductCategoryDialog::accept()
{
	ui->btnOk->setEnabled(false);
	ui->btnCancel->setEnabled(false);
	ui->txtDescription->setEnabled(false);

	HttpRequest* req = new HttpRequest(this, SLOT(slotRequest_finished(HttpRequest*)));
	req->addHeader("Authorization", authToken);
	req->addVariable("description", ui->txtDescription->text());
	req->exec(WWW"/categories", "POST");
}
void AddProductCategoryDialog::slotRequest_finished(HttpRequest* req)
{
	QDialog::accept();
}

