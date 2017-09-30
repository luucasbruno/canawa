#include "ProvidersForm.h"
#include "ui_ProvidersForm.h"

#include <http/http.h>
#include <json/json.h>

ProvidersForm::ProvidersForm(QString token, QWidget *parent) :
	QWidget(parent),
	ui(new Ui::ProvidersForm)
{
	ui->setupUi(this);

	HttpRequest* req = new HttpRequest(this, SLOT(slotRequest_finished(HttpRequest*)));
	req->addHeader("Authorization", token);
	req->exec(WWW"/providers", "GET");
}

ProvidersForm::~ProvidersForm()
{
	delete ui;
}
void ProvidersForm::slotRequest_finished(HttpRequest* req)
{
	JsonObject* obj;
	if(NULL != (obj = JsonParser().parse(req->getResponse())))
	{
		if(obj->value("ret")->toInt() == 0)
		{
			JsonArray* providers = obj->value("providers")->toArray();

			for(int i = 0; i < providers->size(); i++)
			{
				JsonObject* prov = providers->at(i)->toObject();

				ui->tableWidget->insertRow(i);
				ui->tableWidget->setItem(i, 0, new QTableWidgetItem(prov->value("id")->toString()));
				ui->tableWidget->setItem(i, 1, new QTableWidgetItem(prov->value("name")->toString()));
				ui->tableWidget->setItem(i, 2, new QTableWidgetItem(prov->value("email")->toString()));
				ui->tableWidget->setItem(i, 3, new QTableWidgetItem(prov->value("phone")->toString()));
				ui->tableWidget->setItem(i, 4, new QTableWidgetItem(prov->value("company")->toString()));
			}
		}
	}
}

