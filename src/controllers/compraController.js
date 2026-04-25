const Producto = require('../models/Producto');

exports.listar = async (req, res) => {
    const productos = await Producto.findAll({ order: [['id', 'DESC']] });
    res.json(productos);
};

exports.agregar = async (req, res) => {
    const nuevo = await Producto.create(req.body);
    res.json(nuevo);
};

exports.actualizar = async (req, res) => {
    await Producto.update(req.body, { where: { id: req.params.id } });
    res.json({ msg: "Actualizado" });
};

exports.eliminar = async (req, res) => {
    await Producto.destroy({ where: { id: req.params.id } });
    res.json({ msg: "Eliminado" });
};

exports.confirmarOrden = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.body.id);
        if (!producto || producto.stock <= 0) {
            return res.status(400).json({ msg: "STOCK NO DISPONIBLE" });
        }
        await producto.decrement('stock', { by: 1 });
        res.json({ msg: "COMPRA EXITOSA", precio: producto.precio });
    } catch (e) { res.status(500).json({ msg: "Error de servidor" }); }
};
