import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Alert } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SurpriseMeGameScreen = () => {
    const [score, setScore] = useState(0);
    const [rewardShown, setRewardShown] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const obstacleAnim = useRef<Animated.CompositeAnimation | null>(null);
    const [jumping, setJumping] = useState(false);
    const [obstacleLeft, setObstacleLeft] = useState(new Animated.Value(screenWidth));
    const [gameOver, setGameOver] = useState(false);
    const playerBottom = useRef(new Animated.Value(0)).current;

    const playerSize = 50;
    const jumpHeight = 250;
    const groundLevel = 0;

    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setScore((prev) => {
                if (prev + 1 >= 5 && !rewardShown) {
                    setRewardShown(true);
                }
                return prev + 1;
            });
        }, 1000);
    };

    const resetGame = () => {
        setScore(0);
        setRewardShown(false);
        startTimer();
        setGameOver(false);
        playerBottom.setValue(0);
        obstacleLeft.setValue(screenWidth);

        // Restart obstacle animation
        obstacleAnim.current = Animated.loop(
            Animated.timing(obstacleLeft, {
                toValue: -50,
                duration: 3000,
                useNativeDriver: false,
            })
        );
        obstacleAnim.current.start();
    };

    useEffect(() => {
        startObstacle();
        const interval = setInterval(() => {
            checkCollision();
        }, 50);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        startObstacle();
        startTimer();
        return () => {
            timerRef.current && clearInterval(timerRef.current);
        };
    }, []);

    const startObstacle = () => {
        Animated.loop(
            Animated.timing(obstacleLeft, {
                toValue: -50,
                duration: 3000,
                useNativeDriver: false,
            })
        ).start();
    };

    const checkCollision = () => {
        obstacleLeft.addListener(({ value }) => {
            // @ts-ignore
            const playerY = playerBottom._value;
            if (
                value < 70 && value > 20 && // close to player X
                playerY < 60               // not jumping
            ) {
                setGameOver(true);
                obstacleAnim.current?.stop();
                timerRef.current && clearInterval(timerRef.current);
            }
        });
    };

    const jump = () => {
        if (!jumping && !gameOver) {
            setJumping(true);
            Animated.sequence([
                Animated.timing(playerBottom, {
                    toValue: jumpHeight,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(playerBottom, {
                    toValue: groundLevel,
                    duration: 300,
                    useNativeDriver: false,
                }),
            ]).start(() => setJumping(false));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎉 Surprise Me Game</Text>
            <Text style={styles.scoreText}>⏱ Score: {score}</Text>

            {gameOver && !rewardShown && <Text style={styles.failText}>Sorry you couldnot reach 5 seconds!</Text>}
            {rewardShown && (
                <Text style={styles.rewardText}>🎁 You earned a free image generation!</Text>
            )}

            <View style={styles.gameArea}>
                <Animated.View
                    style={[
                        styles.player,
                        { bottom: playerBottom },
                    ]}
                >
                    <Text style={{ fontSize: 24 }}>🧍</Text>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.obstacle,
                        { left: obstacleLeft },
                    ]}
                />
            </View>

            <TouchableOpacity onPress={jump} style={styles.jumpButton}>
                <Text style={styles.jumpText}>JUMP</Text>
            </TouchableOpacity>

            {gameOver && (
                <TouchableOpacity onPress={resetGame} style={styles.playAgainButton}>
                    <Text style={styles.jumpText}>Play Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0b0b25',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 24,
        marginTop: 40,
        marginBottom: 20,
    },
    gameArea: {
        width: screenWidth,
        height: 300,
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 2,
        position: 'relative',
        overflow: 'hidden',
    },
    player: {
        position: 'absolute',
        left: 30,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    obstacle: {
        position: 'absolute',
        bottom: 0,
        width: 50,
        height: 50,
        backgroundColor: '#333',
    },
    jumpButton: {
        marginTop: 40,
        paddingHorizontal: 30,
        paddingVertical: 12,
        backgroundColor: '#4682B4',
        borderRadius: 10,
    },
    jumpText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    playAgainButton: {
        marginTop: 20,
        paddingHorizontal: 30,
        paddingVertical: 12,
        backgroundColor: '#FF6347',
        borderRadius: 10,
    },
    scoreText: {
        fontSize: 18,
        marginTop: 10,
        color: 'white',
    },
    rewardText: {
        fontSize: 20,
        color: 'green',
        marginTop: 10,
        fontWeight: 'bold',
    },
    failText: {
        fontSize: 20,
        color: 'red',
        marginTop: 10,
        fontWeight: 'bold',
    },
});


export default SurpriseMeGameScreen;
