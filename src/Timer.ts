class Timer extends egret.DisplayObjectContainer{
    // 倒计时
    public constructor(){
        super();
        this.drawTimer();
    }
    private wrapTimer:egret.DisplayObjectContainer;
    private textSS:egret.TextField;
    private textTimer:egret.TextField;

    private timer:egret.Timer ;

    // 核心 this.timerNum
    private timerNum:number = null;
    private drawTimer(){
        //倒计时-舞台
        this.wrapTimer = new egret.DisplayObjectContainer();
        
        //倒计时-背景
        let bgTimer:egret.Bitmap = new egret.Bitmap(RES.getRes('bg-time_png'));
        this.wrapTimer.addChild(bgTimer);
        //倒计时-文字
        this.textTimer = new egret.TextField();
        this.textTimer.text = '倒计时';
        this.textTimer.textColor = 0x1c1c1c;
        this.textTimer.size = 22;
        this.textTimer.x = 36;
        this.textTimer.y = 12;
        this.wrapTimer.addChild(this.textTimer);
         //倒计时-动态文字
        this.textSS = new egret.TextField();
        this.textSS.textColor = 0x1c1c1c; 
        this.textSS.size = 30;
        this.textSS.x = 114;
        this.textSS.y = 8;
        this.textSS.bold = true;
        this.wrapTimer.addChild(this.textSS);
        //计时器
        // //竞猜开始提示弹窗弹出，然后开始执行倒计时
        // timer.start();
    }

    private createTimer( setTime:string ){
        this.timer = null;
        this.timerNum = parseInt( setTime ) ;
        this.timer = new egret.Timer( 1000, this.timerNum );
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);

        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerRemove, this);
        this.timer.start();
        this.addChild(this.wrapTimer);
    }

    //  竞猜开始
     private timerFunc(event:egret.TimerEvent) {
         let $lock_time = window['store']['lock_time'] ;
        if( $lock_time ){
            this.timerNum = Math.floor( $lock_time - ( Math.floor( new Date().getTime()  / 1000 ) * 1000) ) / 1000 ;
        }else{
            this.timerNum--;
        }

        if(this.timerNum < 6){
            this.textSS.textColor = 0xcb1f1f;
            this.textTimer.textColor = 0xcb1f1f;
        }
        if( this.timerNum < 0 || this.timerNum === 0 ){
            this.textSS.text =  '' ;
            this.textSS.textColor = 0x1c1c1c;
            this.textTimer.textColor = 0x1c1c1c;
        }else{
            this.textSS.text =this.timerNum + '"';
        }
    }

    private timerRemove( ) {
        if( this.wrapTimer.parent ){
            this.removeChild(this.wrapTimer);
        }
    }

}