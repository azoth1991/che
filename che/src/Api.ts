/**
 * Created by Administrator on 2015/5/28.
 */
class Api{
    private serverHost = "http://v5us.com/outsource/nongxianda2/php/";

    public nxd_request(url,callback){
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        console.log(url);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                console.log('received string '+request.responseText);
                callback(request.responseText);
            }
        };
        request.send();
    }

    public nxd_activity_start(startCallBack,closeCallBack) {
        this.nxd_request(this.serverHost+"does_activity_start.php",function(response){
            if(response == "1") {
                startCallBack();
            }else {
                closeCallBack();
            }
        })
    }

    public nxd_ticket(availableCallback,unavailableCallback){
        this.nxd_request(this.serverHost+"ticket.php?",function(response){
            if(response == "true") {
                availableCallback();
            }else {
                unavailableCallback();
            }
        })
    }

    public nxd_add_user(tname,phone,taddress,callback){
        var name = encodeURIComponent(tname);
        var address =  encodeURIComponent(taddress);
        this.nxd_request(this.serverHost+"collect_user_info.php?name="+name+"&phone="+phone+"&address="+address,callback);
    }

    public nxd_lottery(category,hitCallBack,missCallBack){
        this.nxd_request(this.serverHost+"lottery.php?"+category,function(response){
            if(response == "hit") {
                hitCallBack();
            }else if(response == "miss"){
                missCallBack();
            }
        })
    }
}