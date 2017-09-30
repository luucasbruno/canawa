#include "ClientsForm.h"
#include "ui_ClientsForm.h"

#include <QTableWidget>
#include <src/json/json.h>
#include <src/http/http.h>

ClientsForm::ClientsForm(QString token, QWidget *parent) :
	QWidget(parent),
	ui(new Ui::ClientsForm)
{
	ui->setupUi(this);

	HttpRequest* req = new HttpRequest(this, SLOT(slotRequest_finished(HttpRequest*)));
	req->addHeader("Authorization", token);
	req->exec(WWW"/clients", "GET");
}

ClientsForm::~ClientsForm()
{
	delete ui;
}
void ClientsForm::slotRequest_finished(HttpRequest* req)
{
	JsonObject* obj;
	if(NULL != (obj = JsonParser().parse(req->getResponse())))
	{
		if(obj->value("ret")->toInt() == 0)
		{
			JsonArray* clients = obj->value("clients")->toArray();

			for(int i = 0; i < clients->size(); i++)
			{
				JsonObject* cli = clients->at(i)->toObject();

				ui->tableWidget->insertRow(i);
				ui->tableWidget->setItem(i, 0, new QTableWidgetItem(cli->value("name")->toString()));
				ui->tableWidget->setItem(i, 1, new QTableWidgetItem(cli->value("email")->toString()));
				ui->tableWidget->setItem(i, 2, new QTableWidgetItem(cli->value("phone")->toString()));
				ui->tableWidget->setItem(i, 3, new QTableWidgetItem(cli->value("location")->toString()));
			}
		}
	}
}
