export const formatCurrency = (value?: number) => {
    if (value !== undefined) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    }
    return '';
};

export const parseCurrencyToFloat = (value: string) => {
    const numericValue = value.replace(/[^\d,-]/g, '').replace(',', '.');
    return parseFloat(numericValue) || 0;
};


