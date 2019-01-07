import Router from 'koa-router';
import log from 'sistemium-telegram/services/log';
import { findAll } from 'sistemium-telegram/services/redisDB';

export const FRAMES_KEY = 'frames';

const { debug, error } = log('rest:api');
const router = new Router();

export default router;

router.get('/frames', async ctx => {

  const { params: { itemCode }, header: { authorization } } = ctx;

  debug('GET /frames', itemCode, authorization);

  try {

    ctx.body = await findAll(FRAMES_KEY);

  } catch (err) {

    ctx.response.status = 500;

    error(err.stack);

  }

});
