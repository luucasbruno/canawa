#ifndef ADDPRODUCTDIALOG_H
#define ADDPRODUCTDIALOG_H

#include <QDialog>

namespace Ui {
    class AddProductDialog;
}

class HttpRequest;

class AddProductDialog : public QDialog
{
    Q_OBJECT
	Ui::AddProductDialog*	ui;
	QString					authToken;
	int						stage;
	bool					initialMode;
public:
	explicit AddProductDialog(QString token, QWidget *parent = 0);
    ~AddProductDialog();
private:
	void enableElems(bool e);
	void requestBrands();
	void requestCategories();
	void requestProviders();
private slots:
	void accept();
	void slotAddBrand();
	void slotAddCategory();
	void slotAddProvider();
	void slotRequest_finished(HttpRequest* req);
};

#endif // ADDPRODUCTDIALOG_H
