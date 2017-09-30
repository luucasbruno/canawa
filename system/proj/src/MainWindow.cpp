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

MainWindow::MainWindow(const QString &token, QWidget *parent) :
	QMainWindow(parent),
	ui(new Ui::MainWindow)
{
	ui->setupUi(this);

	authToken = token;
}

MainWindow::~MainWindow()
{
	delete ui;
}
