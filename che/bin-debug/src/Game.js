/**
 * Created by Administrator on 2015/5/22.
 */
var Game = (function (_super) {
    __extends(Game, _super);
    /**
     * 加载进度界面
     * Process interface loading
     */
    function Game() {
        _super.call(this);
        this.cout = 0;
        this.moveTime = 1000;
        this.arr = new Array();
        this.arr2 = new Array();
        this.remove = false;
        this.speed = 2000;
        this.lock = 0;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startGame, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.hitTestAll, this);
    }
    var __egretProto__ = Game.prototype;
    __egretProto__.startGame = function (e) {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        this.h = stageH;
        var that = this;
        //游戏部分
        this.car = this.createBitmapByName('car');
        this.car.x = stageW / 2 - this.car.width / 2;
        this.car.y = stageH / 2;
        this.addChild(this.car);
        this.touchEnabled = true;
        this.coutView = this.createBitmapByName('countview');
        this.stage.addChild(this.coutView);
        this.coutText = new egret.TextField();
        this.stage.addChild(this.coutText);
        this.coutText.textColor = 0xffffff;
        this.coutText.x = 40;
        this.coutText.y = 7;
        this.coutText.width = 100;
        this.coutText.height = 100;
        this.coutText.textColor = 0x000000;
        this.coutText.textAlign = "center";
        //游戏指导
        this.guid = this.createBitmapByName('guid');
        this.stage.addChild(this.guid);
        this.guid.y = this.car.y - 2 * this.guid.height;
        this.guid.x = this.stage.width / 2 - this.guid.width / 2;
        this.arrow = this.createBitmapByName('arrow');
        this.stage.addChild(this.arrow);
        this.arrow.y = this.car.y + this.arrow.height;
        this.arrow.x = this.stage.width / 2 - this.arrow.width / 2;
        this.figer = this.createBitmapByName('figer');
        this.stage.addChild(this.figer);
        this.figer.x = this.stage.width / 2 - this.figer.width / 2 - 200;
        this.figer.y = this.car.y + this.figer.height / 2;
        egret.Tween.get(this.figer, { loop: false }).to({ x: this.stage.width / 2 - this.figer.width / 2 + 100 }, 1000).call(function () {
            that.stage.removeChild(that.figer);
        });
        //乘客或者障碍物
        var timer = new egret.Timer(Math.random() * this.moveTime + 100, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.product, this);
        timer.start();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
            if (that.stage.contains(that.arrow) && that.stage.contains(that.guid)) {
                that.stage.removeChild(that.arrow);
                that.stage.removeChild(that.guid);
            }
            that.car.x = e.localX - that.car.width / 2;
            that.car.y = e.localY - that.car.height / 2;
            if (that.car.x < 50) {
                that.car.x = 50;
            }
            else if (that.car.x > stageW - 110) {
                that.car.x = stageW - 110;
            }
        }, this);
    };
    __egretProto__.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    __egretProto__.product = function (e) {
        if (this.remove == true) {
            return;
        }
        this.speed -= 100;
        if (this.speed <= 100) {
            this.speed = 100;
        }
        this.moveTime -= 100;
        if (this.moveTime <= 100) {
            this.moveTime = 100;
        }
        var type = Math.random() * 1.5 > 0.5 ? 2 : 1;
        if (type == 1) {
            var passenger = new egret.Bitmap();
            var sex = Math.random() > 0.5 ? 1 : 2;
            passenger = sex == 1 ? this.createBitmapByName('boy') : this.createBitmapByName('gril');
            passenger.x = sex == 1 ? (0) : (this.stage.width - passenger.width);
            passenger.y = -passenger.height;
            this.stage.addChild(passenger);
            this.arr.push(passenger);
            var that = this;
            egret.Tween.get(passenger, { loop: false }).to({ y: this.h - passenger.height }, 1500).call(function () {
                that.stage.removeChild(passenger);
                that.arr.shift();
            });
        }
        else {
            var type2 = Math.floor(Math.random() * 4 + 1);
            var obstacle = new egret.Bitmap();
            switch (type2) {
                case 1:
                    obstacle = this.createBitmapByName('taxi');
                    break;
                case 2:
                    obstacle = this.createBitmapByName('blackcar');
                    break;
                case 3:
                    obstacle = this.createBitmapByName('sanlun');
                    break;
                case 4:
                    obstacle = this.createBitmapByName('bike');
                    break;
            }
            obstacle.x = Math.random() * (this.stage.stageWidth - 160) + 50;
            obstacle.y = -obstacle.height;
            this.stage.addChild(obstacle);
            this.arr2.push(obstacle);
            var that = this;
            egret.Tween.get(obstacle, { loop: false }).to({ y: this.h + obstacle.height }, Math.random() * this.speed + 1000).call(function () {
                that.stage.removeChild(obstacle);
                that.arr2.shift();
            });
        }
    };
    __egretProto__.hittestAll = function () {
        this.coutText.text = this.cout.toString();
        for (var i = 0; i < this.arr.length; i++) {
            var hit1 = this.arr[i].hitTestPoint(this.car.x + this.car.width, this.car.y + this.car.height);
            var hit2 = this.arr[i].hitTestPoint(this.car.x, this.car.y + this.car.height);
            var hit3 = this.arr[i].hitTestPoint(this.car.x + this.car.width, this.car.y);
            var hit4 = this.arr[i].hitTestPoint(this.car.x, this.car.y);
            var hit = hit1 || hit2 || hit3 || hit4;
            if (hit === true) {
                return i + 1;
            }
        }
        for (var i = 0; i < this.arr2.length; i++) {
            var hit1 = this.arr2[i].hitTestPoint(this.car.x + this.car.width, this.car.y + this.car.height);
            var hit2 = this.arr2[i].hitTestPoint(this.car.x, this.car.y + this.car.height);
            var hit3 = this.arr2[i].hitTestPoint(this.car.x + this.car.width, this.car.y);
            var hit4 = this.arr2[i].hitTestPoint(this.car.x, this.car.y);
            var hit = hit1 || hit2 || hit3 || hit4;
            if (hit === true) {
                return -1;
            }
        }
        return 0;
    };
    __egretProto__.hitTestAll = function (e) {
        if (!(this.hittestAll() == 0 || typeof (this.hittestAll()) == undefined || this.hittestAll() == undefined || this.lock == 1)) {
            //console.log(this.gameView.hittestAll());
            this.lock = 1;
            this.cout += 100;
            var niceNum = Math.floor(Math.random() * 3 + 1);
            var niceEf = new egret.Bitmap;
            switch (niceNum) {
                case 1:
                    niceEf = this.createBitmapByName('ef1');
                    break;
                case 2:
                    niceEf = this.createBitmapByName('ef2');
                    break;
                case 3:
                    niceEf = this.createBitmapByName('ef3');
                    break;
            }
            niceEf.x = this.car.x;
            niceEf.y = this.car.y - 100;
            this.stage.addChild(niceEf);
            var that = this;
            egret.Tween.get(niceEf, { loop: false }).to({ y: niceEf.y - 50, alpha: 0 }, 1000).call(function () {
                that.stage.removeChild(niceEf);
            });
            this.arr[this.hittestAll() - 1].visible = false;
            this.arr.splice(this.hittestAll() - 2, this.hittestAll() - 1);
        }
        if (this.hittestAll() == -1) {
            this.remove = true;
            this.stage.removeChildren();
            var api = new Api;
            var category = 3;
            if (this.cout > 5000) {
                category = 1;
            }
            else if (this.cout > 3000) {
                category = 2;
            }
            else if (this.cout > 1000) {
                category = 3;
            }
            else {
                category = 0;
            }
            api.nxd_lottery(category, function () {
            }, function () {
            });
            this.endView = new End(this.cout);
            this.stage.addChild(this.endView);
        }
        if (this.hittestAll() == 0 || typeof (this.hittestAll()) == undefined || this.hittestAll() == undefined) {
            this.lock = 0;
        }
    };
    return Game;
})(egret.DisplayObjectContainer);
Game.prototype.__class__ = "Game";
