// 定义一个角色类
import SpriteLab from './sprite' // 精灵图类

export default class CreateRole extends SpriteLab {
    private realX: number;
    private realY: number;
    protected speedX: number;
    protected speedY: number;
    protected direction: { [key: string]: boolean };
    constructor(options: CreateRole) {
        super(options); // 继承精灵图类的属性
        this.realX = options.realX || 3;
        this.realY = options.realY || 3;
        this.speedX = 0;
        this.speedY = 0;
        this.direction = {
            top: false,
            bottom: false,
            left: false,
            right: false,
        }

        // 监听键盘按下事件
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                // 精灵图下左右上
                case 's':
                    this.direction.bottom = true;
                    break;
                case 'a':
                    this.direction.left = true;
                    break;
                case 'd':
                    this.direction.right = true;
                    break;
                case 'w':
                    this.direction.top = true;
                    break;
            }
        })

        document.addEventListener('keyup', (e) => {
            switch (e.key) {
                // 精灵图下左右上
                case 's':
                    this.direction.bottom = false;
                    this.frameIndex = 0; // 让索引回到第一张
                    this.speedY = 0; // 偏移值重新赋值为0
                    break;
                case 'a':
                    this.direction.left = false;
                    this.frameIndex = 0;
                    this.speedX = 0;
                    break;
                case 'd':
                    this.direction.right = false;
                    this.frameIndex = 0;
                    this.speedX = 0;
                    break;
                case 'w':
                    this.direction.top = false;
                    this.frameIndex = 0;
                    this.speedY = 0;
                    break;
            }
        })
    };

    // 判断运动方向和人物行动方向
    lockDirection() {
        if (this.direction.bottom) {
            this.speedX = 0;
            this.speedY = this.realY;
            this.top = 0; // 精灵图第一行
        } else if (this.direction.top) {
            this.speedX = 0;
            this.speedY = -this.realY;
            this.top = this.height * 3; // 精灵图第四行
        } else if (this.direction.left) {
            this.speedY = 0;
            this.speedX = -this.realX;
            this.top = this.height; // 精灵图第而二行
        } else if (this.direction.right) {
            this.speedY = 0;
            this.speedX = this.realX;
            this.top = this.height * 2; // 精灵图第三行
        }
    };

    update() {
        super.update(); // 调用精灵类的方法 更新索引
        this.lockDirection();
        this.x += this.speedX;
        this.y += this.speedY;
    }
}