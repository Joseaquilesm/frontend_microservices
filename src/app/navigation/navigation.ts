import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'products',
                title    : 'Products',
                type     : 'item',
                icon     : 'cart',
                url      : '/home'
            }
        ]
    }
];
