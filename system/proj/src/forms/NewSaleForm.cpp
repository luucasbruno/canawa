#include "NewSaleForm.h"
#include "ui_NewSaleForm.h"

#include <QInputDialog>
#include <QMessageBox>

#include <http/http.h>
#include <json/json.h>

#include <src/dlgs/AddDeliveryDialog.h>
#include <src/dlgs/ChooseProductDialog.h>
#include <src/dlgs/ChooseClientDialog.h>

NewSaleForm::NewSaleForm(QString token, QWidget *parent) :
	QWidget(parent),
	ui(new Ui::NewSaleForm)
{
	ui->setupUi(this);

	salePrice = 0;
	authToken = token;
	connect(ui->tableWidget, SIGNAL(itemSelectionChanged()), this, SLOT(slotTableWidget_itemSelectionChanged()));
}

NewSaleForm::~NewSaleForm()
{
	delete ui;
}
void NewSaleForm::reset()
{
	clientId.clear();
	ui->txtClient->clear();
	ui->txtTotal->setText("0");
	ui->tableWidget->clearContents();
	ui->tableWidget->setRowCount(0);
	ui->btnSale->setEnabled(false);
	ui->btnAddProduct->setEnabled(false);
	ui->btnDeleteProduct->setEnabled(false);
	ui->txtTotal->setEnabled(false);
	ui->tableWidget->setEnabled(false);
	ui->btnReset->setEnabled(false);
}
void NewSaleForm::slotButton()
{
	QAbstractButton* btn = qobject_cast<QAbstractButton*>(sender());

	if(btn == ui->btnSale)
	{
		if(QMessageBox::Yes == QMessageBox::question(
				0,
				tr("Sell"),
				tr("Are you sure ready to sell?"),
				QMessageBox::Yes,
				QMessageBox::No))
		{
			QString productIds;
			QString productCounts;

			for(int i = 0; i < ui->tableWidget->rowCount(); i++)
			{
				if(i != 0)
				{
					productIds += ",";
					productCounts += ",";
				}
				productIds += ui->tableWidget->item(i, 0)->text();
				productCounts += ui->tableWidget->item(i, 2)->text();
			}
			HttpRequest* req = new HttpRequest(this, SLOT(slotRequest_finished(HttpRequest*)));
			req->addVariable("client_id", clientId);
			req->addVariable("client_type", "0");	// TODO:
			req->addVariable("product_ids", productIds);
			req->addVariable("product_counts", productCounts);
			req->exec(WWW"/sales", "POST");
		}
	}
	else if(btn == ui->btnSelectClient)
	{
		ChooseClientDialog dlg;

		if(dlg.exec() == QDialog::Accepted)
		{
			clientId = dlg.getClientId();
			ui->txtClient->setText(dlg.getClientName());
			// ...
			ui->txtTotal->setEnabled(true);
			ui->tableWidget->setEnabled(true);
			ui->btnAddProduct->setEnabled(true);
			ui->btnReset->setEnabled(true);
		}
	}
	else if(btn == ui->btnAddProduct)
	{
		ChooseProductDialog dlg;

		if(dlg.exec() == QDialog::Accepted)
		{
			QString id = dlg.getProductId();
			QString name = dlg.getProductName();
			QString price = dlg.getRetailPrice();	// TODO:
			bool    ok;
			int     count = QInputDialog::getInt(0, tr("Product count"), tr("Count:"), 1, 1, INT_MAX, 1, &ok);
			double  totalPrice = dlg.getRetailPrice().toDouble() * (double)count;
			if(ok)
			{
				int row = ui->tableWidget->rowCount();
				ui->tableWidget->insertRow(row);
				ui->tableWidget->setItem(row, 0, new QTableWidgetItem(id));
				ui->tableWidget->setItem(row, 1, new QTableWidgetItem(name));
				ui->tableWidget->setItem(row, 2, new QTableWidgetItem(QString::number(count)));
				ui->tableWidget->setItem(row, 3, new QTableWidgetItem(price));
				ui->tableWidget->setItem(row, 4, new QTableWidgetItem(QString::number(totalPrice)));

				ui->btnSale->setEnabled(true);

				salePrice += totalPrice;
				ui->txtTotal->setText(QString::number(salePrice));
			}
		}
	}
	else if(btn == ui->btnDeleteProduct)
	{
		int row = ui->tableWidget->currentIndex().row();
		salePrice -= ui->tableWidget->item(row, 4)->text().toDouble();
		ui->txtTotal->setText(QString::number(salePrice));
		ui->tableWidget->removeRow(row);
	}
	else if(btn == ui->btnReset)
	{
		if(QMessageBox::Yes == QMessageBox::question(
				0,
				tr("Reset"),
				tr("Are you sure do you want reset?"),
				QMessageBox::Yes,
				QMessageBox::No))
		{
			reset();
		}
	}
}
void NewSaleForm::slotTableWidget_itemSelectionChanged()
{
	ui->btnSale->setEnabled(!ui->tableWidget->selectedItems().isEmpty());
	ui->btnDeleteProduct->setEnabled(!ui->tableWidget->selectedItems().isEmpty());
}
void NewSaleForm::slotRequest_finished(HttpRequest* req)
{
	int ret;
	JsonObject* obj;
	if(NULL != (obj = JsonParser().parse(req->getResponse())))
	{
		if(0 == (ret = obj->value("ret")->toInt()))
		{
			reset();
			ui->btnSelectClient->setEnabled(false);

			if(QMessageBox::Yes == QMessageBox::question(
					0,
					tr("Delivery"),
					tr("Sold!. Deliver this sale?"),
					QMessageBox::Yes,
					QMessageBox::No))
			{
				int saleId = obj->value("sale_id")->toInt();

				AddDeliveryDialog(QString::number(saleId), authToken).exec();
			}
			ui->btnSelectClient->setEnabled(true);
		}
		else
		{
			QMessageBox::information(0, tr("Error"), tr("Error: ") + QString::number(ret));
		}
	}
}
