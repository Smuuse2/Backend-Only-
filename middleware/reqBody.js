module.exports = (...props) => {
    return function (req, res, next) {
      for (let prop of props) {
        if (req.body[prop] === undefined) {
          return res.status(400).send({ message: `Missing '${prop}' in your request.` });
        }
      }
      next();
    }
  }
  