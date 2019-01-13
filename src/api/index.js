import Router from 'koa-router';
import 'sistemium-telegram/config/aws';
import log from 'sistemium-telegram/services/log';
import { findAll, find, findAny } from '../data/mongo';

const { debug, error } = log('question:api');
const router = new Router();

export default router;

router.get('/question', question, allQuestions);
router.get('/question/:id', question, oneQuestion);

async function question(ctx, next) {

  const { id } = ctx.params;

  try {

    if (id !== 'random') {

      await next();

      return;

    }

    const res = await findAny('Question');

    debug(res);

    ctx.body = res;

  } catch ({ message }) {
    error(message);
  }

}

async function allQuestions(ctx) {

  const res = await findAll('Question');

  debug(res);

  ctx.body = res;

}

async function oneQuestion(ctx) {

  const { id } = ctx.params;

  const res = await find('Question', id);

  debug(res);

  ctx.body = res;

}
