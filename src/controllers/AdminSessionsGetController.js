module.exports = async (req, res) => {
  try {
    const sessions = await req.psql.sessions.findAll();
    res.status(200).json({
      ok: true,
      data: {
        sessions,
      },
    });
  } catch (e) {
    res.status(400).json({
      ok: false,
      message: e + "",
    });
  }
};
