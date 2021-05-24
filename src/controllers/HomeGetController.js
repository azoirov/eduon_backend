module.exports = async (req, res) => {
  console.log(req.headers);

  res.status(200).json({
    ok: true,
  });
};
