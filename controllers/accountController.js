const Account = require('../models/accountModel')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
function isLogin(req) {
    return req.isAuthenticated() ? true : false
}

module.exports.login = async (req, res) => {
    if (isLogin(req)) {
        return res.redirect('/chatbot')
    }
    return res.render('login', { csrfToken: req.csrfToken() })

}

module.exports.register = async (req, res) => {
    if (isLogin(req)) {
        return res.redirect('/chatbot')
    }
    return res.render('register', { csrfToken: req.csrfToken() })
}
module.exports.post_register = async (req, res) => {
    const { name, password } = req.body
    const result = await Account.findOne({ name: name })
    if (result) {
        // account already exists
        return res.status(404).json({ err: "Account already exists!" })
    }
    const acc = new Account({
        id: await Account.countDocuments() + 1,
        name: name,
        password: bcrypt.hashSync(password, salt)
    })
    acc.save()
    return res.status(200).json({ msg: "Register successful!" })
}

module.exports.logout = (req, res) => {
    req.logout()
    // console.log(req.user)
    req.session.destroy
    return res.redirect('/login')
}

module.exports.success = async (req, res) => {
    // console.log(req.user)
    if (!req.user) {
        return res.redirect('/auth/callback/failure');
    }
    const result = await Account.findOne({ id: req.user.id })
    if (!result) {
        const u = new Account({
            id: req.user.id,
            name: req.user.displayName,
            provider: req.user.provider
        })
        u.save()
    }
    return res.redirect('/chatbot');
}
module.exports.failure = (req, res) => {
    res.redirect("/login");
}

module.exports.successLocal = (req, res) => {
    if (!req.user) {
        return res.redirect('/auth/local/failure');
    }
    return res.status(200).json({ msg: "Login successful!" })
}
module.exports.failureLocal = (req, res) => {
    return res.status(404).json({ err: "Invalid username or password!" })
}

module.exports.chatbot = async (req, res) => {
    if (isLogin(req)) {
        const account = await Account.findOne({ id: req.user.id })
        return res.render('chatbot', { user: account, chat: account.history })
    }
    return res.redirect('/login')
}

module.exports.account = async (req, res) => {
    const account = await Account.findOne({ id: req.user.id })
    return res.json({ user: account })
}