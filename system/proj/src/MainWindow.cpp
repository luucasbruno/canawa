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

#include "Settings.h"
#include "dlgs/AboutDialog.h"

MainWindow::MainWindow(const QString &token, QWidget *parent) :
	QMainWindow(parent),
	ui(new Ui::MainWindow)
{
	ui->setupUi(this);
	// ...
	QSettings s(SETTINGS_ORGANIZATION, SETTINGS_APPLICATION);
	// ...
	authToken = token;

	initActions();

	//
	// Restaurar estado anterior
	//
	restoreGeometry(s.value("WindowGeometry").toByteArray());
	restoreState(s.value("WindowState").toByteArray());
}

MainWindow::~MainWindow()
{
	QSettings s(SETTINGS_ORGANIZATION, SETTINGS_APPLICATION);
	s.setValue("WindowState", saveState());
	s.setValue("WindowGeometry", saveGeometry());
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
