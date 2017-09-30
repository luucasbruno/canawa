#ifndef PROVIDERSFORM_H
#define PROVIDERSFORM_H

#include <QWidget>

namespace Ui {
class ProvidersForm;
}

class HttpRequest;

class ProvidersForm : public QWidget
{
	Q_OBJECT
	Ui::ProvidersForm *ui;

public:
	explicit ProvidersForm(QString token, QWidget *parent = 0);
	~ProvidersForm();

private:
private slots:
	void slotRequest_finished(HttpRequest* req);
};

#endif // PROVIDERSFORM_H
