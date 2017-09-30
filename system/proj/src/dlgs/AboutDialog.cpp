#include "AboutDialog.h"
#include "ui_AboutDialog.h"
#include <QtGui>


AboutDialog::AboutDialog(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::AboutDialog)
{
    ui->setupUi(this);

	// Mostrar información
	{
		QString s;
		QFileInfo info(qApp->applicationFilePath());

		ui->lblTimeValue->setText(info.lastModified().time().toString());
		ui->lblDateValue->setText(info.lastModified().date().toString());
		ui->lblVersionValue->setText(QString::number(MAJOR_VERSION) + "." + QString::number(MINOR_VERSION));
		ui->lblDevelopersValue->setText("Lucas Bruno\nIvan Mansilla\nGermán Martínez");
	}
}

AboutDialog::~AboutDialog()
{
    delete ui;
}
