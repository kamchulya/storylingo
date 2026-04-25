"""
Storylingo Bot — финальная версия
Kaspi оплата + контроль подписки + авторемиандеры

Установка:
  pip install python-telegram-bot==20.7 apscheduler

Запуск:
  python bot_final.py
"""

import logging
import json
import os
from datetime import datetime, timedelta
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import (
    Application, CommandHandler, CallbackQueryHandler,
    MessageHandler, ContextTypes, filters
)
from apscheduler.schedulers.asyncio import AsyncIOScheduler

# ══════════════════════════════
# КОНФИГ — вставь свои данные
# ══════════════════════════════
BOT_TOKEN    = "7957835045:AAERk9_ZVOAvIU9LT6CmQh-0YFkipXkUOH8"
WEBAPP_URL   = "https://storylingo-gamma.vercel.app"
KASPI_PHONE  = "87059700241"
KASPI_NAME   = "Шайханым А."
ADMIN_ID     = 0          # ← ЗАМЕНИ на свой Telegram ID (узнай у @userinfobot)
PRICE        = 1500       # ₸ в месяц
FREE_EP      = 5          # бесплатных эпизодов
TOTAL_EP     = 10         # всего эпизодов

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s"
)
log = logging.getLogger(__name__)

# ══════════════════════════════
# БАЗА ДАННЫХ (файл users.json)
# ══════════════════════════════
DB_FILE = "users.json"

def load_db() -> dict:
    if os.path.exists(DB_FILE):
        with open(DB_FILE) as f:
            return json.load(f)
    return {}

def save_db(db: dict):
    with open(DB_FILE, "w") as f:
        json.dump(db, f, ensure_ascii=False, indent=2)

def get_user(uid: int) -> dict:
    db = load_db()
    key = str(uid)
    if key not in db:
        db[key] = {
            "episodes_played": 0,
            "subscribed": False,
            "sub_date": None,
            "sub_expires": None,
            "reminded": False,
            "username": "",
            "name": ""
        }
        save_db(db)
    return db[key]

def save_user(uid: int, data: dict):
    db = load_db()
    db[str(uid)] = data
    save_db(db)

def is_subscribed(uid: int) -> bool:
    u = get_user(uid)
    if not u["subscribed"]:
        return False
    # Проверяем срок
    if u["sub_expires"]:
        expires = datetime.fromisoformat(u["sub_expires"])
        if datetime.now() > expires:
            # Подписка истекла
            u["subscribed"] = False
            save_user(uid, u)
            return False
    return True

def can_play(uid: int) -> bool:
    return is_subscribed(uid) or get_user(uid)["episodes_played"] < FREE_EP

def episodes_left(uid: int) -> int:
    if is_subscribed(uid):
        return TOTAL_EP
    return max(0, FREE_EP - get_user(uid)["episodes_played"])


# ══════════════════════════════
# КЛАВИАТУРЫ
# ══════════════════════════════
def main_keyboard(uid: int):
    sub = is_subscribed(uid)
    ep_left = episodes_left(uid)
    return InlineKeyboardMarkup([
        [InlineKeyboardButton(
            "🎮 Играть" + (f" ({ep_left} эп.)" if not sub else " — всё открыто!"),
            web_app=WebAppInfo(url=f"{WEBAPP_URL}?uid={uid}&sub={'1' if sub else '0'}")
        )],
        [InlineKeyboardButton("💳 Подписка 1500₸/мес", callback_data="pay_info")],
        [InlineKeyboardButton("📊 Мой прогресс", callback_data="my_status")],
    ])

def pay_keyboard(uid: int):
    return InlineKeyboardMarkup([
        [InlineKeyboardButton("✅ Я оплатил(а)", callback_data=f"paid_{uid}")],
        [InlineKeyboardButton("◀️ Назад", callback_data="back")],
    ])


