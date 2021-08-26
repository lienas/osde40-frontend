// TODO: Generalize. How is a schema used? What is common? What ARE callbacks?

const guillotineLib = require('/lib/guillotine');
const genericLib = require('/lib/guillotine/generic');
const dynamicLib = require('/lib/guillotine/dynamic');
const rootQueryLib = require('/lib/guillotine/query/root-query');
const rootSubscriptionLib = require('/lib/guillotine/subscription/root-subscription');

const sectionPageDataCallback = require('./schema-creation-callbacks/section-page-data');
const { menuListDataCallback } = require('./schema-creation-callbacks/menu-list-data');
const contentListCallback = require('./schema-creation-callbacks/content-list-callback');
const { filterCallback } = require('./schema-creation-callbacks/filters-menu');
const { contentListDataCallback } = require('./schema-creation-callbacks/content-list-data');
const { htmlAreaPartConfigCallback } = require('./schema-creation-callbacks/html-area-part-config');
const { pageNavigationMenuCallback } = require('./schema-creation-callbacks/page-navigation-menu');
const {
    mainArticleDataCallback,
    mainArticleCallback,
} = require('./schema-creation-callbacks/main-article');
const {
    mainArticleChapterCallback,
    mainArticleChapterDataCallback,
} = require('./schema-creation-callbacks/main-article-chapter');

const schemaContextOptions = {
    creationCallbacks: {
        no_nav_navno_MainArticle: mainArticleCallback,
        no_nav_navno_MainArticle_Data: mainArticleDataCallback,
        no_nav_navno_MainArticleChapter_Data: mainArticleChapterDataCallback,
        no_nav_navno_MainArticleChapter: mainArticleChapterCallback,
        no_nav_navno_SectionPage_Data: sectionPageDataCallback,
        no_nav_navno_ContentList_Data: contentListDataCallback,
        no_nav_navno_MainArticle_InnholdIHoyremenyen: menuListDataCallback,
        no_nav_navno_PageList_InnholdIHoyremenyen: menuListDataCallback,
        Part_no_nav_navno_dynamic_news_list_InnholdslisteForNyheter: contentListCallback(
            'publish.first'
        ),
        Part_no_nav_navno_dynamic_link_list_HentLenkerFraInnholdsliste: contentListCallback(),
        Part_no_nav_navno_page_navigation_menu: pageNavigationMenuCallback,
        Page_no_nav_navno_page_with_side_menus: pageNavigationMenuCallback,
        Part_no_nav_navno_html_area: htmlAreaPartConfigCallback,
        Part_no_nav_navno_filters_menu_Filter: filterCallback,
    },
    applications: [app.name, 'navno.nav.no.search', 'com.enonic.app.rss'],
};

const initAndCreateSchema = () => {
    const context = guillotineLib.createContext(schemaContextOptions);
    genericLib.createTypes(context);
    dynamicLib.createTypes(context);
    return context.schemaGenerator.createSchema({
        query: rootQueryLib.createRootQueryType(context),
        subscription: rootSubscriptionLib.createRootSubscriptionType(context),
        dictionary: context.dictionary,
    });
};

const schema = initAndCreateSchema();

module.exports = schema;