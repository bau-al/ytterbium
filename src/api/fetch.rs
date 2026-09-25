mod fetch;

// API
// https://en.wikipedia.org/w/index.php?api=mw-extra&title=Special%3ARestSandbox#/default/getListPagesBySearchQuery

// result when given multiple options
#[derive(Debug, Serialize, Deserialize)]
pub struct SearchArticle {
    id: u8,
    key: String,
    title: String,
    excerpt: String,
}

impl SearchArticle {
    pub fn init(id: u8, key: String, title: String, source: String) -> Self {
        Self {
            id: id,
            key: key,
            title: title,
            source: source
        }
    }

    pub fn get_data(&self, url: String) -> SearchArticle {
        let articles: Vec<SearchArticle> = reqwest::Client::new()
            .get(url)
            .send()
            .json()
        // fetch using reqwest + serde, get data
        todo!();
    }
}
