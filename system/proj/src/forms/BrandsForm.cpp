#include "BrandsForm.h"
#include "ui_BrandsForm.h"

#include <json/json.h>
#include <http/http.h>

BrandsForm::BrandsForm(QString token, QWidget *parent) :
	QWidget(parent),
	ui(new Ui::BrandsForm)
{
	ui->setupUi(this);

	HttpRequest* req = new HttpRequest(this, SLOT(slotRequest_finished(HttpRequest*)));
	req->addHeader("Authorization", token);
	req->exec(WWW"/brands", "GET");
}

BrandsForm::~BrandsForm()
{
	delete ui;
}
void BrandsForm::slotRequest_finished(HttpRequest* req)
{
	JsonObject* obj;
	if(NULL != (obj = JsonParser().parse(req->getResponse())))
	{
		if(obj->value("ret")->toInt() == 0)
		{
			JsonArray* brands = obj->value("brands")->toArray();

			for(int i = 0; i < brands->size(); i++)
			{
				JsonObject* brand = brands->at(i)->toObject();

				ui->tableWidget->insertRow(i);
				ui->tableWidget->setItem(i, 0, new QTableWidgetItem(brand->value("id")->toString()));
				ui->tableWidget->setItem(i, 1, new QTableWidgetItem(brand->value("name")->toString()));
				ui->tableWidget->setItem(i, 2, new QTableWidgetItem(brand->value("logo")->toString()));
			}
		}
	}
}


