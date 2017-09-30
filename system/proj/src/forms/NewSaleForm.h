#ifndef NEWSALEFORM_H
#define NEWSALEFORM_H

#include <QWidget>

namespace Ui {
class NewSaleForm;
}

class HttpRequest;

class NewSaleForm : public QWidget
{
	Q_OBJECT
	Ui::NewSaleForm*		ui;
	QString					clientId;

	double					salePrice;
	QString					authToken;
public:
	explicit NewSaleForm(QString token, QWidget *parent = 0);
	~NewSaleForm();
private:
	void reset();
private slots:
	void slotButton();
	void slotTableWidget_itemSelectionChanged();
	void slotRequest_finished(HttpRequest* req);
};

#endif // NEWSALEFORM_H
