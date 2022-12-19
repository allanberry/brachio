const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

const filesets = [
    {
        src: "./from_google/Brachio - arls.csv",
        target: "./to_atlas/arls.json",
        rm_2nd_line: true,
        colParser: {
            "branch": (item) => item == true,
            "ebooks": "number",
            "exch": "number",
            "expcollsup": "number",
            "explm": "number",
            "exponetime": "number",
            "expongoing": "number",
            "fac": "number",
            "fedsearches": "number",
            "expbibue": "number",
            "foot": (item) => item == true,
            "fringedol": "number",
            "fringepct": "number",
            "gatecount": "number",
            "gradpt": "number",
            "gradstu": "number",
            "grppres": "number",
            "ilbtot": "number",
            "illtot": "number",
            "initcirc": "number",
            "item": "number",
            "nprfstf": "number",
            "opexp": "number",
            "phdawd": "number",
            "phdfld": "number",
            "presptcp": "number",
            "prfstf": "number",
            "reftrans": "number",
            "region": "number",
            "regsearches": "number",
            "salnprf": "number",
            "salprf": "number",
            "salstud": "number",
            "sample1": (item) => item == true,
            "sample2": (item) => item == true,
            "sample3": (item) => item == true,
            "studast": "number",
            "title": "number",
            "totexp": "number",
            "totpt": "number",
            "totsal": "number",
            "totstf": "number",
            "totstfx": "number",
            "totstu": "number",
            "volcount": (item) => item == true,
            "vols": "number",
            "year": "number",
        }
    },
    {
        src: "./from_google/Brachio - connections.csv",
        target: "./to_atlas/connections.json",
        colParser: {}
    },
    {
        src: "./from_google/Brachio - ipeds.csv",
        rm_2nd_line: true,
        target: "./to_atlas/ipeds.json",
        colParser: {
            "C15ENPRF_HD2017": "number",
            "C15IPGRD_HD2017": "number",
            "C15IPUG_HD2017": "number",
            "C15SZSET_HD2017": "number",
            "C15UGPRF_HD2017": "number",
            "core_revenues_DRVF2018": "number",
            "DVADM01_DRVADM2017_RV": "number",
            "DVADM04_DRVADM2017_RV": "number",
            "EFGRAD_DRVEF2017_RV": "number",
            "EFUG_DRVEF2017_RV": "number",
            "endowment_assets_DRVF2018": "number",
            "ENRTOT_DRVEF2017_RV": "number",
            "equity_ratio_DRVF2018": "number",
            "INSTCAT_HD2017": "number",
            "INSTSIZE_HD2017": "number",
            "LATITUDE_HD2017": "number",
            "LBRANCH_AL2018": "number",
            "LEXOMOT_AL2018": "number",
            "LEXOMTLP_DRVAL2018": "number",
            "LEXPTOT_AL2018": "number",
            "LEXPTOTF_DRVAL2018": "number",
            "LOCALE_HD2017": "number",
            "LONGITUD_HD2017": "number",
            "LSALWAG_AL2018": "number",
            "LSALWAGP_DRVAL2018": "number",
            "LTCLLCT_AL2018": "number",
            "LTCRCLT_AL2018": "number",
            "OBEREG_HD2017": "number",
            "SANIN04_SAL2017_NIS_RV": "number",
            "SANIT04_SAL2017_NIS_RV": "number",
            "SFTELCA_DRVHR2017_RV": "number",
        }
    },
    {
        src: "./from_google/Brachio - locations.csv",
        target: "./to_atlas/locations.json",
        colParser: {
            "latitude": "number",
            "longitude": "number"
        }
    },
    {
        src: "./from_google/Brachio - nodes.csv",
        target: "./to_atlas/nodes.json",
        colParser: {
            "categories": (item) => item.split(',').map(element => element.trim()),
            "tags": (item) => item.split(',').map(element => element.trim()),
        }
    },
    {
        src: "./from_google/Brachio - urls.csv",
        target: "./to_atlas/urls.json",
        colParser: {
            "rank": "number",
            "label": "home",
            "include": (item) => item === "TRUE",
        }
    }
]

async function convert() {
    for (fileset of filesets) {
        const srcpath = path.join(__dirname, fileset.src);
        const targetpath = path.join(__dirname, fileset.target);

        var jsonArray = await csv({trim:true, ignoreEmpty:true, colParser:fileset.colParser}).fromFile(srcpath);

        if (fileset.rm_2nd_line) {
            jsonArray.splice(0, 1);
        }
        fs.writeFileSync(targetpath, JSON.stringify(jsonArray, null, "  "));

    }
}

convert();