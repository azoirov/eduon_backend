const SignUpValidation = require("../validations/SignUpValidation");
const { generateHash } = require("../modules/bcrypt");

module.exports = async (req, res) => {
  try {
    const { phone_number, full_name, age, password } =
      await SignUpValidation.validateAsync(req.body);

    let avatar = "";

    full_name.split(" ").forEach((element, index) => {
      if (index < 3) avatar += element[0].toUpperCase();
    });

    let user = await req.psql.users.findOne({
      where: {
        phone_number,
      },
    });

    if (user) throw new Error("User has already registered");

    user = await req.psql.users.create({
      name: full_name,
      phone_number,
      age,
      password: await generateHash(password),
      avatar,
    });

    console.log(user);

    user = {
      id: user.user_id,
      full_name: user.name,
      phone_number: user.phone_number,
      age: user.age,
    };

    res.status(200).json({
      ok: true,
      message: "successfully signed up",
      data: user,
    });
  } catch (e) {
    res.status(400).json({
      ok: false,
      message: e + "",
    });
  }
};
