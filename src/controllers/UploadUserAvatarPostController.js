const path = require("path");

module.exports = async (req, res) => {
  try {
    const { file } = req?.files;
    const fileType = file.name.split(".")[file.name.split(".").length - 1];
    console.log(fileType);
    if (
      !fileType ||
      file.size > 16 * 1024 * 1024 ||
      (fileType !== "png" && fileType !== "jpg" && fileType !== "jpeg")
    )
      throw new Error("File is invalid");

    let fileName = req?.user?.user_id + "." + fileType;

    const filePath = path.join(__dirname, "..", "public", "avatars", fileName);

    await file.mv(filePath, (err) => {
      if (err) throw new Error(err);
    });

    await req.psql.users.update(
      {
        avatar: fileName,
      },
      {
        where: {
          user_id: req.user.user_id,
        },
      }
    );

    res.status(200).json({
      ok: true,
      message: "File uploaded successfully",
      data: {
        file_name: fileName,
      },
    });
  } catch (e) {
    res.status(400).json({
      ok: false,
      message: e + "",
    });
  }
};
