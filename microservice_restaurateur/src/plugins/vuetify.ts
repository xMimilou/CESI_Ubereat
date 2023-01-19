import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// icons
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { mdiAccount, mdiHomeCity, mdiAccountGroupOutline, 
  mdiMoped, mdiHistory, mdiChartBar, mdiFoodForkDrink, 
  mdiFoodTurkey, mdiOrderBoolAscendingVariant, mdiBellRing, 
  mdiChevronLeft, mdiPlus, mdiDelete, mdiPencil, mdiCheck, mdiClose } from '@mdi/js'; // import the additional icons here.

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases: {
            ...aliases,
            account: mdiAccount,
            homeCity: mdiHomeCity,
            accountGroupOutline: mdiAccountGroupOutline,
            articles: mdiFoodForkDrink,
            menus: mdiFoodTurkey,
            orders: mdiOrderBoolAscendingVariant,
            deliveries: mdiMoped,
            ordersHistory: mdiHistory,
            statistics: mdiChartBar,
            notifications: mdiBellRing,
            chevronLeft: mdiChevronLeft,
            add: mdiPlus,
            delete: mdiDelete,
            update: mdiPencil,
            check: mdiCheck,
            close: mdiClose
        },
        sets: {
          mdi,
        },
      },
});

export default vuetify;