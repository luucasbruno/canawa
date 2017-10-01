#ifndef ADDCLIENTDIALOG_H
#define ADDCLIENTDIALOG_H

#include <QDialog>

namespace Ui {
    class AddClientDialog;
}

class HttpRequest;

class AddClientDialog : public QDialog
{
    Q_OBJECT
	Ui::AddClientDialog*	ui;
	QString					authToken;
public:
	explicit AddClientDialog(QString token, QWidget *parent = 0);
    ~AddClientDialog();
private slots:
	void accept();
	void slotRequest_finished(HttpRequest* req);
};

#endif // ADDCLIENTDIALOG_H
