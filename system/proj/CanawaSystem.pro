#-------------------------------------------------
#
# Project created by QtCreator 2017-09-30T08:43:58
#
#-------------------------------------------------

QT       += core gui network

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
# Directorios de inclusión
#---------------------------------------------------------------------------------------------------
INCLUDEPATH += src

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
        src/MainWindow.cpp \
    src/json/JsonArray.cpp \
    src/json/JsonInput.cpp \
    src/json/JsonLexer.cpp \
    src/json/JsonObject.cpp \
    src/json/JsonParser.cpp \
    src/json/JsonToken.cpp \
    src/json/JsonValue.cpp \
    src/http/HttpRequest.cpp \
    src/dlgs/LoginDialog.cpp \
    src/dlgs/AboutDialog.cpp \
    src/forms/HomeForm.cpp \
    src/forms/ClientsForm.cpp \
    src/forms/CategoriesForm.cpp \
    src/forms/DeliveriesForm.cpp \
    src/forms/ProductsForm.cpp \
    src/forms/ProvidersForm.cpp \
    src/forms/SalesForm.cpp \
    src/forms/NewSaleForm.cpp \
    src/dlgs/ChooseClientDialog.cpp \
    src/dlgs/ChooseProductDialog.cpp \
    src/dlgs/AddDeliveryDialog.cpp \
    src/dlgs/AddClientDialog.cpp \
    src/dlgs/AddProviderDialog.cpp \
    src/dlgs/AddProductDialog.cpp \
    src/dlgs/AddProductCategoryDialog.cpp \
    src/dlgs/AddBrandDialog.cpp \
    src/forms/BrandsForm.cpp

HEADERS += \
        src/MainWindow.h \
    src/json/json.h \
    src/json/JsonArray.h \
    src/json/JsonInput.h \
    src/json/JsonLexer.h \
    src/json/JsonObject.h \
    src/json/JsonParser.h \
    src/json/JsonToken.h \
    src/json/JsonValue.h \
    src/http/http.h \
    src/http/HttpRequest.h \
    src/dlgs/LoginDialog.h \
    src/dlgs/AboutDialog.h \
    src/Settings.h \
    src/forms/HomeForm.h \
    src/forms/ClientsForm.h \
    src/forms/CategoriesForm.h \
    src/forms/DeliveriesForm.h \
    src/forms/ProductsForm.h \
    src/forms/ProvidersForm.h \
    src/forms/SalesForm.h \
    src/forms/NewSaleForm.h \
    src/dlgs/ChooseClientDialog.h \
    src/dlgs/ChooseProductDialog.h \
    src/dlgs/AddDeliveryDialog.h \
    src/dlgs/AddClientDialog.h \
    src/dlgs/AddProviderDialog.h \
    src/dlgs/AddProductDialog.h \
    src/dlgs/AddProductCategoryDialog.h \
    src/dlgs/AddBrandDialog.h \
    src/forms/BrandsForm.h

FORMS += \
        src/MainWindow.ui \
    src/dlgs/LoginDialog.ui \
    src/dlgs/AboutDialog.ui \
    src/forms/HomeForm.ui \
    src/forms/ClientsForm.ui \
    src/forms/CategoriesForm.ui \
    src/forms/DeliveriesForm.ui \
    src/forms/ProductsForm.ui \
    src/forms/ProvidersForm.ui \
    src/forms/SalesForm.ui \
    src/forms/NewSaleForm.ui \
    src/dlgs/ChooseClientDialog.ui \
    src/dlgs/ChooseProductDialog.ui \
    src/dlgs/AddDeliveryDialog.ui \
    src/dlgs/AddClientDialog.ui \
    src/dlgs/AddProviderDialog.ui \
    src/dlgs/AddProductDialog.ui \
    src/dlgs/AddProductCategoryDialog.ui \
    src/dlgs/AddBrandDialog.ui \
    src/forms/BrandsForm.ui

#---------------------------------------------------------------------------------------------------
# Archivos de recursos
#---------------------------------------------------------------------------------------------------

RESOURCES += res/resource.qrc
win32:RC_FILE = res/resource_win32.rc

