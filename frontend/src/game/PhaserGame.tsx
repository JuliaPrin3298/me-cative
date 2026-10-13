
import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { MeadowScene } from "./scenes/MeadowScene";
import "./PhaserGame.css";

export function PhaserGame() {
    const gameContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gameContainer.current) return;

        const game = new Phaser.Game({
            type: Phaser.AUTO,
            parent: gameContainer.current,
            transparent: true,
            width: gameContainer.current.clientWidth,
            height: gameContainer.current.clientHeight,
            scene: [MeadowScene],
            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            render: {
                antialias: true,
                transparent: true,
            },
        });

        return () => {
            game.destroy(true);
        };
    }, []);

    return <div ref={gameContainer} className="phaser-game" />;
}
