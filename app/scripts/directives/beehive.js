'use strict';

/**
 * @ngdoc directive
 * @name electionApp.directive:beehive
 * @description
 * # beehive
 */
angular.module('electionApp')
  .directive('beehive', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var width = attrs.width,
            height = attrs.height,
            radius = attrs.hexRadius;
        var topology = hexTopology(radius, width, height);
        var projection = hexProjection(radius);
        var path = d3.geo.path()
            .projection(projection);
        var svg = d3.select(element[0]).append("svg")
            .attr("width", width)
            .attr("height", height);
        var parties = [
            {
              "id": 1,
              "party_name": "မြိုတိုင်းရင်းသားဖွံ့ဖြိုး​ရေးပါတီ",
              "party_name_english": "Mro National Development Party",
              "abbreviation": "MNDP",
              "establishment_date": null,
              "member_count": "",
              "leadership": [
                "ဦးစံသာအောင်",
                "ဦးလာဘွေ"
              ],
              "establishment_approval_date": null,
              "registration_application_date": 1270771200000,
              "registration_approval_date": 1272412800000,
              "approved_party_number": "အမှတ်စဉ်( ၁ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/1-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/1-logo.png",
              "chairman": [
                "ဦးစံသာအောင်",
                "ဦးလာဘွေ"
              ],
              "region": "ရခိုင်ပြည်နယ်နှင့် ချင်းပြည်နယ် ပလက်ဝမြို့။",
              "headquarters": "အမှတ်(၂၀၂)၊စာတိုက်လမ်း၊ပြည်တော်သာ ရပ်ကွက်၊ ကျောက်တော်မြို့နယ်၊ရခိုင်ပြည်နယ်",
              "contact": [
                "၀၉-၄၂၁၇၃၄၅၀၈(ဥက္ကဌ)"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/1%20Mro%20or%20Khami%20National%20Solidarity%20Organization.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757814,
              "updated_at": 1442212757814
            },
            {
              "id": 2,
              "party_name": "တိုင်းရင်းသားစည်းလုံးညီညွတ်ရေးပါတီ",
              "party_name_english": "National Unity Party",
              "abbreviation": "",
              "establishment_date": null,
              "member_count": "",
              "leadership": [
                "ဦးထွန်းရီ",
                "ဦးသန်းတင်"
              ],
              "establishment_approval_date": null,
              "registration_application_date": 1269820800000,
              "registration_approval_date": 1272499200000,
              "approved_party_number": "အမှတ်စဉ်( ၂ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/2-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/2-logo.png",
              "chairman": [
                "ဦးထွန်းရီ",
                "ဦးသန်းတင်(ထွေ/မှူး)"
              ],
              "region": "ပြည်ထောင်စုတစ်ဝန်းလုံး",
              "headquarters": "အမှတ် (၂၄)၊ အောင်ဇေယျလမ်း၊ ရွှေတောင်ကြား(၁)ရပ်ကွက်၊ ဗဟန်းမြို့နယ်၊ ရန်ကုန်တိုင်းဒေသကြီး",
              "contact": [
                "၀၉-၄၂၁၁၀၉၅၅၀",
                "၀၁-၅၃၇၆၀၁",
                "၀၁-၅၅၇၄၈၀",
                "၀၁-၅၅၄၂၁၉(ဖက်စ်)"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/2/2.1.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757816,
              "updated_at": 1442212757816
            },
            {
              "id": 3,
              "party_name": "လားဟူအမျိုးသားဖွံ့ဖြိုးတိုးတက်ရေးပါတီ",
              "party_name_english": "La Hu National Development Party",
              "abbreviation": "",
              "establishment_date": null,
              "member_count": "",
              "leadership": [
                "ဦးကျဟားရှဲ",
                "ဦးယောသပ်"
              ],
              "establishment_approval_date": null,
              "registration_application_date": 1271980800000,
              "registration_approval_date": 1272499200000,
              "approved_party_number": "အမှတ်စဉ်( ၃ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/3-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/3-logo.png",
              "chairman": [
                "ဦးယောသပ်",
                "ဦးသက်ဝင်း(ထွေ/မှူး)"
              ],
              "region": "ရှမ်းပြည်နယ်အတွင်း",
              "headquarters": "အမှတ်(၄၃)၊ လမ်းသွယ်(၄)၊ ပါရမီလမ်း၊ ရပ်ကွက်(၁)၊ လားရှိုးမြို့၊ ရှမ်းပြည်နယ်။    ",
              "contact": [
                "၀၉-၄၉၂၁၉၆၇၂(ဦးယောသပ်)",
                "၀၈၂-၂၂၇၁၃",
                "၀၈၂-၂၃၁၀၆"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/3La%20Hu%20National%20Development%20Party.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757817,
              "updated_at": 1442212757817
            },
            {
              "id": 4,
              "party_name": "ကိုးကန့်ဒီမိုကရေစီနှင့်ညီညွတ်ရေးပါတီ",
              "party_name_english": "Kokang Democracy and Unity Party",
              "abbreviation": "",
              "establishment_date": null,
              "member_count": "",
              "leadership": [
                "ဦးလော်ဆင်ကွမ်း",
                "ဦးခင်မောင်အေး"
              ],
              "establishment_approval_date": null,
              "registration_application_date": 1272585600000,
              "registration_approval_date": 1273190400000,
              "approved_party_number": "အမှတ်စဉ်( ၄ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/4-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/4-logo.png",
              "chairman": [
                "ဦးထွန်းနိုင်",
                "ဦးဇော်ထွန်း(တွင်း/မှူး-၁)"
              ],
              "region": "ရှမ်းပြည်နယ်အတွင်း",
              "headquarters": "အမှတ်(၂၆)၊ မြဝတီလမ်း၊ နယ်မြေ(၅)၊ရပ်ကွက်(၁)၊လားရှိုးမြို့၊ ရှမ်းပြည်နယ်။",
              "contact": [
                "၀၉-၅၂၆၂၁၉၅(ဦးလော်ဆင်ကွမ်း)",
                "၀၉-၆၇၀၀၉၇၁",
                "၀၈၂-၂၄၆၂၇(ဖက်စ်)"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/4Kokang%20Democracy%20and%20Unity%20Party.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757818,
              "updated_at": 1442212757818
            },
            {
              "id": 5,
              "party_name": "ပအိုဝ်းအမျိုးသားအဖွဲ့ချုပ်(PNO)ပါတီ",
              "party_name_english": "Pao National Organization",
              "abbreviation": "PNO",
              "establishment_date": 1270166400000,
              "member_count": "၁၅ ဦး",
              "leadership": [
                "ဦးစံလွင်",
                "ဦးဝင်းကို"
              ],
              "establishment_approval_date": 1271980800000,
              "registration_application_date": 1273104000000,
              "registration_approval_date": 1273708800000,
              "approved_party_number": "အမှတ်စဉ်( ၅ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/5-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/5-logo.png",
              "chairman": [
                "ဦးစံလွင်",
                "ဦးခွန်သိန်းဖေ"
              ],
              "region": "ပြည်ထောင်စုတစ်ဝန်းလုံး",
              "headquarters": "အမှတ်(၁၈)၊ အနောက်မြို့ပတ်လမ်း၊ စျေးပိုင်းရပ်၊ တောင်ကြီးမြို့၊ ရှမ်းပြည်နယ်။",
              "contact": [
                "၀၉-၄၉၃၆၃၂၈၂"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/5Pao%20National%20Organization%20PNO.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757818,
              "updated_at": 1442212757818
            },
            {
              "id": 6,
              "party_name": "ဒီမိုကရက်တစ်ပါတီ(မြန်မာ)",
              "party_name_english": "Democratic Party(Myanmar)",
              "abbreviation": "",
              "establishment_date": 1269907200000,
              "member_count": "၂၀ ဦး",
              "leadership": [
                "ဦးသုဝေ",
                "ဒေါ်သန်းသန်းနု"
              ],
              "establishment_approval_date": 1272499200000,
              "registration_application_date": 1273536000000,
              "registration_approval_date": 1274313600000,
              "approved_party_number": "အမှတ်စဉ်( ၆ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/6-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/6-logo.png",
              "chairman": [
                "ဦးသုဝေ",
                "ဒေါ်သန်းသန်းနု(တွင်း/မှူးချုပ်)"
              ],
              "region": "ပြည်ထောင်စုတစ်ဝန်းလုံး",
              "headquarters": "အမှတ်(၄၆၅)၊ သိမ်ဖြူလမ်း၊ ဖို့မြေရပ်ကွက်၊ မင်္ဂလာတောင်ညွန့်မြို့နယ်၊ ရန်ကုန်တိုင်းဒေသကြီး။",
              "contact": [
                "၀၉-၈၀၂၀၂၅၄",
                "၀၁-၅၄၁၆၄၉(ဒေါ်သန်းသန်းနု)",
                "၀၉-၅၀၈၄၉၆၃"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/6Democratic%20Party%20Myanmar.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757819,
              "updated_at": 1442212757819
            },
            {
              "id": 7,
              "party_name": "ကယန်းအမျိုးသားပါတီ",
              "party_name_english": "Kayan National Party",
              "abbreviation": "",
              "establishment_date": 1272240000000,
              "member_count": "၁၇  ဦး",
              "leadership": [
                "ဦးခူးယူဂျင်း",
                "ဦးလောရင်း"
              ],
              "establishment_approval_date": 1272931200000,
              "registration_application_date": 1273536000000,
              "registration_approval_date": 1274313600000,
              "approved_party_number": "အမှတ်စဉ်( ၇ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/7-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/7-logo.png",
              "chairman": [
                "ဦးခူးယူဂျင်း",
                "ဦးနန်းရီ(ထွေ/မှူး)"
              ],
              "region": "ပြည်ထောင်စုတစ်ဝန်းလုံး",
              "headquarters": "အမှတ်(ည/၁၂၅)၊ သိုင်းဗဟန်လမ်း၊ ညောင်ကုန်း (၃)ရပ်ကွက်၊ ဖယ်ခုံမြို့၊ ရှမ်းပြည်နယ်။    ",
              "contact": [
                "၀၈၁-၅၆၁၅၃(ဦးခူးယူဂျင်)"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/7Kayan%20National%20Party.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757820,
              "updated_at": 1442212757820
            },
            {
              "id": 8,
              "party_name": "ရခိုင်ပြည်နယ်အမျိုးသားအင်အားစုပါတီ",
              "party_name_english": "Rakhine State National United Party",
              "abbreviation": "",
              "establishment_date": 1272412800000,
              "member_count": "၁၅ ဦး",
              "leadership": [
                "ဦးအေးကြိုင်",
                "ဦးတင်မြင့်"
              ],
              "establishment_approval_date": 1272931200000,
              "registration_application_date": 1273536000000,
              "registration_approval_date": 1274313600000,
              "approved_party_number": "အမှတ်စဉ်( ၈ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/8-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/8-logo.png",
              "chairman": [
                "ဦးအေးကြိုင်",
                "ဦးမောင်အုံးတင်(တွဲ-တွင်း/မှူး)"
              ],
              "region": "ပြည်ထောင်စုတစ်ဝန်းလုံး",
              "headquarters": "အမှတ်(၅၄)၊ (၁၄/၂)ရပ်ကွက်၊ ရွှေပြည်စိုးလမ်း တောင်ဥက္ကလာပမြို့နယ်၊ ရန်ကုန်တိုင်းဒေသကြီး     ",
              "contact": [
                "၀၉-၄၂၁၀၉၅၈၃၃(ဦးအေးကြိုင်)",
                "၀၉-၄၂၀၁၀၄၂၄၅(ဦးညီညီ)",
                ""
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/8%20Rakhine%20State%20National%20United%20Party%20of%20Myanmar.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757820,
              "updated_at": 1442212757820
            },
            {
              "id": 9,
              "party_name": "ကရင်ပြည်သူ့ပါတီ",
              "party_name_english": "Kayin Peoples Party",
              "abbreviation": "KPP",
              "establishment_date": 1269993600000,
              "member_count": "၁၆ ဦး",
              "leadership": [
                "ဦးထွန်းအောင်မြင့်",
                "ဦးစောစေးဝါး(ထွေ/မှူး)"
              ],
              "establishment_approval_date": 1272499200000,
              "registration_application_date": 1273622400000,
              "registration_approval_date": 1274400000000,
              "approved_party_number": "အမှတ်စဉ်( ၉ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/9-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/9-logo.png",
              "chairman": [
                "ဦးထွန်းအောင်မြင့်",
                "ဦးစောစေးဝါး(ထွေ/မှူး)"
              ],
              "region": "ပြည်ထောင်စုတစ်ဝန်းလုံး",
              "headquarters": "အမှတ်(၆၃၂)၊ ဃ/၁၆၊ အာဇာနည်လမ်း ၊    အမှတ်(၄)လမ်းမဆုံ၊ ရပ်ကွက်(၅)၊ ရွှေပြည်သာမြို့နယ်၊ ရန်ကုန်တိုင်းဒေသကြီး။",
              "contact": [
                "၀၉-၅၁၈၀၁၆၄",
                "၀၁-၆၁၁၆၁၂"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/9Kayin%20Peoples%20Party%20KPP.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757821,
              "updated_at": 1442212757821
            },
            {
              "id": 10,
              "party_name": "“ဝ”အမျိုးသားစည်းလုံးညီညွတ်ရေးပါတီ",
              "party_name_english": "Wa National Unity Party",
              "abbreviation": "",
              "establishment_date": 1272499200000,
              "member_count": "၁၅ ဦး",
              "leadership": [
                "ဦးလုပ်ပေါင်း",
                "ဦးညီပလုပ်"
              ],
              "establishment_approval_date": 1272931200000,
              "registration_application_date": 1273622400000,
              "registration_approval_date": 1274400000000,
              "approved_party_number": "အမှတ်စဉ်( ၁၀ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/10-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/10-logo.png",
              "chairman": [
                "ဦးညီပလုပ်",
                "ဦးဂျိုးဇက်ထွန်း(တွင်း/မှူး-၁)"
              ],
              "region": "ရှမ်းပြည်နယ်အတွင်း",
              "headquarters": "အမှတ်(၃၆)ဗျူဟာလမ်း၊ နယ်မြေ(၂)၊ (၁)ရပ်ကွက်၊ လားရှိုးမြို့၊ ရှမ်းပြည်နယ်။      ",
              "contact": [
                "၀၉-၄၀၃၇၄၂၅၄၀(ဦ:ဆမ်ဆောင်ကား) ၀၉-၅၂၆၀၃၁၉",
                "၀၈၂-၂၂၂၂၉",
                "၀၉-၅၂၆၀၂၉၃",
                "၀၈၂-၂၂၇၁၃"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/10/10.1.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757822,
              "updated_at": 1442212757822
            },
            {
              "id": 11,
              "party_name": "တအာင်း(ပလောင်)အမျိုးသားပါတီ",
              "party_name_english": "Ta-Arng (Palaung) National Party",
              "abbreviation": "",
              "establishment_date": 1270684800000,
              "member_count": "၁၅ ဦး",
              "leadership": [
                "ဦးအိုက်မုန်း",
                "ဦးထွန်းကျော်"
              ],
              "establishment_approval_date": 1271980800000,
              "registration_application_date": 1273795200000,
              "registration_approval_date": 1274659200000,
              "approved_party_number": "အမှတ်စဉ်( ၁၂ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/11-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/11-logo.png",
              "chairman": [
                "ဦးအိုက်မုန်း",
                "ဦးထွန်းကျော်(ထွေ/မှူး)"
              ],
              "region": "ပြည်ထောင်စုတစ်ဝန်းလုံး",
              "headquarters": "အမှတ်(က/၁၁၀)ဗိုလ်ချုပ်အောင်ဆန်းလမ်း၊ မင်္ဂလာရပ်၊ နမ့်ဆန်မြို့၊ ရှမ်းပြည်နယ်။   ",
              "contact": [
                "၀၉-၂၀၀၃၅၄၁(ဦ:မိုင်းအုဏ်းခိုင်)",
                "၀၉-၄၃၁၄၆၂၅၀",
                "၀၉-၆၇၁၂၀၅၁(ဦးအိုက်မုန်း)",
                "၀၉-၉၀၄၀၆၅၁"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/11Ta-Arng%20PalaungNational%20Party.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757822,
              "updated_at": 1442212757822
            },
            {
              "id": 12,
              "party_name": "မွန်ဒေသလုံးဆိုင်ရာဒီမိုကရေစီပါတီ",
              "party_name_english": "All Mon Regions Democracy Party",
              "abbreviation": "",
              "establishment_date": 1272585600000,
              "member_count": "၁၅ ဦး",
              "leadership": [
                "ဦးငွေသိန်း",
                "ဦးနိုင်လှအောင်"
              ],
              "establishment_approval_date": 1272931200000,
              "registration_application_date": 1273795200000,
              "registration_approval_date": 1274659200000,
              "approved_party_number": "အမှတ်စဉ်( ၁၃ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/12-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/12-logo.png",
              "chairman": [
                "ဦးငွေသိန်း",
                "ဦးထွန်းရီ(ခ)မင်းနွယ်စိုး(ထွေ/မှူး)"
              ],
              "region": "ပြည်ထောင်စုတစ်ဝန်းလုံး",
              "headquarters": "ခြံအမှတ်(၂၂၇)၊ (၆)လမ်း၊ မြိုင်သာယာမြို့သစ်၊ မော်လမြိုင်မြို့၊ မွန်ပြည်နယ်။",
              "contact": [
                "၀၉-၅၃၂၁၄၁၇(ဦ:ငွေသိန်း)",
                "၀၉-၈၇၃၀၉၆၄(ဦးနိုင်လှအောင်)",
                "၀၉-၄၂၅၂၆၆၂၉၇(စံတင်)"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/12All%20Mon%20Regions%20Democracy%20Party.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757823,
              "updated_at": 1442212757823
            },
            {
              "id": 13,
              "party_name": "ဒီမိုကရေစီနှင့်ငြိမ်းချမ်းရေးပါတီ",
              "party_name_english": "Democracy and Peace Party",
              "abbreviation": "",
              "establishment_date": 1272931200000,
              "member_count": "၁၇ ဦး",
              "leadership": [
                "ဦးစိုးမောင်",
                "ဦးလှမျိုးမြင့်"
              ],
              "establishment_approval_date": 1273104000000,
              "registration_application_date": 1273708800000,
              "registration_approval_date": 1274659200000,
              "approved_party_number": "အမှတ်စဉ်( ၁၄ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/13-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/13-logo.png",
              "chairman": [
                "ဦးအောင်သန်း",
                "ဦးမျိုးမြင့်(ထွေ/မှူး)"
              ],
              "region": "ပြည်ထောင်စုတစ်ဝန်းလုံး",
              "headquarters": "အမှတ်(၁၀၃)၊ (၃လွှာ)၊ သမိန်ဗရမ်းလမ်း၊ တာမွေကြီး(က+ဂ)ရပ်ကွက်၊ တာမွေမြို့နယ်၊ ရန်ကုန်တိုင်းဒေသကြီး။",
              "contact": [
                "၀၉-၇၃၀၈၂၄၅၁",
                "၀၉-၇၃၂၀၄၈၃၄(ဦ:စိုးမောင်)",
                "၀၉-၇၃၁၃၃၇၇၇",
                "၀၉-၈၆၃၁၅၁၆(ဦးအောင်သန်း)"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/13Democracy%20and%20Peace%20Party.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757824,
              "updated_at": 1442212757824
            },
            {
              "id": 14,
              "party_name": "ရှမ်းတိုင်းရင်းသားများဒီမိုကရက်တစ်ပါတီ",
              "party_name_english": "Shan Nationalities Democratic Party",
              "abbreviation": "",
              "establishment_date": 1270684800000,
              "member_count": "၁၅ ဦး",
              "leadership": [
                "ဦးစိုင်းအိုက်ပေါင်း",
                "ဦးနယ်(လ်)ဆင်(ခ)ဦးဆောင်ဆီ"
              ],
              "establishment_approval_date": 1272844800000,
              "registration_application_date": 1274140800000,
              "registration_approval_date": 1274832000000,
              "approved_party_number": "အမှတ်စဉ်( ၁၅ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/14-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/14-logo.png",
              "chairman": [
                "ဦးစိုင်းအိုက်ပေါင်း",
                "ဦးစိုင်းလှကျော်(ထွေ/မှူး)"
              ],
              "region": "ပြည်ထောင်စုတစ်ဝန်းလုံး",
              "headquarters": "အမှတ်(၃၂၆)၊တောင်ကျောင်းလမ်း၊ မြို့မရပ်၊ တောင်ကြီးမြို့၊ ရှမ်းပြည်နယ်။",
              "contact": [
                "၀၉-၄၁၀၀၈၂၂၅(ဦ:စောယွန်းပိုင်)",
                "၀၉-၅၁၅၉၉၉၈",
                "၀၉-၂၀၂၁၃၅၈ (ဦးစိုင်းမောင်တင်)",
                "၀၈၁-၂၀၂၀၆၄",
                "၀၉-၇၃၀၄၆၂၀၆(ဦးစိုင်းလှကျော်)"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/14Shan%20Nationalities%20Democratic%20Party.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757825,
              "updated_at": 1442212757825
            },
            {
              "id": 15,
              "party_name": "ညီညွတ်သောဒီမိုကရက်တစ်ပါတီ(UDP)",
              "party_name_english": "United Democratic Party",
              "abbreviation": "UDP",
              "establishment_date": 1272844800000,
              "member_count": "၁၇ ဦး",
              "leadership": [
                "ဦးဘိုမောင်း(နုတ်ထွက်)",
                "ဦးလှမြင့်"
              ],
              "establishment_approval_date": 1273104000000,
              "registration_application_date": 1274054400000,
              "registration_approval_date": 1274832000000,
              "approved_party_number": "အမှတ်စဉ်( ၁၆ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/15-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/15-logo.png",
              "chairman": [
                "ဦးလှမြင့်",
                "ဦးမျိုးညွန့်(တွဲ-တွင်း/မှူး)"
              ],
              "region": "ပြည်ထောင်စုတစ်ဝန်းလုံး",
              "headquarters": "၃၄၁၊ ဆုတောင်ပြည့်ဘုရားလမ်း၊ စျေးရပ်ကွက်၊ သရက်မြို့၊ မကွေးတိုင်းဒေသကြီး။",
              "contact": [
                "၀၉-၄၀၁၅၇၈၀၅၇(ဥက္ကဌ) ၀၇၁-၅၅၀၇၅",
                "၀၆၈-၂၁၃၉၈",
                "၀၉-၅၀၈၉၂၂၂(ဦးဗန်နေ)"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/15United%20Democratic%20Party%20UDP.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757825,
              "updated_at": 1442212757825
            },
            {
              "id": 16,
              "party_name": "၈၈မျိုးဆက်ကျောင်းသားလူငယ်များ(ပြည်ထောင်စုမြန်မာနိုင်ငံ)ပါတီ",
              "party_name_english": "The 88 Generation Student Youths  (Union of Myanmar)",
              "abbreviation": "",
              "establishment_date": 1269216000000,
              "member_count": "၂၇ ဦး",
              "leadership": [
                "ဦးရဲထွန်း",
                "ဦးသန်းဦး"
              ],
              "establishment_approval_date": 1271894400000,
              "registration_application_date": 1272499200000,
              "registration_approval_date": 1274832000000,
              "approved_party_number": "အမှတ်စဉ်( ၁၇ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/16-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/16-logo.png",
              "chairman": [
                "ဦးရဲထွန်း",
                "ဦးလေးစိုး(ထွေ/မှူး)"
              ],
              "region": "ပြည်ထောင်စုတစ်ဝန်းလုံး",
              "headquarters": "တိုက်(အက်ဖ်)၊ အခန်း(၃၀၁)၊ ပုလဲကွန်ဒိုမီနီယံ ကမ္ဘာအေးဘုရားလမ်း၊ ဗဟန်းမြို့နယ်၊ ရန်ကုန်တိုင်းဒေသကြီး။  ",
              "contact": [
                "၀၁-၅၅၆၅၅၄",
                "၀၉-၅၁၉၇၆၂၆"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/16The%2088%20Generation%20Student%20Youths%20Union%20of%20Myanmar.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757826,
              "updated_at": 1442212757826
            },
            {
              "id": 17,
              "party_name": "ပြည်ထောင်စုမြန်မာနိုင်ငံအမျိုးသားနိုင်ငံရေးအဖွဲ့ချုပ်ပါတီ",
              "party_name_english": "The Union of Myanmar Federation of National Politics",
              "abbreviation": "",
              "establishment_date": 1269216000000,
              "member_count": "၂၈ ဦး",
              "leadership": [
                "ဦးအေးလွင်",
                "ဦးခင်မောင်ဦး"
              ],
              "establishment_approval_date": 1271894400000,
              "registration_application_date": 1272499200000,
              "registration_approval_date": 1274832000000,
              "approved_party_number": "အမှတ်စဉ်( ၁၈ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/17-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/17-logo.png",
              "chairman": [
                "ဦးအေးလွင်",
                "ဦးဌေးငွေ(တွဲ-ထွေ/မှူး)"
              ],
              "region": "ပြည်ထောင်စုတစ်ဝန်းလုံး",
              "headquarters": "တိုက်(အက်ဖ်)၊ အခန်း(၃၀၁)၊ ပုလဲကွန်ဒိုမီနီယံ ကမ္ဘာအေးဘုရားလမ်း၊ ဗဟန်းမြို့နယ်၊ ရန်ကုန်တိုင်းဒေသကြီး။",
              "contact": [
                "၀၁-၅၅၆၅၅၄",
                "၀၉-၅၁၈၇၉၉၁"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/17The%20Union%20of%20Myanmar%20Federation%20of%20National%20Politics.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757827,
              "updated_at": 1442212757827
            },
            {
              "id": 18,
              "party_name": "အမျိုးသားနိုင်ငံရေးမဟာမိတ်များအဖွဲ့ချုပ်ပါတီ",
              "party_name_english": "National Political Alliance League",
              "abbreviation": "",
              "establishment_date": 1270080000000,
              "member_count": "၁၅ ဦး",
              "leadership": [
                "ဦးတင်ထွန်းမောင်",
                "ဦးကြည်ဝင်း"
              ],
              "establishment_approval_date": 1272499200000,
              "registration_application_date": 1274227200000,
              "registration_approval_date": 1274918400000,
              "approved_party_number": "အမှတ်စဉ်( ၁၉ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/18-flag.png",
              "party_seal": "0",
              "chairman": [
                "ဦးတင်ထွန်းမောင်",
                "ဦးလှအောင်  (တွင်း/မှူး-၁)"
              ],
              "region": "ပြည်ထောင်စုတစ်ဝန်းလုံး",
              "headquarters": "အမှတ် (၁၀၁၀)(ခ) ၊ ပညာလမ်း ၊ (၄) ရပ်ကွက် ၊  တောင်ဥက္ကလာပ မြို့နယ် ၊ ရန်ကုန်တိုင်းဒေသကြီး",
              "contact": [
                "၀၉-  ၇၃၀၉၄၂၁၃(ဦးတင်ထွန်းမောင်)",
                "၀၉- ၂၂၀၁၁၄၁(ဦးဝင်းဇော်)",
                "၀၉-၄၉၂၅၆၄၂၈ (ဦးတင်ဝင်း)"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/18National%20Political%20Alliance%20League.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757827,
              "updated_at": 1442212757827
            },
            {
              "id": 19,
              "party_name": "ချင်းအမျိုးသားဒီမိုကရက်တစ်ပါတီ",
              "party_name_english": "Chin National Democratic Party",
              "abbreviation": "",
              "establishment_date": 1270598400000,
              "member_count": "၁၆ ဦး",
              "leadership": [
                "ဦးဇမ်ကျင်ပေါ်(ခ)ဦးဇိုဇမ်း",
                "ဦးချန်ဟဲ"
              ],
              "establishment_approval_date": 1272844800000,
              "registration_application_date": 1274227200000,
              "registration_approval_date": 1274918400000,
              "approved_party_number": "အမှတ်စဉ်( ၂၁ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/19-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/19-logo.png",
              "chairman": [
                "ဦးဇမ်ကျင်ပေါ်(ခ)ဦးဇိုဇမ်း",
                "ဆလိုင်းထီယံအုပ်ထန်(တွင်း/မှူး-၁)"
              ],
              "region": "ပြည်ထောင်စုတစ်ဝန်းလုံး",
              "headquarters": "အမှတ်(၁၂၀)၊ အခန်း(၅၂)၊ သုခလှိုင်တိုက် ၊ အင်းစိန်လမ်းမကြီး၊ လှိုင်မြို့နယ်၊ ရန်ကုန်တိုင်းဒေသကြီး။",
              "contact": [
                "၀၉-၅၀၃၀၈၇၀( ဦးဇိုဇမ်း)",
                "၀၁-၆၄၆၃၉၇",
                "၀၉-၄၃၀၉၄၀၈၇",
                "၀၉-၄၃၁၆၃၅၃၉"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/19Chin%20National%20Party.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757828,
              "updated_at": 1442212757828
            },
            {
              "id": 20,
              "party_name": "ဝံသာနုဒီမိုကရက်တစ်ပါတီ",
              "party_name_english": "Wun Thar Nu Democratic Party",
              "abbreviation": "",
              "establishment_date": 1270771200000,
              "member_count": "၂၁ ဦး",
              "leadership": [
                "ဦးထွန်းရင်(ကွယ်လွန်)",
                "ဒေါ်နန်းရွှေကြာ"
              ],
              "establishment_approval_date": 1271980800000,
              "registration_application_date": 1274227200000,
              "registration_approval_date": 1274918400000,
              "approved_party_number": "အမှတ်စဉ်( ၂၂ )",
              "party_flag": "https://storage.googleapis.com/staticassets/flags-and-logos/20-flag.png",
              "party_seal": "https://storage.googleapis.com/staticassets/flags-and-logos/20-logo.png",
              "chairman": [
                "ဦးရဲမင်း",
                "ဒေါ်နန်းရွှေကြာ (ထွေ/မှူး)"
              ],
              "region": "ပြည်ထောင်စုတစ်ဝန်းလုံး",
              "headquarters": "နန်းဦးလွင်ကျေးရွာအုပ်စု၊ ပုသိမ်ကြီးမြို့နယ်၊ မန္တလေးတိုင်းဒေသကြီး။",
              "contact": [
                "၀၉-၆၈၀၆၅၇၂"
              ],
              "policy": "http://uecmyanmar.org/images/stories/policals_policies/20Wun%20Tha%20Nu%20Democratic%20Party.pdf",
              "ST_PCODE": "",
              "DT_PCODE": "",
              "created_at": 1442212757829,
              "updated_at": 1442212757829
            }
        ];

        svg.selectAll('defs')
          .data(parties)
          .enter()
          .append("defs")
          .append('pattern')
           .attr('id', function(d, i){
            return "bg" + i;
           })
           .attr('patternUnits', 'userSpaceOnUse')
           .attr('width', radius)
           .attr('height', radius)
          .append("image")
           .attr("xlink:href", function(d, i){
            return d.party_seal;
           })
           .attr("x", 0)
           .attr("y", 0)
           .attr('width', 2 * radius)
           .attr('height', 2 * radius);

        topology.objects.hexagons.geometries = topology.objects.hexagons.geometries.map(function(item, index){
          item["properties"] = {};
          item.text = parties[ index % parties.length].party_name; 
          return item;
        });


        svg.append("g")
            .attr("class", "hexagon")
          .selectAll("path")
            .data(topology.objects.hexagons.geometries)
          .enter().append("path")
            .attr("d", function(d) { return path(topojson.feature(topology, d)); })
            .attr("class", function(d) { return d.fill ? "fill" : null; })
            .on("mousedown", mousedown)
            .on("mousemove", mousemove)
            .on("mouseup", mouseup)
            svg.append("text")
                  .attr("dy", "0.1em")
                  .attr("x", function(){
                    getCentroid(d3.select(this))[0];
                  })
                  .attr("y", function(){
                    getCentroid(d3.select(this))[1];
                  })
                  .style("text-anchor", "middle")
                  .attr("class", "inner-circle")
                  .attr("fill", "#36454f")
                  .style("font-size", ".7em")
                  .text(function(d){
                    return d.party_name;
                  });
        svg.append("path")
            .datum(topojson.mesh(topology, topology.objects.hexagons))
            .attr("class", "mesh")
            .attr("d", path);
        var border = svg.append("path")
            .attr("class", "border")
            .call(redraw);
        var mousing = 0;
        function mousedown(d) {
          mousing = d.fill ? -1 : +1;
          mousemove.apply(this, arguments);
        };

        var color = d3.scale.category20().range();

        function mousemove(d, i) {
          if (mousing) {
            console.log(d3.select(this), i);
            var coordinates = getCentroid(d3.select(this));
            d3.select(this).classed("fill", d.fill = mousing > 0)
              .style("fill", "green")
            svg.append("text")
                  .attr("dy", "0.1em")
                  .attr("x", coordinates[0])
                  .attr("y", coordinates[1])
                  .style("text-anchor", "middle")
                  .attr("class", "inner-circle")
                  .attr("fill", "#36454f")
                  .style("font-size", ".5em")
                  .text(d.text);
            border.call(redraw);
          }
        };

        function getCentroid(selection) {
            // get the DOM element from a D3 selection
            // you could also use "this" inside .each()
            var element = selection.node(),
                // use the native SVG interface to get the bounding box
                bbox = element.getBBox();
            // return the center of the bounding box
            return [bbox.x + bbox.width/2, bbox.y + bbox.height/2];
        };

        function mouseup() {
          mousemove.apply(this, arguments);
          mousing = 0;
        };

        function redraw(border) {
          border.attr("d", path(topojson.mesh(topology, topology.objects.hexagons, function(a, b) { return a.fill ^ b.fill; })));
        };

        function hexTopology(radius, width, height) {
          var dx = radius * 2 * Math.sin(Math.PI / 3),
              dy = radius * 1.5,
              m = Math.ceil((height + radius) / dy) + 1,
              n = Math.ceil(width / dx) + 1,
              geometries = [],
              arcs = [];
          for (var j = -1; j <= m; ++j) {
            for (var i = -1; i <= n; ++i) {
              var y = j * 2, x = (i + (j & 1) / 2) * 2;
              arcs.push([[x, y - 1], [1, 1]], [[x + 1, y], [0, 1]], [[x + 1, y + 1], [-1, 1]]);
            }
          }
          for (var j = 0, q = 3; j < m; ++j, q += 6) {
            for (var i = 0; i < n; ++i, q += 3) {
              geometries.push({
                type: "Polygon",
                arcs: [[q, q + 1, q + 2, ~(q + (n + 2 - (j & 1)) * 3), ~(q - 2), ~(q - (n + 2 + (j & 1)) * 3 + 2)]],
                fill: Math.random() > i / n * 2
              });
            }
          }
          return {
            transform: {translate: [0, 0], scale: [1, 1]},
            objects: {hexagons: {type: "GeometryCollection", geometries: geometries}},
            arcs: arcs
          };
        };

        function hexProjection(radius) {
          var dx = radius * 2 * Math.sin(Math.PI / 3),
              dy = radius * 1.5;
          return {
            stream: function(stream) {
              return {
                point: function(x, y) { stream.point(x * dx / 2, (y - (2 - (y & 1)) / 3) * dy / 2); },
                lineStart: function() { stream.lineStart(); },
                lineEnd: function() { stream.lineEnd(); },
                polygonStart: function() { stream.polygonStart(); },
                polygonEnd: function() { stream.polygonEnd(); }
              };
            }
          };
        };
      }
    };
  });
