module.exports = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (user_id === "all") {
      let users = await req.psql.users.findAll();
      users = users.map((user) => user.dataValues);
      res.status(200).json({
        ok: true,
        message: `Founded ${users.length} users successfully`,
        data: {
          users,
        },
      });
      return;
    }

    let user = await req.psql.users.findOne({
      where: {
        user_id,
      },
    });

    user = user.dataValues;

    res.status(200).json({
      ok: true,
      data: {
        user,
      },
    });
  } catch (e) {
    res.status(400).json({
      ok: false,
      message: e + "",
    });
  }
};
