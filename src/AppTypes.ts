export type CroppedRect = {
    aspect?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    unit?: 'px' | '%';
}

//todo check image type and required fields
export type SignForm = {
    image?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    phoneNumber?: string;
    website?: string;
    telegram?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
}

