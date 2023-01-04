export const NAV_TEXT_STYLE = 'text-dirty-orange font-roboto uppercase hover:text-hover-white hover:no-underline cursor-pointer outline-none'

export function objectKeys<Obj extends object>(obj: Obj): (keyof Obj)[] {
    return Object.keys(obj) as (keyof Obj)[];
}
