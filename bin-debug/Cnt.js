var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Cnt = (function (_super) {
    __extends(Cnt, _super);
    function Cnt(Width, Height, anWidth, anHeight) {
        var _this = _super.call(this) || this;
        // 缩放系数
        _this.scale = window['store'].scale;
        _this.drawCnt(Width, Height, anWidth, anHeight);
        return _this;
    }
    Cnt.prototype.drawCnt = function (Width, Height, anWidth, anHeight) {
        // 内容区
        var wrap = new egret.DisplayObjectContainer();
        wrap.width = Width;
        wrap.height = Height;
        wrap.x = 0;
        wrap.y = 0;
        this.addChild(wrap);
        // 背景 
        var bg = new egret.Bitmap(RES.getRes('bg_jpg'));
        bg.anchorOffsetX = anWidth;
        bg.x = anWidth;
        bg.y = 0;
        wrap.addChild(bg);
        // 背景 桌子区域，用来定位桌子计时器和里面的足球场等
        this.bgCourtWrap = new egret.DisplayObjectContainer();
        this.bgCourtWrap.width = Width;
        this.bgCourtWrap.height = 1035; //963+30+42  桌子的高度加上计时器突出高度+头像突出高度
        this.bgCourtWrap.anchorOffsetX = this.bgCourtWrap.width / 2;
        this.bgCourtWrap.anchorOffsetY = this.bgCourtWrap.height / 2;
        this.bgCourtWrap.x = anWidth;
        this.bgCourtWrap.y = anHeight;
        //问题，测试屏幕大小进行缩放
        this.bgCourtWrap.scaleX = this.scale;
        this.bgCourtWrap.scaleY = this.scale;
        wrap.addChild(this.bgCourtWrap);
        // 背景 桌子
        var bgCourt = new egret.Bitmap(RES.getRes('bg-court_png'));
        bgCourt.anchorOffsetX = bgCourt.width / 2;
        bgCourt.x = anWidth;
        bgCourt.y = 30;
        this.bgCourtWrap.addChild(bgCourt);
        //倒计时
        var timer = new Timer(Width, Height, anWidth, anHeight);
        timer.anchorOffsetX = timer.width / 2;
        timer.x = anWidth;
        timer.y = 0;
        this.bgCourtWrap.addChild(timer);
        //文字说明区域
        var textT = new TextTips();
        textT.anchorOffsetX = textT.width / 2;
        textT.x = anWidth;
        textT.y = 66;
        this.bgCourtWrap.addChild(textT);
        //生成四个足球场，1/4比赛  485为小球场宽度，应该可以在构造函数里设置，需要优化
        //参数分辨是 x,x，左边球队icon，队名，赔率，总投注，我的投注，右边~
        for (var i = 0; i < 4; i++) {
            var _field4 = new Field4(485, anWidth, 'team-01_jpg', '克罗地亚', 3.78, '10万', '10.09万', 'team-02_jpg', '德国', 1.26, '23万', '10.09万');
            _field4.y = 120 + 202 * i;
            this.bgCourtWrap.addChild(_field4);
        }
        // 左边其他用户 头像实例 ,（名字，头像，金币）,位置为数组中的随机一个{x=15,y=80+220*i} 
        // for(let i=0;i<4;i++){
        //     let userImg:userImage = new userImage('飞翔小七','https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4182536181,630612655&fm=173&s=EC7819C7026A2D1399FD589D0300C084&w=218&h=146&img.JPEG','23万');
        //     userImg.x = 15;
        //     userImg.y = 80+220*i;
        //     console.log( userImg.y  )
        //     this.bgCourtWrap.addChild(userImg);
        // }
        // // 右边其他用户 头像实例 ,（名字，头像，金币）,位置为数组中的随机一个{x=15,y=80+220*i} 
        // for(let i=0;i<4;i++){
        //     let userImg:userImage = new userImage('飞翔小七','https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4182536181,630612655&fm=173&s=EC7819C7026A2D1399FD589D0300C084&w=218&h=146&img.JPEG','23万');
        //     userImg.x = Width-104;
        //     userImg.y = 80+220*i;
        //     console.log( userImg.y )
        //     this.bgCourtWrap.addChild(userImg);
        // }
        //  自己的头像
        var myImg = new userImage('飞翔小七', 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4182536181,630612655&fm=173&s=EC7819C7026A2D1399FD589D0300C084&w=218&h=146&img.JPEG', '23万');
        myImg.anchorOffsetX = 44;
        myImg.anchorOffsetY = 124;
        myImg.x = anWidth;
        myImg.y = this.bgCourtWrap.height;
        this.bgCourtWrap.addChild(myImg);
    };
    // 初始化场地 
    Cnt.prototype.initUserImage = function () {
        var len = window['store']['user_info'].length;
        if (!len || len === undefined) {
            len = 0;
        }
        for (var i = 0; i < 9; i++) {
            if (i >= len) {
                window['store']['emptyUserPosition'].push(i + 1);
            }
        }
        console.log(window['store']['emptyUserPosition']);
        for (var i = 0; i < len; i++) {
            if (window['store']['user_info'][i] && window['store']['user_info'][i].photo === '') {
                window['store']['user_info'][i].photo = 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4182536181,630612655&fm=173&s=EC7819C7026A2D1399FD589D0300C084&w=218&h=146&img.JPEG';
            }
            if (window['store']['user_info'][i].uid) {
                window['store']['userPositionID'].push(window['store']['user_info'][i].uid);
            }
            else {
                console.error('无uid');
            }
            var choseUserImg = 'userImg' + (i + 1);
            this[choseUserImg] = new userImage(window['formateName'](window['store']['user_info'][i].username), window['store']['user_info'][i].photo, window['formateGold'](window['store']['user_info'][i].total));
            if (i === 0) {
                this[choseUserImg].anchorOffsetX = 44;
                this[choseUserImg].anchorOffsetY = 124;
                this[choseUserImg].x = window['store']['stage_anWidth'];
                this[choseUserImg].y = 1035;
            }
            else if ((window['store']['userPosition'][i] - 1) < 5) {
                this[choseUserImg].x = window['store']['userPositionObj'][window['store']['userPosition'][i] - 1].x;
                this[choseUserImg].y = window['store']['userPositionObj'][window['store']['userPosition'][i] - 1].y;
            }
            else {
                this[choseUserImg].x = window['store']['stage_Width'] - window['store']['userPositionObj'][window['store']['userPosition'][i] - 1].x;
                this[choseUserImg].y = window['store']['userPositionObj'][window['store']['userPosition'][i] - 1].y;
            }
            this.bgCourtWrap.addChild(this[choseUserImg]);
        }
    };
    // 用户 进入
    Cnt.prototype.addUserImage = function (username, photo, total, uid) {
        var userI = window['store']['emptyUserPosition'].shift();
        if (!userI) {
            console.error('无空闲房间');
            return false;
        }
        userI = userI - 1;
        var choseUserImg = 'userImg' + userI;
        this[choseUserImg] = new userImage(window['formateName'](username), photo, window['formateGold'](total));
        if ((window['store']['userPosition'][userI] - 1) < 5) {
            this[choseUserImg].x = window['store']['userPositionObj'][window['store']['userPosition'][userI] - 1].x;
            this[choseUserImg].y = window['store']['userPositionObj'][window['store']['userPosition'][userI] - 1].y;
        }
        else {
            this[choseUserImg].x = window['store']['stage_Width'] - window['store']['userPositionObj'][window['store']['userPosition'][userI] - 1].x;
            this[choseUserImg].y = window['store']['userPositionObj'][window['store']['userPosition'][userI] - 1].y;
        }
        window['store']['userPositionID'].push(uid);
        this.bgCourtWrap.addChild(this[choseUserImg]);
    };
    // 用户 离开 
    Cnt.prototype.removeUserImage = function (uid) {
        var delIndex = 0;
        for (var i = 0, len = window['store']['userPositionID'].length; i < len; i++) {
            if (window['store']['userPositionID'][i] === uid) {
                delIndex = i;
                break;
            }
        }
        if (i === len || delIndex === 0) {
            console.error('not find uid');
            return false;
        }
        delIndex = delIndex + 1;
        if (delIndex) {
            var choseUserImg = 'userImg' + (delIndex - 1);
            console.log(choseUserImg);
            // 更新数组
            window['store']['userPositionID'].splice(delIndex - 1, 1);
            window['store']['emptyUserPosition'].push(delIndex);
            // console.log( window['store']['userPositionID'] )
            this.bgCourtWrap.removeChild(this[choseUserImg]);
            // this.bgCourtWrap.removeChild(this[choseUserImg]);
        }
        console.log(window['store']['userPosition'][delIndex]);
    };
    return Cnt;
}(egret.DisplayObjectContainer));
__reflect(Cnt.prototype, "Cnt");
//# sourceMappingURL=Cnt.js.map