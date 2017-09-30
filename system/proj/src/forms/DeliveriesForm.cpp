#include "DeliveriesForm.h"
#include "ui_DeliveriesForm.h"

#include <http/http.h>
#include <json/json.h>

DeliveriesForm::DeliveriesForm(QString token, QWidget *parent) :
	QWidget(parent),
	ui(new Ui::DeliveriesForm)
{
	ui->setupUi(this);

	HttpRequest* req = new HttpRequest(this, SLOT(slotRequest_finished(HttpRequest*)));
	req->addHeader("Authorization", token);
	req->exec(WWW"/deliveries", "GET");
}

DeliveriesForm::~DeliveriesForm()
{
	delete ui;
}

void DeliveriesForm::slotRequest_finished(HttpRequest* req)
{
	JsonObject* obj;
	if(NULL != (obj = JsonParser().parse(req->getResponse())))
	{
		if(obj->value("ret")->toInt() == 0)
		{
			JsonArray* deliveries = obj->value("deliveries")->toArray();

			for(int i = 0; i < deliveries->size(); i++)
			{
				JsonObject* del = deliveries->at(i)->toObject();

				ui->tableWidget->insertRow(i);
				ui->tableWidget->setItem(i, 0, new QTableWidgetItem(del->value("id")->toString()));
				ui->tableWidget->setItem(i, 1, new QTableWidgetItem(del->value("date")->toString()));
				ui->tableWidget->setItem(i, 2, new QTableWidgetItem(del->value("location")->toString()));
				ui->tableWidget->setItem(i, 3, new QTableWidgetItem(del->value("delivered")->toString()));
			}
		}
	}
}
