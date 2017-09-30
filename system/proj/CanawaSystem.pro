#-------------------------------------------------
#
# Project created by QtCreator 2017-09-30T08:43:58
#
#-------------------------------------------------

QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = CanawaSystem
TEMPLATE = app

# The following define makes your compiler emit warnings if you use
# any feature of Qt which has been marked as deprecated (the exact warnings
# depend on your compiler). Please consult the documentation of the
# deprecated API in order to know how to port your code away from it.
DEFINES += QT_DEPRECATED_WARNINGS

# You can also make your code fail to compile if you use deprecated APIs.
# In order to do so, uncomment the following line.
# You can also select to disable deprecated APIs only up to a certain version of Qt.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

#---------------------------------------------------------------------------------------------------
# Versión
#---------------------------------------------------------------------------------------------------
DEFINES += MAJOR_VERSION=1
DEFINES += MINOR_VERSION=0

#---------------------------------------------------------------------------------------------------
# Target
#---------------------------------------------------------------------------------------------------
CONFIG(debug, debug|release) {
TARGET = CanawaSystem_d
} else {
TARGET = CanawaSystem
}

#---------------------------------------------------------------------------------------------------
# Directorio de destino
#---------------------------------------------------------------------------------------------------
DESTDIR = ../bin

#---------------------------------------------------------------------------------------------------
# Archivos de código
#---------------------------------------------------------------------------------------------------
SOURCES += \
        src/main.cpp \
        src/MainWindow.cpp

HEADERS += \
        src/MainWindow.h

FORMS += \
        src/MainWindow.ui
