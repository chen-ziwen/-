//定义一个精灵类
class Sprite {
    constructor(options) {
        this.x = options.x; //精灵的x坐标
        this.y = options.y; //精灵的y坐标
        this.width = options.width; //精灵的宽度
        this.height = options.height; //精灵的高度
        this.image = options.image; //精灵的图片对象
        this.frameIndex = 0; //精灵当前帧的索引
        this.frameCount = options.frameCount; //精灵总帧数
        this.tickCount = 0; //计数器，用于控制动画速度
        this.ticksPerFrame = options.ticksPerFrame || 0; //每帧需要多少次计数器更新，默认为0
    }

    //更新精灵状态的方法，根据计数器和帧数改变当前帧索引
    update() {
        this.tickCount++;
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.frameCount - 1) {
                this.frameIndex++;
            } else {
                this.frameIndex = 0;
            }
        }
    }

    //渲染精灵到画布上的方法，根据当前帧索引和图片对象绘制相应区域
    render(ctx) {
        ctx.drawImage(
            this.image,
            this.frameIndex * this.width,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

//定义一个人物移动类，继承自精灵类，并添加一些额外属性和方法
class Character extends Sprite {
    constructor(options) {
        super(options); //调用父类构造函数，并传入参数对象
        this.speedX = options.speedX || 0; //人物水平移动速度，默认为0
        this.speedY = options.speedY || 0; //人物垂直移动速度，默认为0

        //添加一些事件监听器，用于控制人物移动方向和速度

        //当按下左箭头键时，设置水平速度为负值，并改变图片对象为向左走的图像（需要自己准备）
        document.addEventListener("keydown", (e) => {
            if (e.keyCode === 37) {
                this.speedX = -5;
                this.image = leftImage;
            }
        });

        //当按下右箭头键时，设置水平速度为正值，并改变图片对象为向右走的图像（需要自己准备）
        document.addEventListener("keydown", (e) => {
            if (e.keyCode === 39) {
                this.speedX = 5;
                this.image = rightImage;
            }
        });

        //当按下上箭头键时，设置垂直速度为负值，并改变图片对象为向上走的图像（需要自己准备）
        document.addEventListener("keydown", (e) => {
            if (e.keyCode === 38) {
                this.speedY = -5;
                this.image = upImage;
            }
        });

        //当按下下箭头键时，设置垂直速度为正值，并改变图片对象为向下走的图像（需要自己准备）
        document.addEventListener("keydown", (e) => {
            if (e.keyCode === 40) {
                this.speedY = 5;
                this.image = downImage;
            }
        });
        //当松开任意方向键时，将水平和垂直速度都设为零，并改变图片对象为站立不动的图像（需要自己准备）
        document.addEventListener("keyup", (e) => {
            if (e.keyCode === 37 || e.keyCode === 39) {
                this.speedX = 0;
                this.image = standImage;
            }
            if (e.keyCode === 38 || e.keyCode === 40) {
                this.speedY = 0;
                this.image = standImage;
            }
        });
    }

    //重写父类的update方法，增加人物移动的逻辑，根据速度改变坐标，并限制边界
    update() {
        super.update(); //调用父类的update方法，更新帧索引
        this.x += this.speedX; //根据水平速度改变x坐标
        this.y += this.speedY; //根据垂直速度改变y坐标

        //限制人物不能超出画布边界
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > canvas.width - this.width) {
            this.x = canvas.width - this.width;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height;
        }
    }
}

//创建一个人物对象，传入一些参数，包括初始位置，大小，图片对象等（需要自己准备）
let character = new Character({
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    image: standImage,
    frameCount: 4,
    ticksPerFrame: 10
});

//创建一个画布对象和一个上下文对象
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//定义一个游戏循环函数，用于不断更新和渲染人物状态
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //清空画布
    character.update(); //更新人物状态
    character.render(ctx); //渲染人物到画布上
    requestAnimationFrame(gameLoop); //请求下一帧动画
}

//调用游戏循环函数开始游戏
gameLoop();