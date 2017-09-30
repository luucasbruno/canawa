#ifndef LOGINDIALOG_H
#define LOGINDIALOG_H

#include <QDialog>

namespace Ui {
class LoginDialog;
}
class HttpRequest;

class LoginDialog : public QDialog
{
	Q_OBJECT
	Ui::LoginDialog*	ui;
	QString				token;

public:
	explicit LoginDialog(QWidget *parent = 0);
	~LoginDialog();
public:
	QString getToken() const { return token; }
private slots:
	void accept();
	void slotRequest_finished(HttpRequest* req);
};

#endif // LOGINDIALOG_H
