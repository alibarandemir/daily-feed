import { Request, Response, NextFunction } from 'express';
import { requestToKey, readData, isRedisWorking, writeData } from '../cache/redis';

interface CacheOptions {
  EX: number; // Expiration time in seconds
}

export function redisCachingMiddleware(
  options: CacheOptions = { EX: 21600 } // Varsayılan olarak 6 saat
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (isRedisWorking()) {
      const key = requestToKey(req);

      // Eğer cache'de veri varsa, onu döndür
      const cachedValue = await readData(key);
      if (cachedValue) {
        try {
          // JSON verisi ise, JSON olarak döndür
          return res.json(JSON.parse(cachedValue));
        } catch {
          // JSON değilse, düz metin olarak döndür
          return res.send(cachedValue);
        }
      } else {
        // `res.send` davranışını geçersiz kılarak cacheleme işlemi ekle
        const oldSend = res.send.bind(res);

        res.send = (data: any) => {
          // Fonksiyonu eski haline getir, böylece çift gönderim oluşmaz
          res.send = oldSend;

          // Yanıt başarılıysa cache'e yaz
          if (res.statusCode.toString().startsWith("2")) {
            writeData(key, data, options).then();
          }

          return res.send(data);
        };

        
        next();
      }
    } else {
      
      next();
    }
  };
}
