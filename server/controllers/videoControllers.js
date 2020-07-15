const fs = require("fs");

const streamVideo = (req, res, next) => {
  let { range } = req.headers;
  let file = `./${req.params.file}`;
  fs.stat(file, (err, stats) => {
    console.log('stat???', stats, err)
    if (err) {
      if (err.code === "ENOENT") {
        return res.sendStatus(404);
      }
      return next(err);
    }
    if (!range) {
      //
      // 	1.	Create the error
      //
      let err = new Error("Wrong range");
      err.status = 416;

      //
      //	->	Send the error and stop the request.
      //
      return next(err);
    }

    let positions = range.replace(/bytes=/, "").split("-");
    let start = parseInt(positions[0], 10);
    let file_size = stats.size;
    let end = positions[1] ? parseInt(positions[1], 10) : file_size - 1;
    let chunksize = end - start + 1;
    let stream_position = {
      start: start,
      end: end,
    };

    console.log("range???", req.headers.range);
    let videoStream = fs.createReadStream(file, stream_position);
    videoStream.on("open", () => {
      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + file_size,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      });

      videoStream.pipe(res);
    });
  });
};

module.exports = { streamVideo };
