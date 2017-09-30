#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
	Q_OBJECT
	Ui::MainWindow*	ui;
	QString			authToken;
public:
	explicit MainWindow(const QString& token, QWidget *parent = 0);
	~MainWindow();

private:
};

#endif // MAINWINDOW_H
