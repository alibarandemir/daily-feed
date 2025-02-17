import redis, { createClient, RedisClientType } from 'redis';
import hash from 'object-hash';
import { Request } from 'express'; 

let redisClient: RedisClientType | undefined = undefined;

export  let redisConnected = false;



export function isRedisConnected(): boolean {
  return redisConnected;
}

export function setRedisConnected(status: boolean) {
  redisConnected = status;
}



async function initializeRedisClient(): Promise<void> {
  const redisURL = process.env.REDIS_URI;
  if (redisURL) {
    redisClient = createClient();
    redisClient.on("error", (e: Error) => {
      console.error(`Failed to create the Redis client with error:`);
      console.error(e);
      setRedisConnected(false);
    });
  }

  try {
    if (redisClient) {
      await redisClient.connect();
      console.log(`Connected to Redis successfully!`);
      setRedisConnected(true);
    }
  } catch (e) {
    console.error(`Connection to Redis failed with error:`);
    console.error(e);
    setRedisConnected(false);
  }
}



function requestToKey(req: Request): string {
  const reqDataToHash = {
    query: req.query,
    body: req.body,
  };
  return `${req.path}@${hash.sha1(reqDataToHash)}`;
}

function isRedisWorking(): boolean {
  return !!redisClient?.isOpen;
}

async function writeData(key: string, data: string, options?: { EX?: number }): Promise<void> {
  if (isRedisWorking()) {
    try {
      await redisClient?.set(key, data, options);
    } catch (e) {
      console.error(`Failed to cache data for key=${key}`, e);
    }
  }
}

async function readData(key: string): Promise<string | null> {
  if (isRedisWorking()) {
    try {
      return await redisClient?.get(key) ?? null;
    } catch (e) {
      console.error(`Failed to read data for key=${key}`, e);
    }
  }
  return null;
}
async function incrementClickCounter(key:string){
  try{
    console.log("fonksiyonun ici")
      if(isRedisWorking()){
          const newValue= await redisClient?.INCR(key)
          console.log(newValue)
          return newValue ??null
      }
      console.log("redis çalışmıyorken")
      return null
  }
  catch(e:any){
    console.error(e.message)
  }
}
async function getClickCountValue(key:string):Promise<number|null>{
  if(isRedisWorking()){
    try{
      const value= await redisClient?.get(key)
      return value ? parseInt(value,10):null
    }
    catch(e){

    }
  }
  return null
}


export  { readData, writeData, isRedisWorking, requestToKey, initializeRedisClient ,incrementClickCounter,getClickCountValue};
