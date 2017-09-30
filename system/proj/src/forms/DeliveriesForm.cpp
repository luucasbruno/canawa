#include "DeliveriesForm.h"
#include "ui_DeliveriesForm.h"

#include <http/http.h>
#include <json/json.h>

DeliveriesForm::DeliveriesForm(QString token, QWidget *parent) :
	QWidget(parent),
	ui(new Ui::DeliveriesForm)
{
	ui->setupUi(this);
	authToken = token;

	connect(ui->comboBox, SIGNAL(currentIndexChanged(int)), this, SLOT(slotComboBox_currentIndexChanged(int)));

	getDeliveries("all");
}

DeliveriesForm::~DeliveriesForm()
{
	delete ui;
}
void DeliveriesForm::getDeliveries(QString mode)
{
	ui->comboBox->setEnabled(false);
	ui->tableWidget->setEnabled(false);
	HttpRequest* req = new HttpRequest(this, SLOT(slotRequest_finished(HttpRequest*)));
	req->addHeader("Authorization", authToken);
	req->addVariable("mode", mode);
	req->exec(WWW"/deliveries", "GET");
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
	ui->comboBox->setEnabled(true);
	ui->tableWidget->setEnabled(true);
}
void DeliveriesForm::slotComboBox_currentIndexChanged(int index)
{
	switch(index)
	{
		case 0:		getDeliveries("all");		break;
		case 1:		getDeliveries("today");		break;
		case 2:		getDeliveries("delayed");	break;
		case 3:		getDeliveries("pending");	break;
	}
}
