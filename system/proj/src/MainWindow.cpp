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

#include <QSettings>
#include <QSplitter>
#include <QTreeWidget>
#include <QVBoxLayout>

#include "Settings.h"
#include "dlgs/AboutDialog.h"

#include "forms/HomeForm.h"

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

	initTreeView();
	initContainer();
	initSplitter();

	setCurrentWidget(new HomeForm());

	//
	// Restaurar estado anterior
	//
	restoreGeometry(s.value("WindowGeometry").toByteArray());
	restoreState(s.value("WindowState").toByteArray());
	splitter->restoreState(s.value("SplitterState").toByteArray());
}

MainWindow::~MainWindow()
{
	QSettings s(SETTINGS_ORGANIZATION, SETTINGS_APPLICATION);
	s.setValue("WindowState", saveState());
	s.setValue("WindowGeometry", saveGeometry());
	s.setValue("SplitterState", splitter->saveState());
	delete ui;
}
void MainWindow::initActions()
{
	connect(ui->actionFileExit, SIGNAL(triggered()), this, SLOT(slotAction()));
	connect(ui->actionHelpAbout, SIGNAL(triggered()), this, SLOT(slotAction()));
}
void MainWindow::initTreeView()
{
	treeWidget = new QTreeWidget();
	treeWidget->setHeaderHidden(true);
	newTreeItem(tr("Home"), TVW_HOME);
	newTreeItem(tr("Clients"), TVW_CLIENTS);
	newTreeItem(tr("Products"), TVW_PRODUCTS);
	newTreeItem(tr("Providers"), TVW_PROVIDERS);
	newTreeItem(tr("Categories"), TVW_CATEGORIES);
	newTreeItem(tr("Sales"), TVW_SALES);
	newTreeItem(tr("Deliveries"), TVW_DELIVERIES);

	treeWidget->setRootIsDecorated(false);
	treeWidget->setContextMenuPolicy(Qt::CustomContextMenu);
	connect(treeWidget, SIGNAL(itemDoubleClicked(QTreeWidgetItem*,int)), this, SLOT(slotTreeView_itemDoubleClicked(QTreeWidgetItem*,int)));
	connect(treeWidget, SIGNAL(customContextMenuRequested(QPoint)), this, SLOT(slotTreeView_customContextMenuRequested(QPoint)));
}
void MainWindow::newTreeItem(const QString& label, int type)
{
	QTreeWidgetItem* item = new QTreeWidgetItem(QStringList() << label);
	item->setData(0, Qt::UserRole, type);
	treeWidget->addTopLevelItem(item);
}
void MainWindow::initContainer()
{
	currentForm = 0;
	containerWidget = new QWidget();
	QLayout* l = new QVBoxLayout();
	l->setContentsMargins(0, 0, 0, 0);
	containerWidget->setLayout(l);
}
void MainWindow::initSplitter()
{
	splitter = new QSplitter();
	splitter->addWidget(treeWidget);
	splitter->addWidget(containerWidget);
	splitter->setStretchFactor(0, 0);
	splitter->setStretchFactor(1, 1);

	setCentralWidget(splitter);
}
void MainWindow::setCurrentWidget(QWidget* w)
{
	if(currentForm != NULL)
	{
		currentForm->hide();
		containerWidget->layout()->removeWidget(currentForm);
	}
	currentForm = w;
	if(w != NULL)
	{
		containerWidget->layout()->addWidget(w);
		currentForm->show();
	}
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
void MainWindow::slotTreeView_itemDoubleClicked(QTreeWidgetItem* item, int column)
{
	int type = item->data(0, Qt::UserRole).toInt();

	switch(type)
	{
		case TVW_HOME:
			setCurrentWidget(new HomeForm());
			break;
		case TVW_CLIENTS:
			break;
		case TVW_PRODUCTS:
			break;
		case TVW_PROVIDERS:
			break;
		case TVW_CATEGORIES:
			break;
		case TVW_SALES:
			break;
		case TVW_DELIVERIES:
			break;
	}
}
void MainWindow::slotTreeView_customContextMenuRequested(const QPoint& pos)
{
}
