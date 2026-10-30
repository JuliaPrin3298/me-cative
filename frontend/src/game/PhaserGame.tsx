import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { MeadowScene } from "./scenes/MeadowScene";
import "./PhaserGame.css";

interface Props {
    scene?: typeof Phaser.Scene;
}

export function PhaserGame({ scene: SceneClass = MeadowScene }: Props) {
    const gameContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = gameContainer.current;
        if (!container) return;

        const game = new Phaser.Game({
            type: Phaser.AUTO,
            parent: container,
            transparent: true,
            width: container.clientWidth,
            height: container.clientHeight,
            scene: [SceneClass],
            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            render: {
                antialias: true,
                transparent: true,
            },
            audio: {
                noAudio: true,
            },
        });

        return () => {
            game.destroy(true);
        };
    }, [SceneClass]);

    return <div ref={gameContainer} className="phaser-game" />;
}
