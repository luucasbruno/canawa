#include "ChooseProductDialog.h"
#include "ui_ChooseProductDialog.h"

#include <http/http.h>
#include <json/json.h>

ChooseProductDialog::ChooseProductDialog(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::ChooseProductDialog)
{
    ui->setupUi(this);
	inRequest = false;
	connect(ui->txtFind, SIGNAL(textChanged(QString)), this, SLOT(slotLineEdit_textChanged(QString)));
	connect(ui->tableWidget, SIGNAL(itemSelectionChanged()), this, SLOT(slotTableWidget_itemSelectionChanged()));
}

ChooseProductDialog::~ChooseProductDialog()
{
    delete ui;
}
QString ChooseProductDialog::getProductId() const
{
	return ui->tableWidget->selectedItems().at(0)->text();
}
QString ChooseProductDialog::getProductName() const
{
	return ui->tableWidget->selectedItems().at(1)->text();
}
QString ChooseProductDialog::getRetailPrice() const
{
	return ui->tableWidget->selectedItems().at(4)->text();
}
QString ChooseProductDialog::getWholesalePrice() const
{
	return ui->tableWidget->selectedItems().at(5)->text();
}
void ChooseProductDialog::slotRequest_finished(HttpRequest* req)
{
	ui->tableWidget->clearContents();

	int ret;
	JsonObject* obj;
	if(NULL != (obj = JsonParser().parse(req->getResponse())))
	{
		if(0 == (ret = obj->value("ret")->toInt()))
		{
			JsonArray* array = obj->value("products")->toArray();
			inRequest = false;
			ui->tableWidget->setRowCount(array->size());
			for(int i = 0; i < array->size(); i++)
			{
				JsonObject* prod = array->at(i)->toObject();

				ui->tableWidget->setItem(i, 0, new QTableWidgetItem(prod->value("id")->toString()));
				ui->tableWidget->setItem(i, 1, new QTableWidgetItem(prod->value("name")->toString()));
				ui->tableWidget->setItem(i, 2, new QTableWidgetItem(prod->value("brand")->toString()));
				ui->tableWidget->setItem(i, 3, new QTableWidgetItem(prod->value("provider")->toString()));
				ui->tableWidget->setItem(i, 4, new QTableWidgetItem(prod->value("retail_price")->toString()));
				ui->tableWidget->setItem(i, 5, new QTableWidgetItem(prod->value("wholesale_price")->toString()));
			}
		}
		delete obj;
	}
	inRequest = false;
}
void ChooseProductDialog::slotLineEdit_textChanged(const QString& text)
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
			req->exec(WWW"/products", "GET");
		}
	}
}
void ChooseProductDialog::slotTableWidget_itemSelectionChanged()
{
	ui->btnSelect->setEnabled(!ui->tableWidget->selectedItems().isEmpty());
}
