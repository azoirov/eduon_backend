const { compare } = require("../modules/bcrypt");
const { generateJWTToken } = require("../modules/jwt");
const LoginValidation = require("../validations/LoginValidation");

module.exports = async (req, res) => {
  try {
    const { phone_number, password } = await LoginValidation.validateAsync(
      req.body
    );

    let user = await req.psql.users.findOne({
      where: {
        phone_number,
      },
    });

    if (!user) throw new Error(`User is not found`);

    user = user.dataValues;

    let isTrust = await compare(password, user.password);

    if (!isTrust) throw new Error("Password is incorrect");
    let useragent = req.headers["user-agent"];
    let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    if (!(useragent && ip)) throw new Error("Invalid request");

    let { session_id } = await req.psql.sessions.create({
      user_id: user.user_id,
      ip_address: ip,
      user_agent: useragent,
    });

    let token = generateJWTToken({ session_id });

    res.status(200).json({
      ok: true,
      message: "Login successfully",
      data: { token },
    });
  } catch (e) {
    res.status(400).json({
      ok: false,
      message: e + "",
    });
  }
};
