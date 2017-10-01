#ifndef ADDBRANDDIALOG_H
#define ADDBRANDDIALOG_H

#include <QDialog>

namespace Ui {
class AddBrandDialog;
}

class HttpRequest;

class AddBrandDialog : public QDialog
{
	Q_OBJECT
	Ui::AddBrandDialog*	ui;
	QString				authToken;
public:
	explicit AddBrandDialog(QString token, QWidget *parent = 0);
	~AddBrandDialog();
private:
private slots:
	void accept();
	void slotRequest_finished(HttpRequest* req);
};

#endif // ADDBRANDDIALOG_H
