#include "AddDeliveryDialog.h"
#include "ui_AddDeliveryDialog.h"

#include <http/http.h>

AddDeliveryDialog::AddDeliveryDialog(QString ___saleId, QString ___authToken, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::AddDeliveryDialog)
{
    ui->setupUi(this);
	ui->dateEdit->setDate(QDate().currentDate());
	saleId = ___saleId;
	authToken = ___authToken;
}
AddDeliveryDialog::~AddDeliveryDialog()
{
    delete ui;
}
void AddDeliveryDialog::accept()
{
	HttpRequest* req = new HttpRequest(this, SLOT(slotRequest_finished(HttpRequest*)));
	req->addHeader("Authorization", authToken);
	req->addVariable("sale_id", saleId);
	req->addVariable("date", ui->dateEdit->date().toString("yyyy-MM-dd"));
	req->addVariable("location", ui->txtLocation->text());
	req->exec(WWW"/deliveries", "POST");
}
void AddDeliveryDialog::slotRequest_finished(HttpRequest* req)
{
	QDialog::accept();
}
