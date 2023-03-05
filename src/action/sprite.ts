// 创建一个精灵图类
export default class SpriteLab {
    protected x: number; // 精灵图x坐标
    protected y: number;// 精灵图y坐标
    protected top: number; // 精灵图对应动作的偏移值
    protected width: number; // 精灵图单张宽度
    protected height: number; // 精灵图单张高度
    protected img: string; // 精灵的图片
    protected image: HTMLImageElement; // 图片对象
    protected frameIndex: number; // 精灵图索引
    private frameCount: number; // 精灵图总帧数
    private tickCount: number; // 计数器，用于控制动画速度
    protected ticksFrame: number; // 每帧需要多少次计数器更新，默认为0
    protected direction: { [key: string]: boolean }; // 精灵图的四个方向
    constructor(options: SpriteLab) {
        this.x = options.x;
        this.y = options.y;
        this.top = 0;
        this.width = options.width;
        this.height = options.height;
        this.img = options.img;
        this.image = new Image();
        this.image.src = this.img;
        this.frameIndex = 0;
        this.frameCount = options.frameCount;
        this.tickCount = 0;
        this.ticksFrame = options.ticksFrame || 0;
        this.direction = {
            top: false,
            bottom: false,
            left: false,
            right: false,
        }
    }

    // 更新精灵图的状态
    update() {
        // 限制精灵图的切换频率 达到控制动作速度的效果
        this.tickCount++;
        if (this.tickCount > this.ticksFrame) {
            this.tickCount = 0;
            // 只要有一个方向为true，就执行帧动画
            if (Object.values(this.direction).some(x => x)) {
                if (this.frameIndex < this.frameCount - 1) {
                    this.frameIndex++;
                } else {
                    this.frameIndex = 0;
                }
            }
        }
    }

    // 渲染到画布
    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this.image,
            this.frameIndex * this.width, // 精灵图每一行的动画帧
            this.top, // 精灵图多个动作相对于总图片的偏移位置
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height,
        )
    }
}