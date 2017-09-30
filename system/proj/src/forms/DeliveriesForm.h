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
public:
	explicit DeliveriesForm(QString token, QWidget *parent = 0);
	~DeliveriesForm();

private:
private slots:
	void slotRequest_finished(HttpRequest* req);
};

#endif // DELIVERIESFORM_H
