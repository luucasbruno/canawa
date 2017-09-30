#include "ChooseClientDialog.h"
#include "ui_ChooseClientDialog.h"

#include <http/http.h>
#include <json/json.h>

ChooseClientDialog::ChooseClientDialog(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::ChooseClientDialog)
{
    ui->setupUi(this);
	inRequest = false;
	connect(ui->txtFind, SIGNAL(textChanged(QString)), this, SLOT(slotLineEdit_textChanged(QString)));
	connect(ui->tableWidget, SIGNAL(itemSelectionChanged()), this, SLOT(slotTableWidget_itemSelectionChanged()));
}

ChooseClientDialog::~ChooseClientDialog()
{
    delete ui;
}
QString ChooseClientDialog::getClientId() const
{
	return ui->tableWidget->selectedItems().at(0)->text();
}
QString ChooseClientDialog::getClientName() const
{
	return ui->tableWidget->selectedItems().at(1)->text();
}
void ChooseClientDialog::slotRequest_finished(HttpRequest* req)
{
	ui->tableWidget->clearContents();

	int ret;
	JsonObject* obj;
	if(NULL != (obj = JsonParser().parse(req->getResponse())))
	{
		if(0 == (ret = obj->value("ret")->toInt()))
		{
			JsonArray* array = obj->value("clients")->toArray();
			inRequest = false;
			ui->tableWidget->setRowCount(array->size());
			for(int i = 0; i < array->size(); i++)
			{
				JsonObject* prod = array->at(i)->toObject();

				ui->tableWidget->setItem(i, 0, new QTableWidgetItem(prod->value("id")->toString()));
				ui->tableWidget->setItem(i, 1, new QTableWidgetItem(prod->value("name")->toString()));
				ui->tableWidget->setItem(i, 2, new QTableWidgetItem(prod->value("email")->toString()));
				ui->tableWidget->setItem(i, 3, new QTableWidgetItem(prod->value("phone")->toString()));
			}
		}
		delete obj;
	}
	inRequest = false;
}
void ChooseClientDialog::slotLineEdit_textChanged(const QString& text)
{
	if(!inRequest)
	{
		if(text.isEmpty())
		{
			ui->tableWidget->clearContents();
			ui->tableWidget->setRowCount(0);
		}
		else
		{
			inRequest = true;
			HttpRequest* req = new HttpRequest((QObject*)this, SLOT(slotRequest_finished(HttpRequest*)));
			req->addVariable("pattern", text);
			req->exec(WWW"/clients", "GET");
		}
	}
}
void ChooseClientDialog::slotTableWidget_itemSelectionChanged()
{
	ui->btnSelect->setEnabled(!ui->tableWidget->selectedItems().isEmpty());
}

