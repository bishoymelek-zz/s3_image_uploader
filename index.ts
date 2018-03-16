const AWS = require('aws-sdk');
const s3 = new AWS.S3();
export function consoleLog() {
    console.log("hello I'm here!");
}
export function uploadImg(image_data, other_info) {
    return new Promise((resolve, reject) => {
        const base64Data = new Buffer(image_data.img.replace(/^data:image\/\w+;base64,/, ""), 'base64')
        const type = image_data.img.split(';')[0].split('/')[1];
        const userId = other_info.id;
        let baseLocation = other_info.location + "/";
        const params = {
            Bucket: other_info.BucketName,
            Key: `${baseLocation}.${userId}.${type}`, // type is not required
            Body: base64Data,
            ACL: 'public-read',
            ContentEncoding: 'base64', // required
            ContentType: `image/${type}` // required. Notice the back ticks
        }
        s3.upload(params, (err, S3Data) => {
            if (S3Data) {
                return resolve(S3Data);
            } else {
                return reject(err)
            }
        });
    });
}
export function removeImg(data) {
    return new Promise((resolve, reject) => {
        s3.deleteObject(data, function (err, data) {
            if (err) {
                return reject(err);
            } else {
                return resolve(data);
            }
        });
    });
}