const cloud_name = "dw76sxkas";
const upload_preset = "socialvideo";

export const uploadVideoToCloud = async (videoFile,fileType) => {
  if (videoFile && fileType) {
    const data = new FormData();
    data.append("file", videoFile);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dw76sxkas/${fileType}/upload`,
      {
        method: "post",
        body: data,
      }
    );
    console.log("response", res);
    const fileData = await res.json();
    console.log("filedata", fileData.url);
    return fileData.url


  } else {
    console.log("error..");
  }
};
