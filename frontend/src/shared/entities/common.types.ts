export type Id = string;

export type Slug = string;

const priceFormatter = new Intl.NumberFormat(
    'ru-RU',
    {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
    },
);

export type Price = Readonly<string>;

export function formatPrice(price: number): Price {
    return priceFormatter.format(price);
}
