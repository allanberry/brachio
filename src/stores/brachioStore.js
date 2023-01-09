import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from 'axios';

const allNodes = `query nodes {
  nodes(limit: 1000, sortBy: NAME_ASC) {
    _id
    name
    type
    categories
    tags
    # ipeds {
      # _id
      # ADDR_HD2017
      # C15ENPRF_HD2017
      # C15IPGRD_HD2017
      # C15IPUG_HD2017
      # C15SZSET_HD2017
      # C15UGPRF_HD2017
      # CITY_HD2017
      # DVADM01_DRVADM2017_RV
      # DVADM04_DRVADM2017_RV
      # EFGRAD_DRVEF2017_RV
      # EFUG_DRVEF2017_RV
      # ENRTOT_DRVEF2017_RV
      # INSTCAT_HD2017
      # INSTNM_HD2017
      # INSTSIZE_HD2017
      # LATITUDE_HD2017
      # LBRANCH_AL2018
      # LEXOMOT_AL2018
      # LEXOMTLP_DRVAL2018
      # LEXPTOTF_DRVAL2018
      # LEXPTOT_AL2018
      # LOCALE_HD2017
      # LONGITUD_HD2017
      # LSALWAGP_DRVAL2018
      # LSALWAG_AL2018
      # LTCLLCT_AL2018
      # LTCRCLT_AL2018
      # OBEREG_HD2017
      # SANIN04_SAL2017_NIS_RV
      # SANIT04_SAL2017_NIS_RV
      # SFTELCA_DRVHR2017_RV
      # STABBR_HD2017
      # ZIP_HD2017
      # core_revenues_DRVF2018
      # endowment_assets_DRVF2018
      # equity_ratio_DRVF2018
      # fasb_gasb_DRVF2018
    # }
    # arl {
      # _id
      # branch
      # ebooks
      # exch
      # expbibue
      # expcollsup
      # explm
      # exponetime
      # expongoing
      # fac
      # fedsearches
      # foot
      # fringedol
      # fringepct
      # gatecount
      # gradpt
      # gradstu
      # grppres
      # ilbtot
      # illtot
      # inam
      # initcirc
      # item
      # nprfstf
      # opexp
      # phdawd
      # phdfld
      # presptcp
      # prfstf
      # reftrans
      # region
      # regsearches
      # salnprf
      # salprf
      # salstud
      # sample1
      # sample2
      # sample3
      # studast
      # title
      # totexp
      # totpt
      # totsal
      # totstf
      # totstfx
      # totstu
      # type
      # volcount
      # vols
      # year
    # }
  }
}`

export const useBrachioStore = defineStore('brachioStore', {

  state: () => ({
    nodes: [
      // { _id: "a", name: "A" },
      // { _id: "b", name: "B" },
      // { _id: "c", name: "C" },
    ]
  }),
  getters: {
    libraries() {
      return this.nodes.filter(node => node.categories && node.categories[0] === 'library');
    }
  },
  actions: {
    async getNodes() {
      const data = JSON.stringify({
        query: allNodes
      });

      const config = {
        method: 'post',
        url: '/api',
        headers: {
          'content-type': 'application/json',
          'apiKey': import.meta.env.VITE_ATLAS_APIKEY,
        },
        data
      };

      try {
        const response = await axios(config);
        // this.nodes = response.data.data.nodes;
        this.$patch({ nodes: response.data.data.nodes })
        // console.log(this)

      } catch (error) {
        console.error(error);
      }
    }
  },

})
