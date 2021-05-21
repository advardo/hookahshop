const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    email: {type: DataTypes.STRING, unique:true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    admin: {type: DataTypes.BOOLEAN, defaultValue: false}
});

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    quantity: {type: DataTypes.INTEGER},
    info: {type: DataTypes.JSONB}
});

const Status = sequelize.define('status', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    comment: {type: DataTypes.STRING},
    timestamp: {type: DataTypes.TIME}
});

const Statuses = sequelize.define('statuses', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false}
});

const ProductBasket = sequelize.define('product_basket', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    quantity: {type: DataTypes.INTEGER, allowNull: false}
});

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    city: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    person: {type: DataTypes.STRING},
    post_office: {type: DataTypes.INTEGER}
});

User.hasMany(Status);
Status.belongsTo(User);

Statuses.hasMany(Status);
Status.belongsTo(Statuses);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(Status);
Status.belongsTo(Order);

Order.hasMany(ProductBasket);
ProductBasket.belongsTo(Order);

Product.hasMany(ProductBasket);
ProductBasket.belongsTo(Product);

module.exports =  {
    User, Product, ProductBasket, Order, Status, Statuses
}