#include "SalesForm.h"
#include "ui_SalesForm.h"

#include <http/http.h>
#include <json/json.h>

SalesForm::SalesForm(QString token, QWidget *parent) :
	QWidget(parent),
	ui(new Ui::SalesForm)
{
	ui->setupUi(this);

	HttpRequest* req = new HttpRequest(this, SLOT(slotRequest_finished(HttpRequest*)));
	req->addHeader("Authorization", token);
	req->exec(WWW"/sales", "GET");
}

SalesForm::~SalesForm()
{
	delete ui;
}
void SalesForm::slotRequest_finished(HttpRequest* req)
{
	JsonObject* obj;
	if(NULL != (obj = JsonParser().parse(req->getResponse())))
	{
		if(obj->value("ret")->toInt() == 0)
		{
			JsonArray* sales = obj->value("sales")->toArray();

			for(int i = 0; i < sales->size(); i++)
			{
				JsonObject* sale = sales->at(i)->toObject();

				ui->tableWidget->insertRow(i);
				ui->tableWidget->setItem(i, 0, new QTableWidgetItem(sale->value("id")->toString()));
				ui->tableWidget->setItem(i, 1, new QTableWidgetItem(sale->value("user")->toString()));
				ui->tableWidget->setItem(i, 2, new QTableWidgetItem(sale->value("client")->toString()));
				ui->tableWidget->setItem(i, 3, new QTableWidgetItem(sale->value("total")->toString()));
				ui->tableWidget->setItem(i, 4, new QTableWidgetItem(sale->value("timestamp")->toString()));
			}
		}
	}
}

