/**
 * @author wudm
 * copyright 2015 Qcplay All Rights Reserved.
 *
 * 客户端向服务器询问当前的文件列表打包后的资源格式
 */
COMMAND_D.registerCmd({
    name : 'ASSET_TYPE',
    main : function(socket, cookie, fileNames) {
        // 返回值回馈客户端
        return PACK_D.judgeAssetType(fileNames);
    }
});
