import { Moment } from "moment";

export type Period = 'today' | 'this week' | 'this month' // remember to export, to make available in other files.
  
export interface Post {
    id: number
    title: string
    markdown: string
    html: string
    authorId: number
    created: Moment
}