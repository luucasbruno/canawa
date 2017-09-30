#include "ProductsForm.h"
#include "ui_ProductsForm.h"

#include <http/http.h>
#include <json/json.h>

ProductsForm::ProductsForm(QString token, QWidget *parent) :
	QWidget(parent),
	ui(new Ui::ProductsForm)
{
	ui->setupUi(this);

	HttpRequest* req = new HttpRequest(this, SLOT(slotRequest_finished(HttpRequest*)));
	req->addHeader("Authorization", token);
	req->exec(WWW"/products", "GET");
}

ProductsForm::~ProductsForm()
{
	delete ui;
}
void ProductsForm::slotRequest_finished(HttpRequest* req)
{
	JsonObject* obj;
	if(NULL != (obj = JsonParser().parse(req->getResponse())))
	{
		if(obj->value("ret")->toInt() == 0)
		{
			JsonArray* products = obj->value("products")->toArray();

			for(int i = 0; i < products->size(); i++)
			{
				JsonObject* prod = products->at(i)->toObject();

				ui->tableWidget->insertRow(i);
				ui->tableWidget->setItem(i, 0, new QTableWidgetItem(prod->value("id")->toString()));
				ui->tableWidget->setItem(i, 1, new QTableWidgetItem(prod->value("name")->toString()));
				ui->tableWidget->setItem(i, 2, new QTableWidgetItem(prod->value("brand")->toString()));
				ui->tableWidget->setItem(i, 3, new QTableWidgetItem(prod->value("category")->toString()));
				ui->tableWidget->setItem(i, 4, new QTableWidgetItem(prod->value("provider")->toString()));
				ui->tableWidget->setItem(i, 5, new QTableWidgetItem(prod->value("retail_price")->toString()));
				ui->tableWidget->setItem(i, 6, new QTableWidgetItem(prod->value("wholesale_price")->toString()));
			}
		}
	}
}

