# Welcome to S3_image_uploader!
- npm package to help you upload images easily! 
## how to use it
- first in your nodejs app require amazon web services sdk : 
`const  AWS  =  require('aws-sdk');`
- and configure it as follows : 
`AWS.config.update({ accessKeyId:"YOUR_AWS_ACCESSKEY", secretAccessKey:"YOUR_AWS_SECRET_KEY" });`
- and require our module :
`var  s3_uploader  =  require('s3\_image\_uploader');`
----------
- then you can easily use its promises as easily as shown here  to upload image:
`s3_uploader.uploadImg(Upload_Params)
.then(S3Data  => {console.log(S3Data)})
.catch(err =>{throw err});`
- and here we used a param `Upload_Params` which looks like : 
`let  Upload_Params  = {
BucketName:  'YOUR_S3_BUCKET_NAME',
id:  'YOUR_USER_ID_TO_BE_USED_IN_FILE_NAME',
location:  "LOCATION_TO_USE_TO_SAVE_THE_IMG",
img:  "IMG_IN_BASE64_FORMAT"
};`
- then to remove image do as the following : 
` s3_uploader.removeImg(Remove_Params).then(removed => {
console.log(removed);}`
- and here are the 'Remove_Params' to be used : 
`var params = {Bucket:'YOUR_S3_BUCKET_NAME',Key:'PATH_TO_FILE'}`
