// NOTE: Xử lý logic đăng ký, đăng nhập, đăng xuất.

const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const saltRounds = 10;

exports.showRegisterForm = (req, res) => {
    res.render('pages/register', { error: null });
};

exports.register = async (req, res) => {
    try {
        const { full_name, email, password } = req.body;

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.render('pages/register', { error: 'Email đã được sử dụng.' });
        }

        // Mã hóa mật khẩu
        const password_hash = await bcrypt.hash(password, saltRounds);

        // Tạo user mới
        const newUser = await User.create({ full_name, email, password_hash });

        // Lưu user vào session và chuyển hướng
        req.session.user = {
            id: newUser.id,
            full_name: newUser.full_name,
            email: newUser.email,
            role: newUser.role
        };
        res.redirect('/');

    } catch (error) {
        console.error(error);
        res.render('pages/register', { error: 'Đã có lỗi xảy ra. Vui lòng thử lại.' });
    }
};

exports.showLoginForm = (req, res) => {
    res.render('pages/login', { error: null });
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);

        if (!user) {
            return res.render('pages/login', { error: 'Email hoặc mật khẩu không đúng.' });
        }

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.render('pages/login', { error: 'Email hoặc mật khẩu không đúng.' });
        }

        // Đăng nhập thành công, lưu vào session
        req.session.user = {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role
        };

        // Chuyển hướng về trang trước đó nếu có, không thì về trang chủ
        const returnTo = req.session.returnTo || '/';
        delete req.session.returnTo; // Xóa để không bị kẹt
        res.redirect(returnTo);
    } catch (error) {
        console.error(error);
        res.render('pages/login', { error: 'Đã có lỗi xảy ra.' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid'); // Tên cookie mặc định của express-session
        res.redirect('/');
    });
};