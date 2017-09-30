#ifndef CHOOSECLIENTDIALOG_H
#define CHOOSECLIENTDIALOG_H

#include <QDialog>

namespace Ui {
    class ChooseClientDialog;
}

class HttpRequest;

class ChooseClientDialog : public QDialog
{
    Q_OBJECT
	Ui::ChooseClientDialog*		ui;
	bool						inRequest;
public:
    explicit ChooseClientDialog(QWidget *parent = 0);
    ~ChooseClientDialog();
public:
	QString getClientId() const;
	QString getClientName() const;
private slots:
	void slotRequest_finished(HttpRequest* req);
	void slotLineEdit_textChanged(const QString& text);
	void slotTableWidget_itemSelectionChanged();
};

#endif // CHOOSECLIENTDIALOG_H
