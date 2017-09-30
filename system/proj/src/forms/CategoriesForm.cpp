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
			JsonArray* categories = obj->value("categories")->toArray();

			for(int i = 0; i < categories->size(); i++)
			{
				JsonObject* cat = categories->at(i)->toObject();

				ui->tableWidget->insertRow(i);
				ui->tableWidget->setItem(i, 0, new QTableWidgetItem(cat->value("id")->toString()));
				ui->tableWidget->setItem(i, 1, new QTableWidgetItem(cat->value("description")->toString()));
			}
		}
	}
}


