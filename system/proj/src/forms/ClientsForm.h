#ifndef CLIENTSFORM_H
#define CLIENTSFORM_H

#include <QWidget>

namespace Ui {
class ClientsForm;
}

class HttpRequest;

class ClientsForm : public QWidget
{
	Q_OBJECT
	Ui::ClientsForm*	ui;
public:
	explicit ClientsForm(QString token, QWidget *parent = 0);
	~ClientsForm();
private:
private slots:
	void slotRequest_finished(HttpRequest* req);
};

#endif // CLIENTSFORM_H
