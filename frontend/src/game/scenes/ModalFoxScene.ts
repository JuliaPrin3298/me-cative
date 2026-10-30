
import Phaser from "phaser";

export class ModalFoxScene extends Phaser.Scene {
    private foxContainer!: Phaser.GameObjects.Container;
    private headGroup!: Phaser.GameObjects.Container;
    private tail!: Phaser.GameObjects.Image;
    private body!: Phaser.GameObjects.Image;
    private eyes!: Phaser.GameObjects.Image;
    private isAnimating = false;

    constructor() {
        super("ModalFoxScene");
    }

    preload() {
        this.load.image("fox-body", "/assets/fox/raposa-corpo.png");
        this.load.image("fox-head", "/assets/fox/raposa-cabeca.png");
        this.load.image("fox-tail", "/assets/fox/raposa-cauda.png");

        this.load.image("fox-eye-open", "/assets/fox/raposa-olho-a.png");
        this.load.image("fox-eye-closed", "/assets/fox/raposa-olho-f.png");

        this.load.image("fox-ear-left", "/assets/fox/raposa-orelha-esq.png");
        this.load.image("fox-ear-right", "/assets/fox/raposa-orelha-dir.png");

        this.load.image("fox-paw-right-1", "/assets/fox/raposa-pata-dir1.png");
        this.load.image("fox-paw-right-2", "/assets/fox/raposa-pata-dir2.png");
        this.load.image("fox-paw-left-1", "/assets/fox/raposa-pata-esq1.png");
        this.load.image("fox-paw-left-2", "/assets/fox/raposa-pata-esq2.png");
    }

    create() {
        const { width, height } = this.scale;
        const foxWidth = Math.min(width * 0.35, height * 0.35);

        const body = this.add.image(0, 0, "fox-body");
        body.setDisplaySize(
            foxWidth,
            foxWidth * (body.height / body.width),
        );

        const scale = foxWidth / body.width;

        this.tail = this.add
            .image(-foxWidth * 0.70, -foxWidth * 0.20, "fox-tail")
            .setScale(scale);

        const head = this.add
            .image(0, -foxWidth * 0.80, "fox-head")
            .setScale(scale);

        const earLeft = this.add
            .image(-foxWidth * 0.38, -foxWidth * 1.17, "fox-ear-left")
            .setScale(scale);

        const earRight = this.add
            .image(foxWidth * 0.38, -foxWidth * 1.17, "fox-ear-right")
            .setScale(scale);

        this.eyes = this.add
            .image(foxWidth * 0.06, -foxWidth * 0.69, "fox-eye-open")
            .setScale(scale);

        this.headGroup = this.add.container(0, -foxWidth * 0.80, [
            earLeft,
            earRight,
            head,
            this.eyes,
        ]);

        earLeft.setPosition(-foxWidth * 0.38, -foxWidth * 0.37);
        earRight.setPosition(foxWidth * 0.38, -foxWidth * 0.37);
        head.setPosition(0, 0);
        this.eyes.setPosition(foxWidth * 0.06, foxWidth * 0.11);

        const pawRight1 = this.add
            .image(foxWidth * 0.25, foxWidth * 0.25, "fox-paw-right-1")
            .setScale(scale);

        const pawRight2 = this.add
            .image(foxWidth * 0.38, foxWidth * 0.40, "fox-paw-right-2")
            .setScale(scale);

        const pawLeft1 = this.add
            .image(-foxWidth * 0.25, foxWidth * 0.30, "fox-paw-left-1")
            .setScale(scale);

        const pawLeft2 = this.add
            .image(-foxWidth * 0.48, foxWidth * 0.40, "fox-paw-left-2")
            .setScale(scale);

        body.setDepth(2);

        this.foxContainer = this.add.container(width / 2, height * 0.57, [
            this.tail,
            pawLeft2,
            pawRight2,
            body,
            this.headGroup,
            pawLeft1,
            pawRight1,
        ]);

        this.body = body;

        this.tweens.add({
            targets: this.tail,
            angle: { from: -2, to: 2 },
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
        });

        this.tweens.add({
            targets: body,
            y: -foxWidth * 0.015,
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
        });

        this.tweens.add({
            targets: earLeft,
            angle: -5,
            duration: 350,
            yoyo: true,
            repeat: -1,
            repeatDelay: 2200,
            ease: "Sine.easeInOut",
        });

        this.tweens.add({
            targets: earRight,
            angle: 4,
            duration: 400,
            yoyo: true,
            repeat: -1,
            repeatDelay: 3200,
            ease: "Sine.easeInOut",
        });

        this.time.addEvent({
            delay: 3000,
            loop: true,
            callback: () => {
                this.eyes.setTexture("fox-eye-closed");
                this.time.delayedCall(150, () => {
                    if (this.eyes?.active) {
                        this.eyes.setTexture("fox-eye-open");
                    }
                });
            },
        });

        this.scale.on("resize", this.resizeFox, this);
        this.events.once("shutdown", () => {
            this.scale.off("resize", this.resizeFox, this);
        });

        this.input.on("pointerdown", () => {
            this.tiltHead();
        });

        this.resizeFox();
    }

    private resizeFox() {
        if (!this.foxContainer) return;

        const { width, height } = this.scale;
        this.foxContainer.setPosition(width * 0.5, height * 0.57);
    }

    public tiltHead() {
        if (this.isAnimating || !this.headGroup) return;

        this.isAnimating = true;

        this.tweens.add({
            targets: this.headGroup,
            angle: 12,
            duration: 250,
            yoyo: true,
            ease: "Sine.easeInOut",
            onComplete: () => {
                this.headGroup.setAngle(0);
                this.isAnimating = false;
            },
        });
    }

    public feed() {
        if (!this.headGroup || this.isAnimating) return;

        this.isAnimating = true;

        this.tweens.add({
            targets: this.headGroup,
            angle: 18,
            duration: 300,
            yoyo: true,
            repeat: 1,
            ease: "Sine.easeInOut",
            onComplete: () => {
                this.headGroup.setAngle(0);
                this.isAnimating = false;
            },
        });
    }

    public brush() {
        if (!this.foxContainer || this.isAnimating) return;

        this.isAnimating = true;

        this.tweens.add({
            targets: this.foxContainer,
            angle: -3,
            duration: 180,
            yoyo: true,
            repeat: 2,
            ease: "Sine.easeInOut",
            onComplete: () => {
                this.foxContainer.setAngle(0);
                this.isAnimating = false;
            },
        });
    }
}
