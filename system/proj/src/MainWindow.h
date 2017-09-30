#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

namespace Ui {
class MainWindow;
}
class QSplitter;
class QTreeWidget;
class QTreeWidgetItem;

class MainWindow : public QMainWindow
{
	Q_OBJECT
	Ui::MainWindow*	ui;
	QString			authToken;

	QSplitter*		splitter;
	QTreeWidget*	treeWidget;
	QWidget*		currentForm;
	QWidget*		containerWidget;
public:
	explicit MainWindow(const QString& token, QWidget *parent = 0);
	~MainWindow();
private:
	void initActions();
	void initTreeView();
	void newTreeItem(const QString& label, int type);
	void initContainer();
	void initSplitter();
	void setCurrentWidget(QWidget* w);
private slots:
	void slotAction();
	void slotTreeView_itemDoubleClicked(QTreeWidgetItem* item, int column);
	void slotTreeView_customContextMenuRequested(const QPoint& pos);
};

#endif // MAINWINDOW_H
