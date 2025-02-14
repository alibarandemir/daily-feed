export class GetNewsDto{
    id: string;
    title:string;
    link:string;
    description:string;
    image:string;
    upvote:number;
    downvote:number;
    sourceName:string;
    categoryName:string
    summary:string
    actions?:string[]
    createdDate?:string


    constructor(id: string, title: string, link: string, description: string, image: string, upvote: number, downvote: number, sourceName: string, categoryName: string, summary: string, actions: string[], createdAt: string){
        this.id = id;
        this.title=title
        this.link=link
        this.description=description
        this.image=image
        this.upvote=upvote
        this.downvote=downvote
        this.sourceName=sourceName
        this.categoryName=categoryName
        this.summary=summary
        this.actions=actions
        this.createdDate=createdAt
    }
   
}