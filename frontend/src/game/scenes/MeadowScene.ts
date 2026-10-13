
import Phaser from "phaser";

export class MeadowScene extends Phaser.Scene {

    private foxContainer!: Phaser.GameObjects.Container;

    private positionFox() {
        if (!this.foxContainer) return;

        const { width, height } = this.scale;

        this.foxContainer.setPosition(
            width * 0.5,
            height * 0.62,
        );
    }
    constructor() {
        super("MeadowScene");
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

        const foxX = width * 0.5;
        const foxY = height * 0.62;
        const foxWidth = width * 0.12;

        // Corpo como referência de escala
        const body = this.add.image(0, 0, "fox-body");
        body.setDisplaySize(
            foxWidth,
            foxWidth * (body.height / body.width),
        );

        const scale = foxWidth / body.width;

        // Cauda atrás do corpo
        const tail = this.add.image(
            -foxWidth * 0.70,
            -foxWidth * 0.20,
            "fox-tail",
        ).setScale(scale);

        // Corpo à frente da cauda
        body.setDepth(2);

        // Cabeça
        const head = this.add.image(
            foxWidth * 0,
            -foxWidth * 0.80,
            "fox-head",
        ).setScale(scale);

        // Orelhas: ficam atrás da cabeça
        const earLeft = this.add.image(
            -foxWidth * 0.38,
            -foxWidth * 1.17,
            "fox-ear-left",
        ).setScale(scale);

        const earRight = this.add.image(
            foxWidth * 0.38,
            -foxWidth * 1.17,
            "fox-ear-right",
        ).setScale(scale);

        // Olhos na frente da cabeça
        const eyes = this.add.image(
            foxWidth * 0.06,
            -foxWidth * 0.69,
            "fox-eye-open",
        ).setScale(scale);

        // Animação de piscar dos olhos
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                eyes.setTexture("fox-eye-closed");

                this.time.delayedCall(150, () => {
                    eyes.setTexture("fox-eye-open");
                });
            },
            loop: true,
        });


        // Patas: ficam a frente do corpo
        const pawRight1 = this.add.image(
            foxWidth * 0.25,
            foxWidth * 0.25,
            "fox-paw-right-1",
        ).setScale(scale);

        const pawRight2 = this.add.image(
            foxWidth * 0.38,
            foxWidth * 0.40,
            "fox-paw-right-2",
        ).setScale(scale);

        const pawLeft1 = this.add.image(
            -foxWidth * 0.25,
            foxWidth * 0.30,
            "fox-paw-left-1",
        ).setScale(scale);

        const pawLeft2 = this.add.image(
            -foxWidth * 0.48,
            foxWidth * 0.40,
            "fox-paw-left-2",
        ).setScale(scale);

        this.foxContainer = this.add.container(0, 0, [
            tail,
            pawLeft2,
            pawRight2,
            body,
            earLeft,
            earRight,
            head,
            eyes,
            pawLeft1,
            pawRight1,
        ]);

        // Animação de respiração suave
        this.tweens.add({
            targets: body,
            y: body.y - foxWidth * 0.015,
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
        });

        this.positionFox();

        this.scale.on("resize", () => {
            this.positionFox();
        });
    }


}
