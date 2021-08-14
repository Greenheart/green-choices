import {
    Card,
    GameWorld,
    StatDefinition,
    CardActionData,
    WorldQuery,
    CardPriority,
} from '.'

/**
 * This type defines the shape of Scenarios created with this Content API
 */
export type Scenario = {
    id: string
} & GameWorld

export interface ScenarioManifest {
    /**
     * ISO formatted date, generated by the build script.
     */
    buildDate: string
    /**
     * Details about each scenario.
     * IDEA: Add a `meta` field that contains:
     *  - scenario name, description, cover image, estimated playtime, number of cards, credits to creators
     */
    scenarios: {
        [id: string]: {}
    }
}

/**
 * Create a card template to be use to construct additional cards
 * Templates are used to create partial cards
 *
 * @param cardData The must have data for a template card
 * @param extras Optional additional data that is seldom reused from a template
 */
export function createCardTemplate(
    cardData: Pick<Card, 'image' | 'location' | 'weight'>,
    extras: Partial<Pick<Card, 'title' | 'text'>> = {},
): Omit<Card, 'id'> {
    return {
        ...cardData,
        ...{
            title: '',
            text: '',
            ...extras,
        },
        isAvailableWhen: [],
        actions: {
            left: { modifiers: [{}] },
            right: { modifiers: [{}] },
        },
        priority: CardPriority.Card,
    }
}

/**
 * Create a card based on a template, to avoid repetition
 *
 * @param id The card id of the created card
 * @param template The card template to extend
 * @param override Fields to override
 */
export function createCardFromTemplate(
    id: Card['id'],
    template: Omit<Card, 'id'>,
    override: Partial<Card>,
): Card {
    return {
        id,
        ...template,
        ...override,
    }
}

/**
 * Get the unsplash image URL for a given id
 *
 * @param id The unsplash image id
 */
export function unsplashImage(id: string): string {
    return `https://images.unsplash.com/photo-${id}?fit=crop&w=800&q=60`
}

/**
 * Get the Pexels image URL for a given id
 *
 * @param id The pexels image id
 */
export function pexelsImage(id: string): string {
    return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300`
}

// Credit: https://gist.github.com/mathewbyrne/1280286
function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

/**
 * Create a WorldQuery.
 *
 * WorldQueries are used to define when cards should be available, or when events should trigger.
 *
 * @param state A set of WorldStateRanges that need to exist when this query should match
 * @param flags A set of flags that need to exist when this query should match
 */
export function worldQuery(
    state: WorldQuery['state'] = {},
    flags: WorldQuery['flags'] = {},
): WorldQuery {
    return {
        state,
        flags,
    }
}

/**
 * Dynamic flags created by content utils to alter card behaviors.
 */
const dynamicFlags = {
    showOnlyOnce: {},
}

/**
 * Returns all dynamic flags created by content utils
 */
export function getDynamicFlags() {
    return {
        ...dynamicFlags.showOnlyOnce,
    }
}

/**
 * Add flags to ensure a card only will show once.
 *
 * @param card Card to modify
 * @returns Updated card that only will show once.
 */
export function showOnlyOnce(card: Card) {
    const hasBeenShown = propRef('once')
    const expectedState = { [hasBeenShown]: false }
    const modifier = setModifier({}, { [hasBeenShown]: true })

    card.isAvailableWhen = card.isAvailableWhen.map((query) => ({
        state: query.state,
        flags: {
            ...query.flags,
            ...expectedState,
        },
    }))
    card.actions.left.modifiers.push(modifier)
    card.actions.right.modifiers.push(modifier)

    Object.assign(dynamicFlags.showOnlyOnce, expectedState)

    return card
}

export type Modifier = CardActionData['modifiers'][number]

/**
 * Create a swipeAction by combining a description with one or more modifiers.
 *
 * @param description A short text to explain one of the alternatives in a swipe decision.
 * @param modifiers One or more modifiers that should be applied when the player choose this course of action.
 * @param next Point to a specific card to show directly when an action was taken.
 */
export function action(
    modifiers: Modifier | Modifier[],
    description?: string,
    next?: Card['id'],
): CardActionData {
    return {
        description,
        modifiers: Array.isArray(modifiers) ? modifiers : [modifiers],
        ...(next ? { next } : {}),
    }
}

/**
 * Easily create a `set` modifier, to be used within an action
 *
 * Modifiers update the game state and flags
 *
 * @param state The state to modify
 * @param flags The flags to modify
 */
export const setModifier = modifier('set')

/**
 * Easily create an `add` modifier, to be used within an action
 *
 * Modifiers update the game state and flags
 *
 * @param state The state to modify
 * @param flags The flags to modify
 */
export const addModifier = modifier('add')

/**
 * Easily create a `replace` modifier, to be used within an action
 *
 * Modifiers update the game state and flags
 *
 * @param state The state to modify
 * @param flags The flags to modify
 */
export const replaceModifier = modifier('replace')

/**
 * Create an modifier factory
 *
 * @param type The modifier type to use
 */
export function modifier(
    type: Modifier['type'],
): (state?: Modifier['state'], flags?: Modifier['flags']) => Modifier {
    return (state = {}, flags = {}) => {
        return {
            type,
            state,
            flags,
        }
    }
}

/**
 * Generate a unique cardRef to identify cards
 *
 * @param debugHint A string to identify the cardRef and help debugging
 */
export const cardRef: (debugHint: string) => string = createRefFactory('card')

/**
 * Generate a unique propRef to identify properties
 *
 * @param debugHint A string to identify the propRef and help debugging
 */
export const propRef: (debugHint: string) => string = createRefFactory('prop')

/**
 * Generate a reference factory in order to use separate reference contexts
 *
 * @param type A string to identify the type of reference to create
 */
function createRefFactory(type: string) {
    const typeSlug = slugify(type)
    let ticker = 0

    return (debugHint: string) => {
        const prefix = slugify(debugHint)
        return `${prefix}:${typeSlug}:${ticker++}`
    }
}

/**
 * Create a reusable StatDefinition. This is useful to acoid hard coded strings.
 *
 * @param name Display name to show represent the stat in UI and text
 * @param icon Icon code to use. Represents an icon component name from `react-icons`
 * @param iconSize A CSS size unit to change icon size
 */
export function stat(
    name: string,
    icon: string,
    iconSize?: string,
): StatDefinition {
    return {
        id: slugify(name),
        name,
        icon,
        iconSize,
    }
}

export function createIdContext(namespace?: string) {
    let index = 0
    const map = new Map<unknown, string>()
    return (obj: unknown) => {
        const id =
            map.get(obj) ||
            [namespace, index++].filter((v) => v !== undefined).join(':')
        map.set(obj, id)
        return id
    }
}
