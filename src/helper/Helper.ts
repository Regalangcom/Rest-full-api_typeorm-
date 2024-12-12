import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { LRUCache } from "lru-cache";

import { payload } from "../dto/user.dto"

const { JWT_SECRET = "" } = process.env;

export class encrypt {
    static async encryptPassword(password : string) {
        return bcrypt.hashSync(password , 10);
    }
    static comparePassword(hashPassword : string , password : string) {
        return bcrypt.compare(hashPassword , password);
    }
    static generatorToken(payload : payload) {
        return jwt.sign(payload , JWT_SECRET , { expiresIn : "1d" }) 
    }
} 

const option = {
    max: 500,
    // for use with tracking overall storage size
    maxSize: 5000,
    sizeCalculation: (value: any, key: any) => {
      if (Array.isArray(value)) {
        value = JSON.stringify(value)
      }
      return key.length + Buffer.byteLength(value, "utf-8")
    },  
    // how long to live in ms
    ttl: 1000 * 60 * 5,
    // return stale items before removing from cache?
    allowStale: false,
    updateAgeOnGet: false,
    updateAgeOnHas: false,  
}
export const Cache = new LRUCache(option);

