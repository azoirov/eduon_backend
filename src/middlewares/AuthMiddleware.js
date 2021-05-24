const { checkJWTToken } = require("../modules/jwt");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) throw new Error("Authorization Token is not found");
    const { session_id } = checkJWTToken(token);

    let session = await req.psql.sessions.findOne({
      where: {
        session_id,
      },
    });

    if (!session) throw new Error("Session is not found");

    session = session.dataValues;
    let useragent = req.headers["user-agent"];
    let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    if (useragent !== session.user_agent) {
      throw new Error("Invalid Session");
    }

    await req.psql.sessions.update(
      {
        ip_address: ip,
      },
      {
        where: {
          session_id,
        },
      }
    );

    let user = await req.psql.users.findOne({
      where: {
        user_id: session.user_id,
      },
    });

    req.user = user.dataValues;
    req.session = session;

    next();
  } catch (e) {
    res.status(403).json({
      ok: false,
      message: e + "",
    });
  }
};
