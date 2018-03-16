"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
function consoleLog() {
    console.log("hello I'm here!");
}
exports.consoleLog = consoleLog;
function uploadImg(image_data, other_info) {
    return new Promise(function (resolve, reject) {
        var base64Data = new Buffer(image_data.img.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        var type = image_data.img.split(';')[0].split('/')[1];
        var userId = other_info.id;
        var baseLocation = other_info.location + "/";
        var params = {
            Bucket: other_info.BucketName,
            Key: baseLocation + "." + userId + "." + type,
            Body: base64Data,
            ACL: 'public-read',
            ContentEncoding: 'base64',
            ContentType: "image/" + type // required. Notice the back ticks
        };
        s3.upload(params, function (err, S3Data) {
            if (S3Data) {
                return resolve(S3Data);
            }
            else {
                return reject(err);
            }
        });
    });
}
exports.uploadImg = uploadImg;
function removeImg(data) {
    return new Promise(function (resolve, reject) {
        s3.deleteObject(data, function (err, data) {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(data);
            }
        });
    });
}
exports.removeImg = removeImg;
