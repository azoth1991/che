/**
 * Created by Administrator on 2015/5/25.
 */
var End = (function (_super) {
    __extends(End, _super);
    function End(count) {
        _super.call(this);
        this.count = count;
        if (this.count > 5000) {
            this.category = 1;
        }
        else if (this.count > 3000) {
            this.category = 2;
        }
        else if (this.count > 1000) {
            this.category = 3;
        }
        else {
            this.category = 0;
        }
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGame, this);
    }
    var __egretProto__ = End.prototype;
    __egretProto__.startGame = function (e) {
        var endback = new egret.Bitmap();
        endback = this.createBitmapByName('endback');
        endback.width = this.stage.stageWidth;
        //endback.height = this.stage.stageHeight;
        var endBtnCheck = new egret.Bitmap();
        endBtnCheck = this.createBitmapByName('check');
        endBtnCheck.x = 50 + 15;
        endBtnCheck.y = 550;
        endBtnCheck.touchEnabled = true;
        endBtnCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lottery, this);
        var endBtnRestart = new egret.Bitmap();
        endBtnRestart = this.createBitmapByName('restart');
        endBtnRestart.x = 250 + 15;
        endBtnRestart.y = 550;
        endBtnRestart.touchEnabled = true;
        endBtnRestart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
        this.stage.addChild(endback);
        this.stage.addChild(endBtnCheck);
        this.stage.addChild(endBtnRestart);
        var textArr = new Array();
        textArr = ['一等奖：大于5000分可抽奖', '二等奖：大于3000分可抽奖', '三等奖：大于1000分可抽奖'];
        for (var i = 0; i < 3; i++) {
            var textField = new egret.TextField();
            this.stage.addChild(textField);
            textField.textColor = 0xffffff;
            textField.size = 20;
            textField.y = 400 + i * 40 - textField.height / 2;
            textField.width = 300;
            textField.x = this.stage.width / 2 - textField.width / 2;
            textField.height = 200;
            textField.textAlign = "center";
            textField.text = textArr[i];
        }
        //this.category =3;
        if (this.category != 0) {
            var tag = new egret.Bitmap;
            tag = this.createBitmapByName('tag');
            this.stage.addChild(tag);
            tag.x = this.stage.width - 2 * tag.width;
            tag.y = 400 + (this.category - 1) * 40 - tag.height / 2;
        }
        else {
            endBtnCheck.visible = false;
            endBtnRestart.x = this.stage.width / 2 - endBtnRestart.width / 2;
        }
        var textTitle = new egret.TextField();
        this.stage.addChild(textTitle);
        textTitle.textColor = 0xffffff;
        textTitle.size = 25;
        textTitle.y = 400 - 30;
        textTitle.width = 300;
        textTitle.x = this.stage.width / 2 - textField.width / 2;
        textTitle.height = 200;
        textTitle.textAlign = "center";
        textTitle.text = '你的得分：' + this.count;
    };
    __egretProto__.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    __egretProto__.lottery = function (e) {
        this.thatstage = this;
        var that = this;
        this.stage.removeChildren();
        var name = new egret.TextField;
        var mobile = new egret.TextField;
        var postBtn = new egret.Bitmap;
        var result1 = new egret.Bitmap;
        var resultBtn1 = new egret.Bitmap;
        result1 = that.createBitmapByName('noaward');
        result1.width = this.stage.stageWidth;
        //result1.height = this.stage.stageHeight;
        resultBtn1 = that.createBitmapByName('restart');
        result1.x = 0;
        result1.y = 0;
        this.stage.addChild(result1);
        resultBtn1.x = 150;
        resultBtn1.y = 550;
        resultBtn1.touchEnabled = true;
        this.stage.addChild(resultBtn1);
        var textArr = new Array();
        textArr = ['一等奖：恭喜您最终获得《顺风车》电影票', '二等奖：恭喜您最终获得微微拼车10元代金券', '三等奖：恭喜您最终获得微微拼车5元代金券'];
        var result2 = new egret.Bitmap;
        var resultBtn2 = new egret.Bitmap;
        result2 = that.createBitmapByName('award');
        resultBtn2 = that.createBitmapByName('lotteryBtn');
        result2.width = this.stage.stageWidth;
        //result2.height = this.stage.stageHeight;
        result2.x = 0;
        result2.y = 0;
        this.stage.addChild(result2);
        resultBtn2.x = 150;
        resultBtn2.y = 550;
        resultBtn2.touchEnabled = true;
        this.stage.addChild(resultBtn2);
        var winword = new egret.TextField();
        //有抽奖机会
        if (this.category != 0) {
            this.stage.addChild(winword);
            winword.textColor = 0xffffff;
            winword.size = 20;
            winword.y = 480;
            winword.width = 300;
            winword.x = this.stage.width / 2 - winword.width / 2;
            winword.height = 200;
            winword.textAlign = "center";
            winword.text = textArr[this.category - 1];
        }
        else {
            result2.visible = false;
            resultBtn2.visible = false;
        }
        var api = new Api;
        api.nxd_ticket(function () {
            result1.visible = false;
            resultBtn1.visible = false;
        }, function () {
            result2.visible = false;
            resultBtn2.visible = false;
            winword.visible = false;
        });
        resultBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
        resultBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            that.stage.removeChildren();
            var message = that.createBitmapByName('message');
            message.width = that.stage.stageWidth;
            message.height = that.stage.stageHeight;
            message.x = that.stage.width / 2;
            message.y = that.stage.height / 2;
            that.stage.addChild(message);
            name.type = egret.TextFieldType.INPUT;
            name.bold = true;
            name.width = 200;
            name.height = 50;
            name.x = that.stage.width / 2 - 50;
            name.y = that.stage.height / 2 - 45;
            name.textColor = 0x7d602d;
            that.stage.addChild(name);
            mobile.type = egret.TextFieldType.INPUT;
            mobile.bold = true;
            mobile.width = 200;
            mobile.height = 50;
            mobile.x = that.stage.width / 2 - 50;
            mobile.y = that.stage.height / 2 + 42;
            mobile.textColor = 0x7d602d;
            that.stage.addChild(mobile);
            postBtn = that.createBitmapByName('postBtn');
            postBtn.x = that.stage.width / 2 - postBtn.width / 2;
            postBtn.y = that.stage.height - 4 * postBtn.height;
            postBtn.touchEnabled = true;
            that.stage.addChild(postBtn);
            var alertMessage = new egret.TextField;
            postBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                if (that.stage.contains(alertMessage)) {
                    that.stage.removeChild(alertMessage);
                }
                alertMessage.x = that.stage.width / 2 - 50;
                that.stage.addChild(alertMessage);
                alertMessage.textColor = 0xFF3030;
                if (name.text == '') {
                    alertMessage.text = '名字不能为空';
                    alertMessage.y = that.stage.height / 2 - 25 + alertMessage.height;
                    return false;
                }
                if (Number(mobile.text) < 10000000000) {
                    alertMessage.text = '手机格式不正确';
                    alertMessage.y = that.stage.height / 2 + 62 + alertMessage.height;
                    return false;
                }
                e.target.parent.removeChildren();
                var api = new Api;
                api.nxd_add_user(name.text, Number(mobile.text), '', function () {
                    var success = new egret.Bitmap;
                    success = that.createBitmapByName('success');
                    success.width = that.stage.stageWidth;
                    success.height = that.stage.stageHeight;
                    that.stage.addChild(success);
                    var endWord = new egret.TextField;
                    that.stage.addChild(endWord);
                    endWord.width = 300;
                    endWord.height = 200;
                    endWord.x = that.stage.width / 2 - endWord.width / 2;
                    endWord.y = that.stage.height / 2 - endWord.height / 2;
                    endWord.textColor = 0xffff00;
                    endWord.textAlign = "center";
                    endWord.text = "恭喜，登记成功！活动结束后我们会主动联系您";
                    var restart = new egret.Bitmap;
                    restart = that.createBitmapByName('weiweipinche');
                    restart.x = 250 + 15;
                    restart.y = 550;
                    restart.touchEnabled = true;
                    that.stage.addChild(restart);
                    restart.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                        window.location.href = "http://www.vvpinche.com/pc_index.html";
                    }, this);
                    var shareBtn = new egret.Bitmap;
                    shareBtn = that.createBitmapByName('share');
                    shareBtn.x = 50 + 15;
                    shareBtn.y = 550;
                    shareBtn.touchEnabled = true;
                    that.stage.addChild(shareBtn);
                    shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                        var shareMask = new egret.Bitmap;
                        shareMask = that.createBitmapByName('mask');
                        shareMask.width = that.stage.stageWidth;
                        shareMask.height = that.stage.stageHeight;
                        shareMask.x = 0;
                        shareMask.y = 0;
                        shareMask.touchEnabled = true;
                        that.stage.addChild(shareMask);
                        shareMask.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                            that.stage.removeChild(shareMask);
                        }, this);
                    }, this);
                });
            }, this);
        }, this);
    };
    __egretProto__.restartGame = function (e) {
        this.stage.removeChildren();
        var road = new Road();
        var gameView = new Game();
        this.stage.stage.addChild(road);
        this.stage.stage.addChild(gameView);
    };
    return End;
})(egret.DisplayObjectContainer);
End.prototype.__class__ = "End";
