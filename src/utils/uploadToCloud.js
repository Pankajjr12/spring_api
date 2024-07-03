export const uploadToCloud = async (pics) => {
    if (pics) {
        try {
            const data = new FormData();
            data.append("file", pics)
            data.append("upload_preset","socialverse")
            data.append("cloud_name","dw76sxkas")

            const res = await fetch("https://api.cloudinary.com/v1_1/dw76sxkas/image/upload", {
                method: "post",
                body: data
            })

            if (!res.ok) {
                throw new Error(`Failed to upload image: ${res.status} ${res.statusText}`);
            }

            const fileData = await res.json();
            if (fileData && fileData.url) {
                return fileData.url.toString();
            } else {
                throw new Error("Invalid response from Cloudinary");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            return null; // or handle the error in another way
        }
    } else {
        console.log("error from uploading method: 'pics' parameter is undefined");
        return null; // or handle the error in another way
    }
}
