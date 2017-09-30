#include "CategoriesForm.h"
#include "ui_CategoriesForm.h"

#include <json/json.h>
#include <http/http.h>

CategoriesForm::CategoriesForm(QString token, QWidget *parent) :
	QWidget(parent),
	ui(new Ui::CategoriesForm)
{
	ui->setupUi(this);

	HttpRequest* req = new HttpRequest(this, SLOT(slotRequest_finished(HttpRequest*)));
	req->addHeader("Authorization", token);
	req->exec(WWW"/categories", "GET");
}

CategoriesForm::~CategoriesForm()
{
	delete ui;
}
void CategoriesForm::slotRequest_finished(HttpRequest* req)
{
	JsonObject* obj;
	if(NULL != (obj = JsonParser().parse(req->getResponse())))
	{
		if(obj->value("ret")->toInt() == 0)
		{
			JsonArray* clients = obj->value("categories")->toArray();

			for(int i = 0; i < clients->size(); i++)
			{
				JsonObject* cli = clients->at(i)->toObject();

				ui->tableWidget->insertRow(i);
				ui->tableWidget->setItem(i, 0, new QTableWidgetItem(cli->value("id")->toString()));
				ui->tableWidget->setItem(i, 1, new QTableWidgetItem(cli->value("description")->toString()));
			}
		}
	}
}


