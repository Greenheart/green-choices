import React, { useState } from 'react'
import { CardView } from './CardView'

import { animated, interpolate } from 'react-spring'
import { useSpring } from 'react-spring'
import { useGesture, GestureState } from 'react-with-gesture'

import { useKeyboardEvent } from '../util/hooks'
import { CardData, EventCard } from '../game/ContentTypes'
import { SwipeDirection } from '../util/constants'

type AnimationState = {
    x: number
    y: number
    scale: number
    rot: number
    delay?: number
}

const to = (i: number): AnimationState => ({
    x: 0,
    y: 0,
    scale: 1,
    rot: 0,
    delay: i * 100,
})
const from = (): AnimationState => ({ rot: 0, scale: 1.0, y: 10, x: 0 })

const trans = (r: number, s: number) =>
    `perspective(1500px) rotate3d(1, 0, 0, 30deg) rotate3d(0, 0, 1, ${r}deg) scale(${s})`

const getDeltaX = () => getThreshold() / window.devicePixelRatio

const getThreshold = () => Math.min(200, window.innerWidth / 2)

type CardProps = {
    i: number
    cardData: CardData | EventCard
    onSwipe: (card: CardData | EventCard, direction: SwipeDirection) => void
    layer: number
}

const Card: React.FunctionComponent<CardProps> = ({
    i,
    cardData,
    onSwipe,
    layer,
}) => {
    const { title, location, text, image } = cardData

    const [cardAnimationState, setCardAnimationState] = useSpring(() => ({
        ...to(i),
        from: from(),
    }))

    const [cardState] = useState<{
        isGone: boolean
        currentKey: string | null
    }>({ isGone: false, currentKey: null })

    const gestureControl: (
        state: Pick<
            GestureState,
            'args' | 'down' | 'delta' | 'distance' | 'direction' | 'velocity'
        >,
    ) => void = ({
        args: [index],
        down,
        delta: [xDelta],
        distance,
        direction: [xDir],
        velocity,
    }) => {
        const trigger =
            Math.abs(xDelta) * window.devicePixelRatio > getThreshold()
        const dir = Math.sign(xDelta)

        if (!down && trigger && !cardState.isGone) {
            // Handle game state updates
            cardState.isGone = true
            window.setTimeout(() => {
                onSwipe(cardData, dir)
                cardState.currentKey = null
            }, 200)
        }
        const isGone = cardState.isGone

        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0)
        const scale = down ? 1.1 : 1

        const animationState = {
            x,
            rot,
            scale,
            delay: undefined,
            config: {
                friction: 50,
                tension: down ? 800 : isGone ? 200 : 500,
            },
        }

        setCardAnimationState(animationState)
    }

    useKeyboardEvent(['ArrowLeft', 'ArrowRight'], (down, key) => {
        if (down && !cardState.currentKey) {
            cardState.currentKey = key
        }
        if (cardState.currentKey === key) {
            const directionX =
                key === 'ArrowLeft' ? SwipeDirection.Left : SwipeDirection.Right
            gestureControl({
                down,
                delta: [directionX * (getDeltaX() + 1), 0],
                direction: [directionX, 0],
                args: [0],
                distance: 0,
                velocity: 5,
            })
        }
    })

    const bind = useGesture((args) => {
        if (!cardState.currentKey) gestureControl(args)
    })

    const { x, y, rot, scale } = cardAnimationState

    return (
        <animated.div
            {...bind(i)}
            key={i}
            style={{
                position: 'absolute',
                left: '50%',
                transform: interpolate(
                    [x, y, rot, scale as any],
                    (x: number, y: number, rot: number, scale: number) =>
                        `translate3d(-50%, 0, 0) translate3d(${x}px,${y}px,0) ` +
                        trans(rot, Number(scale)),
                ),
                zIndex: layer,
            }}
        >
            <CardView
                image={image}
                title={title}
                text={text}
                location={location}
            />
        </animated.div>
    )
}

export default Card
