exports.isValidHttpUrl = (string) => {
  let url;

  try {
    url = new URL(string);
  } catch (e) {
    console.log("error", e);
  }

  return url.protocol === "http:" || url.protocol === "https:";
};
