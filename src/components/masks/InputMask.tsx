import { MaskField } from 'react-mask-field';

export function DocumentMask({ ...otherProps}) {
    return <MaskField
        // ref={inputRef}
        mask="___.___.___-__"
        replacement="_"
        {...otherProps}

    />;
}

export function CompanyMask({ ...otherProps}) {
    return <MaskField
        // ref={inputRef}
        mask="__.___.___/____-__"
        replacement="_"
        {...otherProps}

    />;
}

export function PhoneMask({ ...otherProps}) {
    return <MaskField
        // ref={inputRef}
        mask="(__) ____-_____"
        replacement="_"
        {...otherProps}

    />;
}

export function CepMask({ ...otherProps}) {
    return <MaskField
        // ref={inputRef}
        mask="_____-___"
        replacement="_"
        {...otherProps}

    />;
}

export function HourMask({ ...otherProps}) {
    return <MaskField
        // ref={inputRef}
        mask="__:__"
        replacement="_"
        {...otherProps}

    />;
}

export function TimeMask({ ...otherProps}) {
    return <MaskField
        // ref={inputRef}
        mask="__:__:__"
        replacement="_"
        {...otherProps}

    />;
}