/**
 * Created by azoth on 15/5/24.
 */
var Road = (function (_super) {
    __extends(Road, _super);
    /**
     * 加载进度界面
     * Process interface loading
     */
    function Road() {
        _super.call(this);
        this.speed = 1500;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGame, this);
    }
    var __egretProto__ = Road.prototype;
    __egretProto__.startGame = function (e) {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var road = new egret.Bitmap();
        road = this.createBitmapByName('road');
        road.x = 0;
        road.y = 0;
        this.addChild(road);
        road.width = stageW;
        road.height = stageH;
        var road2 = new egret.Bitmap();
        road2 = this.createBitmapByName('road');
        road2.x = 0;
        road2.y = -stageH;
        this.addChild(road2);
        road2.width = stageW;
        road2.height = stageH;
        egret.Tween.get(road, { loop: true }).to({ y: stageH }, this.speed).call(function () {
            road.y = 0;
        });
        egret.Tween.get(road2, { loop: true }).to({ y: 0 }, this.speed).call(function () {
            road2.y = -stageH;
        });
    };
    __egretProto__.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Road;
})(egret.DisplayObjectContainer);
Road.prototype.__class__ = "Road";
