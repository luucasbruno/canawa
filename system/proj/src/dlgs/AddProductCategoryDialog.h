#ifndef ADDPRODUCTCATEGORYDIALOG_H
#define ADDPRODUCTCATEGORYDIALOG_H

#include <QDialog>

namespace Ui {
    class AddProductCategoryDialog;
}

class HttpRequest;

class AddProductCategoryDialog : public QDialog
{
    Q_OBJECT
	Ui::AddProductCategoryDialog*	ui;
	QString							authToken;
public:
	explicit AddProductCategoryDialog(QString token, QWidget *parent = 0);
    ~AddProductCategoryDialog();
private slots:
	void accept();
	void slotRequest_finished(HttpRequest* req);
};

#endif // ADDPRODUCTCATEGORYDIALOG_H
