import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { MeadowScene } from "./scenes/MeadowScene";
import "./PhaserGame.css";

interface Props {
    scene?: typeof Phaser.Scene;
    onReady?: (game: Phaser.Game) => void;
}

export function PhaserGame({ scene: SceneClass = MeadowScene, onReady }: Props) {
    const gameContainer = useRef<HTMLDivElement>(null);
    const onReadyRef = useRef(onReady);

    useEffect(() => {
        onReadyRef.current = onReady;
    });

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

        onReadyRef.current?.(game);

        return () => {
            game.destroy(true);
        };
    }, [SceneClass]);

    return <div ref={gameContainer} className="phaser-game" />;
}