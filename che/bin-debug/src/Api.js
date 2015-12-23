/**
 * Created by Administrator on 2015/5/28.
 */
var Api = (function () {
    function Api() {
        this.serverHost = "http://v5us.com/outsource/nongxianda2/php/";
    }
    var __egretProto__ = Api.prototype;
    __egretProto__.nxd_request = function (url, callback) {
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        console.log(url);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                console.log('received string ' + request.responseText);
                callback(request.responseText);
            }
        };
        request.send();
    };
    __egretProto__.nxd_activity_start = function (startCallBack, closeCallBack) {
        this.nxd_request(this.serverHost + "does_activity_start.php", function (response) {
            if (response == "1") {
                startCallBack();
            }
            else {
                closeCallBack();
            }
        });
    };
    __egretProto__.nxd_ticket = function (availableCallback, unavailableCallback) {
        this.nxd_request(this.serverHost + "ticket.php?", function (response) {
            if (response == "true") {
                availableCallback();
            }
            else {
                unavailableCallback();
            }
        });
    };
    __egretProto__.nxd_add_user = function (tname, phone, taddress, callback) {
        var name = encodeURIComponent(tname);
        var address = encodeURIComponent(taddress);
        this.nxd_request(this.serverHost + "collect_user_info.php?name=" + name + "&phone=" + phone + "&address=" + address, callback);
    };
    __egretProto__.nxd_lottery = function (category, hitCallBack, missCallBack) {
        this.nxd_request(this.serverHost + "lottery.php?" + category, function (response) {
            if (response == "hit") {
                hitCallBack();
            }
            else if (response == "miss") {
                missCallBack();
            }
        });
    };
    return Api;
})();
Api.prototype.__class__ = "Api";
