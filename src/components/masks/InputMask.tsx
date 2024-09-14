import { MaskField } from 'react-mask-field';

export function DocumentMask({ ...otherProps}) {
    return <MaskField
        mask="___.___.___-__"
        replacement="_"
        {...otherProps}
    />;
}

export function CompanyMask({ ...otherProps}) {
    return <MaskField
        mask="__.___.___/____-__"
        replacement="_"
        {...otherProps}
    />;
}

export function PhoneMask({ ...otherProps}) {
    return <MaskField
        mask="(__) ____-_____"
        replacement="_"
        {...otherProps}
    />;
}

export function CepMask({ ...otherProps}) {
    return <MaskField
        mask="_____-___"
        replacement="_"
        {...otherProps}
    />;
}

export function HourMask({ ...otherProps}) {
    return <MaskField
        mask="__:__"
        replacement="_"
        {...otherProps}
    />;
}

export function TimeMask({ ...otherProps}) {
    return <MaskField
        mask="__:__:__"
        replacement="_"
        {...otherProps}
    />;
}