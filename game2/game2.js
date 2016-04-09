function game(life,df,gq,pass,pass2,pass3,lost,lost2){
    this.letters=["A","B","C","D","E","F","G","H","I","J","K"];
    this.images=["a.png","b.png","c.png","d.png","e.png","f.png","g.png","h.png","i.png","j.png","k.png"];
    this.lettresnum=5;
    this.widthW=document.documentElement.clientWidth;
    this.heightH=document.documentElement.clientHeight;
    this.letterwidth=40;
    this.spans=[];
    this.spanarr=[];
    this.temper=[];
    this.speed=5;
    this.life=10;
    this.df=0;
    this.dfnum=0;
    this.gq=1;
    this.lifeEle=life;
    this.dfEle=df;
    this.gqEle=gq;
    this.num=20;
    this.pass=pass;
    this.pass2=pass2;
    this.pass3=pass3;
    this.lost=lost;
    this.lost2=lost2;
}
game.prototype={
    play:function(){
      this.createEle(this.lettresnum);
      this.move();
      this.key();
    },
    key:function(){
        var that=this;
        document.body.onkeydown=function(e){
            var code=String.fromCharCode(e.keyCode);
            for(var i=0;i<that.spans.length;i++){
                if(code==that.spans[i].getAttribute("letter")){
                    document.body.removeChild(that.spans[i]);
                    that.spans.splice(i,1);
                    that.spanarr.splice(i,1);
                    that.temper.splice(i,1);
                    that.df++;
                    that.dfnum++;
                    that.dfEle.innerHTML=that.dfnum;
                    if(that.df%that.num==0){
                        $(that.pass).css("display","block").animate({top:0});
                        clearInterval(that.t);
                        $(that.pass2).click(function(){
                            that.next();
                        });
                        $(that.pass3).click(function(){
                            location.reload();
                        });
                    }
                    that.createEle(1);
                }
            }
        }

    },
    next:function(){
        $(this.pass).css("display","none");
        for(var i=0;i<this.spans.length;i++) {
            document.body.removeChild(this.spans[i]);
        }
        this.spans = [];
        this.temper = [];
        this.spanarr = [];
        this.df=0;
        this.num+=5;
        this.speed++;
        if(this.speed>10){
            this.speed=10;
        }
        this.gq++;
        this.gqEle.innerHTML=this.gq;
        this.createEle(this.lettresnum++);
        if(this.lettresnum>10){
            this.lettresnum=10;
        }
        this.move();

    },
    move:function(){
        var that=this;
        that.t=setInterval(function(){
            for(var i=0;i<that.spans.length;i++){
                var top=that.spans[i].offsetTop+that.speed;
                that.spans[i].style.top=top+"px";
                if(top>that.heightH){
                    document.body.removeChild(that.spans[i]);
                    that.temper.splice(i,1);
                    that.spanarr.splice(i,1);
                    that.spans.splice(i,1);
                    that.life--;
                    if(that.life==0){
                        $(that.lost).css("display","block").animate({top:0});
                        clearInterval(that.t);
                        $(that.lost2).click(function(){
                            location.reload();
                        })
                    }
                    that.lifeEle.innerHTML=that.life;
                    that.createEle(1);
                }
            }
        },80)
    },
    createEle:function(num){
        var arr=this.createRandLetter(num);
        console.log(arr);
        for(var i=0;i<arr.length;i++){
             var span=document.createElement("span");
             var left=50+(this.widthW-100)*Math.random();
             while(this.check(this.spanarr,left)){
                 left=50+(this.widthW-100)*Math.random();
             }
             var obj={minx:left,maxx:left+this.letterwidth};
             this.spanarr.push(obj);
             span.style.cssText="position:absolute;left:"+left+"px;top:0;";
             span.innerHTML="<img src='zimu/"+arr[i].images+"'>";
             span.setAttribute("letter",arr[i].letter);
             document.body.appendChild(span);
             this.spans.push(span);
        }
    },
    check:function(arr,val){
        for(var i=0;i<arr.length;i++){
            if(!(val+this.letterwidth<arr[i].minx||val>arr[i].maxx)){
                  return true;
            }
        }
        return false;
    },
    createRandLetter:function(num){
        var arr=[];
        for(var i=0;i<num;i++){
            var random=Math.floor(this.letters.length*Math.random());
            while(this.rand(this.temper,random)){
                random=Math.floor(this.letters.length*Math.random());
            }
            var obj={letter:this.letters[random],images:this.images[random]};
            this.temper.push(random);
            arr.push(obj);
        }
        return arr;
    },
    rand:function(arr,val){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==val){
                return true;
            }
        }
        return false;
    }
}