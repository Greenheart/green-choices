export default [
    {
        probability: 1,
        shouldTriggerWhen: [
            { state: { environment: [0, 0] } },
            { state: { security: [0, 0] } },
            { state: { money: [0, 0] } },
            { state: { people: [0, 0] } }
        ],
        initialEventCardId: 'end-game'
    }
]