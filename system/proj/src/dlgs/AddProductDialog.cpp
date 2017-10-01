#include "AddProductDialog.h"
#include "ui_AddProductDialog.h"
#include <QMessageBox>

#include <http/http.h>
#include <json/json.h>

#include <src/dlgs/AddBrandDialog.h>
#include <src/dlgs/AddProductCategoryDialog.h>
#include <src/dlgs/AddProviderDialog.h>

AddProductDialog::AddProductDialog(QString token, QWidget *parent) :
    QDialog(parent),
    ui(new Ui::AddProductDialog)
{
    ui->setupUi(this);

	setMaximumHeight(sizeHint().height());
	setMinimumHeight(sizeHint().height());

	stage = 0;
	authToken = token;
	initialMode = true;
	requestBrands();
}
AddProductDialog::~AddProductDialog()
{
    delete ui;
}
void AddProductDialog::enableElems(bool e)
{
	ui->btnOk->setEnabled(e);
	ui->btnCancel->setEnabled(e);
	ui->txtName->setEnabled(e);
	ui->cboBrand->setEnabled(e);
	ui->cboCategory->setEnabled(e);
	ui->cboProviders->setEnabled(e);
	ui->spinBoxPrice1->setEnabled(e);
	ui->spinBoxPrice2->setEnabled(e);
	ui->btnAddBrand->setEnabled(e);
	ui->btnAddCategory->setEnabled(e);
	ui->btnAddProvider->setEnabled(e);
}
void AddProductDialog::requestBrands()
{
	HttpRequest* req = new HttpRequest(1, this, SLOT(slotRequest_finished(HttpRequest*)));
	req->addHeader("Authorization", authToken);
	req->exec(WWW"/brands", "GET");
}
void AddProductDialog::requestCategories()
{
	HttpRequest* req = new HttpRequest(2, this, SLOT(slotRequest_finished(HttpRequest*)));
	req->addHeader("Authorization", authToken);
	req->exec(WWW"/categories", "GET");
}
void AddProductDialog::requestProviders()
{
	HttpRequest* req = new HttpRequest(3, this, SLOT(slotRequest_finished(HttpRequest*)));
	req->addHeader("Authorization", authToken);
	req->exec(WWW"/providers", "GET");
}
void AddProductDialog::accept()
{
	HttpRequest* req = new HttpRequest(4, this, SLOT(slotRequest_finished(HttpRequest*)));
	req->addHeader("Authorization", authToken);
	req->addVariable("name", ui->txtName->text());
	req->addVariable("brand_id", ui->cboBrand->itemData(ui->cboBrand->currentIndex(), Qt::UserRole).toString());
	req->addVariable("category_id", ui->cboCategory->itemData(ui->cboCategory->currentIndex(), Qt::UserRole).toString());
	req->addVariable("provider_id", ui->cboProviders->itemData(ui->cboProviders->currentIndex(), Qt::UserRole).toString());
	req->addVariable("retail_price", QString::number(ui->spinBoxPrice1->value()));
	req->addVariable("wholesale_price", QString::number(ui->spinBoxPrice2->value()));

	req->exec(WWW"/products", "POST");
}
void AddProductDialog::slotAddBrand()
{
	if(AddBrandDialog(authToken).exec() == QDialog::Accepted)
	{
		enableElems(false);
		ui->cboBrand->clear();
		requestBrands();
	}
}
void AddProductDialog::slotAddCategory()
{
	if(AddProductCategoryDialog(authToken).exec() == QDialog::Accepted)
	{
		enableElems(false);
		ui->cboCategory->clear();
		requestCategories();
	}
}
void AddProductDialog::slotAddProvider()
{
	if(AddProviderDialog(authToken).exec() == QDialog::Accepted)
	{
		enableElems(false);
		ui->cboProviders->clear();
		requestProviders();
	}
}
void AddProductDialog::slotRequest_finished(HttpRequest* req)
{
	int ret;
	JsonObject* obj;
	switch(req->getId())
	{
		case 1:
			if(NULL != (obj = JsonParser().parse(req->getResponse())))
			{
				if(0 == (ret = obj->value("ret")->toInt()))
				{
					JsonArray* brands = obj->value("brands")->toArray();
					for(int i = 0; i < brands->size(); i++)
					{
						JsonObject* brand = brands->at(i)->toObject();
						ui->cboBrand->addItem(
								brand->value("name")->toString(), brand->value("id")->toString());
					}
				}
				else
				{
					QMessageBox::information(0, tr("Error"), tr("Error: ") + QString::number(ret));
				}
				stage++;
				delete obj;
				// ...
				if(initialMode)
				{
					requestCategories();
				}
			}
			break;
		case 2:
			if(NULL != (obj = JsonParser().parse(req->getResponse())))
			{
				if(0 == (ret = obj->value("ret")->toInt()))
				{
					JsonArray* categories = obj->value("categories")->toArray();
					for(int i = 0; i < categories->size(); i++)
					{
						JsonObject* cat = categories->at(i)->toObject();
						ui->cboCategory->addItem(
								cat->value("description")->toString(), cat->value("id")->toString());
					}
				}
				else
				{
					QMessageBox::information(0, tr("Error"), tr("Error: ") + QString::number(ret));
				}
				stage++;
				delete obj;
				// ...
				if(initialMode)
				{
					requestProviders();
				}
			}
			break;
		case 3:
			if(NULL != (obj = JsonParser().parse(req->getResponse())))
			{
				if(0 == (ret = obj->value("ret")->toInt()))
				{
					JsonArray* providers = obj->value("providers")->toArray();
					for(int i = 0; i < providers->size(); i++)
					{
						JsonObject* prov = providers->at(i)->toObject();
						ui->cboProviders->addItem(
								prov->value("name")->toString(), prov->value("id")->toString());
					}
				}
				else
				{
					QMessageBox::information(0, tr("Error"), tr("Error: ") + QString::number(ret));
				}
				stage++;
				delete obj;
			}
			break;
		case 4:
			if(NULL != (obj = JsonParser().parse(req->getResponse())))
			{
				if(0 == (ret = obj->value("ret")->toInt()))
				{
					QDialog::accept();
				}
				else
				{
					QMessageBox::information(0, tr("Error"), tr("Error: ") + QString::number(ret));
				}
				delete obj;
			}
			return;
	}
	if(stage >= 3)
	{
		enableElems(true);
		if(initialMode)
		{
			initialMode = false;
			ui->txtName->setFocus();
		}
	}
}

