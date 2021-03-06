#ifndef ADDPROVIDERDIALOG_H
#define ADDPROVIDERDIALOG_H

#include <QDialog>

namespace Ui {
    class AddProviderDialog;
}

#include <src/http/http.h>

class AddProviderDialog : public QDialog
{
    Q_OBJECT
	Ui::AddProviderDialog*	ui;
	QString					authToken;
public:
	explicit AddProviderDialog(QString token, QWidget *parent = 0);
    ~AddProviderDialog();
private slots:
	void accept();
	void slotRequest_finished(HttpRequest* req);
};

#endif // ADDPROVIDERDIALOG_H
