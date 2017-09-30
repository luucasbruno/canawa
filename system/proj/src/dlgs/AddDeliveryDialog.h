#ifndef ADDDELIVERYDIALOG_H
#define ADDDELIVERYDIALOG_H

#include <QDialog>

namespace Ui {
    class AddDeliveryDialog;
}
class HttpRequest;

class AddDeliveryDialog : public QDialog
{
    Q_OBJECT
	Ui::AddDeliveryDialog *ui;

	QString saleId;
	QString authToken;
public:
	explicit AddDeliveryDialog(QString saleId, QString authToken, QWidget *parent = 0);
    ~AddDeliveryDialog();
private slots:
	void accept();
	void slotRequest_finished(HttpRequest* req);
};

#endif // ADDDELIVERYDIALOG_H
