function uploadImg(e) {
  let that = this;
  console.log(e);
  let index = e.currentTarget.dataset.number;
  let uploadFile = ""; //最后处理完，图片上传的图片地址
  wx.chooseImage({
    success(res) {
      console.log(res);
      const tempFilePaths = res.tempFilePaths;

      //获得原始图片大小
      wx.getImageInfo({
        src: res.tempFilePaths[0],
        success(res) {
          // console.log('获得原始图片大小',res.width)
          //console.log(res.height)
          var originWidth, originHeight;
          originHeight = res.height;
          originWidth = res.width;
          console.log(originWidth);
          //压缩比例
          // 最大尺寸限制
          var maxWidth = 1200,
            maxHeight = 600;
          // 目标尺寸
          var targetWidth = originWidth,
            targetHeight = originHeight;
          //等比例压缩，如果宽度大于高度，则宽度优先，否则高度优先
          if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
              // 要求宽度*(原生图片比例)=新图片尺寸
              targetWidth = maxWidth;
              targetHeight = Math.round(
                maxWidth * (originHeight / originWidth)
              );
            } else {
              targetHeight = maxHeight;
              targetWidth = Math.round(
                maxHeight * (originWidth / originHeight)
              );
            }
          }
          //尝试压缩文件，创建 canvas
          var ctx = wx.createCanvasContext("firstCanvas");
          ctx.clearRect(0, 0, targetWidth, targetHeight);
          ctx.drawImage(tempFilePaths[0], 0, 0, targetWidth, targetHeight);
          ctx.draw();
          //更新canvas大小
          that.setData({
            cw: targetWidth,
            ch: targetHeight,
          });
          //保存图片
          setTimeout(function () {
            wx.canvasToTempFilePath(
              {
                canvasId: "firstCanvas",
                success: (res) => {
                  //写入图片数组
                  var uploadpic = "uploadPic[" + index + "]";
                  //
                  that.setData({
                    [uploadpic]: res.tempFilePath,
                  });
                  uploadFile = res.tempFilePath;
                  //保存到相册
                  // wx.saveImageToPhotosAlbum({
                  //   filePath: res.tempFilePath,
                  //   success: (res) => {
                  //     console.log(res)
                  //   },
                  //   fail: (err) => {
                  //     console.error(err)
                  //   }
                  // })
                  wx.uploadFile({
                    url: "https://example.weixin.qq.com/upload", //仅为示例，非真实的接口地址
                    filePath: uploadFile,
                    name: "file",
                    formData: {
                      user: "test",
                    },
                    success(res) {
                      const data = res.data;
                      //do something
                    },
                  });
                },
                fail: (err) => {
                  console.error(err);
                },
              },
              this
            );
          }, 500);
        },
      });
    },
  });
}
