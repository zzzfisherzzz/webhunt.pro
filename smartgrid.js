const smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
const settings = {
    outputStyle: 'sass', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '35px', /* gutter width px || % */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1170px', /* max-width оn very large screen */
        fields: '15px' /* side fields */
    },
    breakPoints: {
        xl: {
            width: '1600px' /* -> @media (max-width: 1100px) */
        },
        lg: {
            width: '1200px'
        },
        md: {
            width: '992px'
        },
        sm: {
            width: '768px'
        },
        xs: {
            width: '500px'
        }
        /*
        We can create any quantity of break points.

        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};

smartgrid('./app/scss', settings);