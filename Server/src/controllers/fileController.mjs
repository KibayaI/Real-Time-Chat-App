async function uploadSingleFile(req, res) {
  res.json({
    message: "File uploaded successfully!!!",
  });
}

export const file = { uploadSingleFile };
