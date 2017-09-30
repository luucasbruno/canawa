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
public:
    explicit AddClientDialog(QWidget *parent = 0);
    ~AddClientDialog();
private slots:
	void accept();
	void slotRequest_finished(HttpRequest* req);
};

#endif // ADDCLIENTDIALOG_H
