export interface NewsResponse {
    status:       string;
    totalResults: number;
    articles:     Article[];
}

export interface Article {
    source:       Source;
    author?:      string;
    title:        string;
    description?: string;
    url:          string;
    urlToImage?:  string;
    publishedAt:  Date;
    content?:     string;
}

export interface Source {
    id?:   ID;
    name:  Name;
}

export enum ID {
    Techcrunch = "techcrunch",
}

export enum Name {
    TechCrunch = "TechCrunch",
}

export interface ArticlesByCategoryAndPage {
[key: string] : {
    page: number,
    articles: Article[]
}
}