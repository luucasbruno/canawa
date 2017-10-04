function createPageInvoker(){
    var pages = { 
        inicio: createPage('brands'),
        marcas: createPage('brands'),
        clientes: createPage('clients'), 
        productos: createPage('products'),
        proveedores: createPage('suppliers'),
        ventas:createPage('sales'),
        entregasHoy: createPage('todayDeliveries'),
        entregasPendientes: createPage('pendingDeliveries'),
        entregasAtrasadas: createPage('delayedDeliveries'),
        categorias: createPage('categories')
    }
    var self = {
        render: function(page){
            return pages[page].render;
        }

    }
    return self;
}