# ══════════════════════════════
# КОМАНДЫ
# ══════════════════════════════
async def cmd_start(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    uid = update.effective_user.id
    name = update.effective_user.first_name or "друг"

    # Сохраняем пользователя
    u = get_user(uid)
    u["username"] = update.effective_user.username or ""
    u["name"] = name
    save_user(uid, u)

    sub = is_subscribed(uid)
    ep_left = episodes_left(uid)

    if sub:
        status = "✅ Подписка активна до " + datetime.fromisoformat(u["sub_expires"]).strftime("%d.%m.%Y")
    else:
        status = f"🆓 Бесплатных эпизодов: {ep_left} из {FREE_EP}"

    text = (
        f"Привет, {name}! 👋\n\n"
        f"*Storylingo* — учи английский через историю жизни в Нью-Йорке 🗽\n\n"
        f"🎮 Интерактивные диалоги\n"
        f"🎤 Питч-тренер для акцента\n"
        f"💑 Романтическая история\n\n"
        f"{status}"
    )

    await update.message.reply_text(
        text,
        reply_markup=main_keyboard(uid),
        parse_mode="Markdown"
    )


async def cmd_status(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    uid = update.effective_user.id
    u = get_user(uid)
    sub = is_subscribed(uid)

    if sub:
        expires = datetime.fromisoformat(u["sub_expires"]).strftime("%d.%m.%Y")
        text = (
            f"✅ *Подписка активна*\n\n"
            f"До: {expires}\n"
            f"Эпизодов открыто: все {TOTAL_EP}\n\n"
            f"Продли заранее чтобы не прерываться!"
        )
    else:
        left = episodes_left(uid)
        text = (
            f"🆓 *Бесплатный доступ*\n\n"
            f"Осталось эпизодов: {left} из {FREE_EP}\n\n"
            f"Оформи подписку чтобы открыть все {TOTAL_EP} эпизодов сезона 1!"
        )

    await update.message.reply_text(
        text,
        reply_markup=main_keyboard(uid),
        parse_mode="Markdown"
    )


# ══════════════════════════════
# CALLBACKS
# ══════════════════════════════
async def callback_handler(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    q = update.callback_query
    await q.answer()
    uid = q.from_user.id
    data = q.data

    # ── Показать инструкцию по оплате
    if data == "pay_info":
        text = (
            "💳 *Оплата подписки Storylingo*\n\n"
            f"Сумма: *{PRICE} ₸ / месяц*\n\n"
            f"Переведи на Kaspi:\n"
            f"📱 Номер: `{KASPI_PHONE}`\n"
            f"👤 Получатель: {KASPI_NAME}\n\n"
            f"‼️ *В комментарии к переводу напиши:*\n"
            f"`storylingo {uid}`\n\n"
            f"После оплаты нажми кнопку «Я оплатил» ⬇️"
        )
        await q.message.reply_text(
            text,
            reply_markup=pay_keyboard(uid),
            parse_mode="Markdown"
        )

    # ── Пользователь нажал "Я оплатил"
    elif data.startswith("paid_"):
        target_uid = int(data.split("_")[1])
        name = q.from_user.first_name or "пользователь"
        username = q.from_user.username or "нет"

        # Уведомляем тебя (админа)
        if ADMIN_ID:
            admin_kb = InlineKeyboardMarkup([[
                InlineKeyboardButton(f"✅ Активировать", callback_data=f"activate_{target_uid}"),
                InlineKeyboardButton(f"❌ Отклонить", callback_data=f"reject_{target_uid}")
            ]])
            await ctx.bot.send_message(
                ADMIN_ID,
                f"💰 *Новая оплата Kaspi!*\n\n"
                f"👤 {name} (@{username})\n"
                f"🆔 ID: `{target_uid}`\n"
                f"💵 Сумма: {PRICE}₸\n\n"
                f"Проверь перевод в Kaspi и активируй:",
                reply_markup=admin_kb,
                parse_mode="Markdown"
            )

        await q.message.reply_text(
            "⏳ Заявка отправлена!\n\n"
            "Проверяем оплату и активируем подписку в течение нескольких минут.\n\n"
            "Ты получишь уведомление как только всё будет готово 🎉"
        )

    # ── Админ активирует подписку
    elif data.startswith("activate_"):
        if uid != ADMIN_ID:
            await q.answer("Нет доступа", show_alert=True)
            return

        target_uid = int(data.split("_")[1])
        u = get_user(target_uid)
        now = datetime.now()
        expires = now + timedelta(days=30)

        u["subscribed"] = True
        u["sub_date"] = now.isoformat()
        u["sub_expires"] = expires.isoformat()
        u["reminded"] = False
        save_user(target_uid, u)

        log.info(f"Subscribed: {target_uid} until {expires}")

        # Уведомляем пользователя
        kb = InlineKeyboardMarkup([[
            InlineKeyboardButton(
                "🎮 Играть — все эпизоды открыты!",
                web_app=WebAppInfo(url=f"{WEBAPP_URL}?uid={target_uid}&sub=1")
            )
        ]])
        await ctx.bot.send_message(
            target_uid,
            f"🎉 *Подписка активирована!*\n\n"
            f"Оплата подтверждена. Все {TOTAL_EP} эпизодов открыты!\n"
            f"Действует до: {expires.strftime('%d.%m.%Y')}\n\n"
            f"Продолжай историю Майи в Нью-Йорке 🗽",
            reply_markup=kb,
            parse_mode="Markdown"
        )

        await q.edit_message_text(
            q.message.text + f"\n\n✅ Активировано до {expires.strftime('%d.%m.%Y')}"
        )

    # ── Админ отклоняет
    elif data.startswith("reject_"):
        if uid != ADMIN_ID:
            await q.answer("Нет доступа", show_alert=True)
            return

        target_uid = int(data.split("_")[1])
        await ctx.bot.send_message(
            target_uid,
            f"❌ Оплата не найдена.\n\n"
            f"Проверь что перевёл *{PRICE}₸* на номер `{KASPI_PHONE}` "
            f"и в комментарии написал `storylingo {target_uid}`\n\n"
            f"Попробуй снова или напиши нам.",
            parse_mode="Markdown"
        )
        await q.edit_message_text(q.message.text + f"\n\n❌ Отклонено")

    # ── Статус пользователя
    elif data == "my_status":
        await cmd_status(update, ctx)

    # ── Назад
    elif data == "back":
        await cmd_start(update, ctx)


# ══════════════════════════════
# АВТОМАТИЧЕСКИЕ НАПОМИНАНИЯ
# ══════════════════════════════
async def check_expiring(app):
    """Каждый день проверяет кто истекает через 3 дня"""
    db = load_db()
    now = datetime.now()
    soon = now + timedelta(days=3)

    for uid_str, u in db.items():
        uid = int(uid_str)
        if not u.get("subscribed") or not u.get("sub_expires"):
            continue

        expires = datetime.fromisoformat(u["sub_expires"])

        # Напоминание за 3 дня
        if now < expires <= soon and not u.get("reminded"):
            days_left = (expires - now).days
            kb = InlineKeyboardMarkup([[
                InlineKeyboardButton("💳 Продлить подписку", callback_data="pay_info")
            ]])
            try:
                await app.bot.send_message(
                    uid,
                    f"⏰ *Подписка заканчивается через {days_left} дня!*\n\n"
                    f"Чтобы не прерываться на истории — продли сейчас.\n"
                    f"Всего {PRICE}₸/месяц 👇",
                    reply_markup=kb,
                    parse_mode="Markdown"
                )
                u["reminded"] = True
                save_user(uid, u)
                log.info(f"Reminded: {uid}")
            except Exception as e:
                log.error(f"Reminder failed for {uid}: {e}")


async def daily_admin_report(app):
    """Каждое утро отправляет тебе сводку"""
    if not ADMIN_ID:
        return

    db = load_db()
    now = datetime.now()

    total = len(db)
    active = sum(1 for u in db.values() if u.get("subscribed") and
                 u.get("sub_expires") and datetime.fromisoformat(u["sub_expires"]) > now)
    expiring = sum(1 for u in db.values() if u.get("subscribed") and
                   u.get("sub_expires") and
                   now < datetime.fromisoformat(u["sub_expires"]) <= now + timedelta(days=3))
    revenue = active * PRICE

    try:
        await app.bot.send_message(
            ADMIN_ID,
            f"📊 *Storylingo — утренняя сводка*\n\n"
            f"👥 Всего пользователей: {total}\n"
            f"✅ Активных подписок: {active}\n"
            f"⚠️ Истекают через 3 дня: {expiring}\n\n"
            f"💰 Активный MRR: {revenue:,}₸/мес",
            parse_mode="Markdown"
        )
    except Exception as e:
        log.error(f"Admin report failed: {e}")


# ══════════════════════════════
# ЗАПУСК
# ══════════════════════════════
def main():
    if ADMIN_ID == 0:
        print("⚠️  ВАЖНО: вставь свой Telegram ID в ADMIN_ID!")
        print("   Узнать ID: напиши @userinfobot в Telegram\n")

    app = Application.builder().token(BOT_TOKEN).build()

    # Handlers
    app.add_handler(CommandHandler("start", cmd_start))
    app.add_handler(CommandHandler("status", cmd_status))
    app.add_handler(CommandHandler("subscribe", lambda u, c: callback_handler(u, c)))
    app.add_handler(CallbackQueryHandler(callback_handler))

    # Scheduler — напоминания и отчёты
    scheduler = AsyncIOScheduler()
    scheduler.add_job(
        check_expiring, "interval", hours=12,
        args=[app], id="check_expiring"
    )
    scheduler.add_job(
        daily_admin_report, "cron", hour=9, minute=0,
        args=[app], id="daily_report"
    )
    scheduler.start()

    print("🤖 Storylingo Bot запущен!")
    print(f"   Kaspi: {KASPI_PHONE} ({KASPI_NAME})")
    print(f"   WebApp: {WEBAPP_URL}")
    print(f"   Цена: {PRICE}₸/мес · Free: {FREE_EP} эп.")
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
