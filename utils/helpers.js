const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOCKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: false, // the cookie will noly be sent on an encrypted connection (HTTPS)
    httpOnly: true, // this will make it so that the cookie cannot be accessed or modified in any way by the browser (to prevent cross-site scripting attacks)
    // recieve the cookie , store it , send it
    secure: process.env.NODE_ENV === 'production',
  };
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
