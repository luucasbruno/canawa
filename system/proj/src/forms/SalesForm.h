#ifndef SALESFORM_H
#define SALESFORM_H

#include <QWidget>

namespace Ui {
class SalesForm;
}

class HttpRequest;

class SalesForm : public QWidget
{
	Q_OBJECT
	Ui::SalesForm* ui;
public:
	explicit SalesForm(QString token, QWidget *parent = 0);
	~SalesForm();
private:
private slots:
	void slotRequest_finished(HttpRequest* req);
};

#endif // SALESFORM_H
