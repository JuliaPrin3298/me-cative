
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
            foxX + foxWidth * 0.12,
            foxY - foxWidth * 0.05,
            "fox-tail",
        );
        tail.setScale(scale);
        tail.setDepth(1);

        // Corpo à frente da cauda
        body.setDepth(2);

        // Cabeça
        const head = this.add.image(
            foxX,
            foxY - foxWidth * 0.42,
            "fox-head",
        );
        head.setScale(scale);
        head.setDepth(3);

        // Orelhas: ficam atrás da cabeça
        const earLeft = this.add.image(
            foxX - foxWidth * 0.10,
            foxY - foxWidth * 0.62,
            "fox-ear-left",
        );
        earLeft.setScale(scale);
        earLeft.setDepth(2.5);

        const earRight = this.add.image(
            foxX + foxWidth * 0.10,
            foxY - foxWidth * 0.62,
            "fox-ear-right",
        );
        earRight.setScale(scale);
        earRight.setDepth(2.5);

        // Olhos na frente da cabeça
        const eyes = this.add.image(
            foxX,
            foxY - foxWidth * 0.42,
            "fox-eye-open",
        );
        eyes.setScale(scale);
        eyes.setDepth(4);

        this.foxContainer = this.add.container(0, 0, [
            tail,
            body,
            earLeft,
            earRight,
            head,
            eyes,
        ]);

        this.positionFox();

        this.scale.on("resize", () => {
            this.positionFox();
        });
    }


}
