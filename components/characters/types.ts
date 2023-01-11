import { Companion } from '../data'
import { Ranger } from '../types'

export type Character = Ranger & {
    name: string
    createdBy: string
    imgUrl: string
    unspentXp: number
    currentLevel: number
    party: Companion[]
}