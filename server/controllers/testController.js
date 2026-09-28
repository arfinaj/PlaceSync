// server/controllers/testController.js

export const protectedTest = (req, res) => {
  return res.status(200).json({
    message: "You accessed a protected route!",
    user: req.user,
  });
};