#ifndef PRODUCTSFORM_H
#define PRODUCTSFORM_H

#include <QWidget>

namespace Ui {
class ProductsForm;
}

class HttpRequest;

class ProductsForm : public QWidget
{
	Q_OBJECT
	Ui::ProductsForm* ui;
public:
	explicit ProductsForm(QString token, QWidget *parent = 0);
	~ProductsForm();
private:
private slots:
	void slotRequest_finished(HttpRequest* req);
};

#endif // PRODUCTSFORM_H
