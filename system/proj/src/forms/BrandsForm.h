#ifndef BRANDSFORM_H
#define BRANDSFORM_H

#include <QWidget>

namespace Ui {
class BrandsForm;
}

class HttpRequest;

class BrandsForm : public QWidget
{
	Q_OBJECT
	Ui::BrandsForm* ui;
public:
	explicit BrandsForm(QString token, QWidget *parent = 0);
	~BrandsForm();
private slots:
	void slotRequest_finished(HttpRequest* req);
};

#endif // BRANDSFORM_H
