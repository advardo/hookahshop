const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/models');


const generateJwt = (id, email, admin) =>{
    return jwt.sign(
            {id, email, admin},
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        )
}

class UserController {
    async registration(req, res, next) {
        const {email, password} = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest("Некорректный email или пароль"));
        }
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким имейлом уже существует'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, password: hashPassword});
        const token = generateJwt(user.id, user.email, user.admin);
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if (!user) {
            return next(ApiError.internal('Пользователь с данным email не найден'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword) {
            return next(ApiError.internal('Неверный пароль'));
        }
        const token = generateJwt(user.id, user.email, user.admin);
        return res.json({token});
    }

    async check(req, res, next) {
        res.json({message: 'all working'});
    }
}

module.exports = new UserController();