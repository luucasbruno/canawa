#ifndef CATEGORIESFORM_H
#define CATEGORIESFORM_H

#include <QWidget>

namespace Ui {
class CategoriesForm;
}

class HttpRequest;

class CategoriesForm : public QWidget
{
	Q_OBJECT
	Ui::CategoriesForm* ui;

public:
	explicit CategoriesForm(QString token, QWidget *parent = 0);
	~CategoriesForm();

private:
private slots:
	void slotRequest_finished(HttpRequest* req);
};

#endif // CATEGORIESFORM_H
