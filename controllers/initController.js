exports.hello = (req, res, next) => {
  console.log('hello world');

  res.status(200).json({
    status: 'succes',
    data: 'hello world',
  });
};
