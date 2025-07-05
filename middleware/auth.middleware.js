// NOTE: Middleware kiểm tra xem người dùng có phải là admin không.

function isAdmin(req, res, next) {
    // Phải chạy sau isAuthenticated, nên req.session.user chắc chắn tồn tại
    if (req.session.user?.role !== 'admin') {
        return res.status(403).render('pages/403'); // Tạo trang 403.ejs cho đẹp
    }
    next();
}

module.exports = isAdmin;