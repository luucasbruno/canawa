#ifndef CHOOSEPRODUCTDIALOG_H
#define CHOOSEPRODUCTDIALOG_H

#include <QDialog>

namespace Ui {
    class ChooseProductDialog;
}

class HttpRequest;

class ChooseProductDialog : public QDialog
{
    Q_OBJECT
	Ui::ChooseProductDialog*	ui;
	bool						inRequest;
public:
    explicit ChooseProductDialog(QWidget *parent = 0);
    ~ChooseProductDialog();
public:
	QString getProductId() const;
	QString getProductName() const;
	QString getRetailPrice() const;
	QString getWholesalePrice() const;
private:

private slots:
	void slotRequest_finished(HttpRequest* req);
	void slotLineEdit_textChanged(const QString& text);
	void slotTableWidget_itemSelectionChanged();
};

#endif // CHOOSEPRODUCTDIALOG_H
