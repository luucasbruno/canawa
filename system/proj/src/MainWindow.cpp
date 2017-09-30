#include "MainWindow.h"
#include "ui_MainWindow.h"

enum
{
	TVW_HOME,
	TVW_CLIENTS,
	TVW_PRODUCTS,
	TVW_PROVIDERS,
	TVW_CATEGORIES,
	TVW_SALES,
	TVW_DELIVERIES,
};

#include "dlgs/AboutDialog.h"

MainWindow::MainWindow(const QString &token, QWidget *parent) :
	QMainWindow(parent),
	ui(new Ui::MainWindow)
{
	ui->setupUi(this);

	authToken = token;

	initActions();
}

MainWindow::~MainWindow()
{
	delete ui;
}
void MainWindow::initActions()
{
	connect(ui->actionFileExit, SIGNAL(triggered()), this, SLOT(slotAction()));
	connect(ui->actionHelpAbout, SIGNAL(triggered()), this, SLOT(slotAction()));
}
void MainWindow::slotAction()
{
	QAction* action = qobject_cast<QAction*>(sender());

	if(action == ui->actionFileExit)
	{
		close();
	}
	else if(action == ui->actionHelpAbout)
	{
		AboutDialog().exec();
	}
}
