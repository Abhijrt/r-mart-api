// When a home page open this controller will work
module.exports.home = function (req, res) {
  return res.status(200).json({
    message: "It A Home Page",
    success: true,
  });
};
