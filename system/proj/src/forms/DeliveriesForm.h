#ifndef DELIVERIESFORM_H
#define DELIVERIESFORM_H

#include <QWidget>

namespace Ui {
class DeliveriesForm;
}
class HttpRequest;

class DeliveriesForm : public QWidget
{
	Q_OBJECT
	Ui::DeliveriesForm* ui;
	QString				authToken;
public:
	explicit DeliveriesForm(QString token, QWidget *parent = 0);
	~DeliveriesForm();

private:
	void getDeliveries(QString mode);
private slots:
	void slotRequest_finished(HttpRequest* req);
	void slotComboBox_currentIndexChanged(int index);
};

#endif // DELIVERIESFORM_H
