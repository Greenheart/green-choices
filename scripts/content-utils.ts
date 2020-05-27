// GOAL: composable functions to generate content based on ContentTypes + variable input
// GOAL: export JSON
// GOAL: Save game world scenario to specific folder

import { CardData, CardActionData } from '../src/game/ContentTypes'

/**
 * Create a card template to be use to construct additional cards
 * Templates are used to create partial cards
 *
 * @param cardData The must have data for a template card
 * @param extras Optional additional data that is seldom reused from a template
 */
export function createCardTemplate(
    cardData: Pick<CardData, 'image' | 'location' | 'weight'>,
    extras: Partial<Pick<CardData, 'title' | 'text'>> = {},
): CardData {
    return {
        type: 'card',
        ...cardData,
        ...{
            title: '',
            text: '',
            ...extras,
        },
        isAvailableWhen: [],
        actions: {
            left: { modifier: {} },
            right: { modifier: {} },
        },
    }
}

/**
 * Create a card based on a template, to avoid repetition
 *
 * @param template The card template to extend
 * @param override Fields to override
 */
export function createCardFromTemplate(
    template: CardData,
    override: Partial<CardData>,
): CardData {
    return {
        ...template,
        ...override,
    }
}

/*
    User stories

    As a card developer I would like to:
    - Use card templates in order to reduce work duplication
    - Use worldquery templates
    - Use action templates
*/

export function unsplashImage(id: string): string {
    return `https://images.unsplash.com/photo-${id}?fit=crop&w=800&q=60`
}