interface WC {
    name?: string,
    lat?: number,
    lng?: number,
    price?: number,
    isPublic?: boolean
}

interface Marker {
    lat?: number,
    lng?: number,
}

export type {WC, Marker}