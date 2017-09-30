#include "MainWindow.h"
#include <QApplication>

#include "http/http.h"
#include "dlgs/LoginDialog.h"

int main(int argc, char *argv[])
{
	QApplication a(argc, argv);
	LoginDialog dlg;

	if(dlg.exec() == QDialog::Accepted)
	{
		MainWindow w(dlg.getToken());
		w.show();
		return a.exec();
	}
	return 0;
}
