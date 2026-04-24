// STORYLINGO — Season 1, Episodes 1-10
// Each episode: 5-6 steps (narration + choices + voice)
// Scenes: bedroom, kitchen, cafe, street, office, park, restaurant

const EPISODES_DATA = [

  // ══════════════════════════════════════════
  // EPISODE 1 — Monday Morning
  // ══════════════════════════════════════════
  {
    id: 1,
    title: 'Monday Morning',
    titleRu: 'Понедельник утром',
    scene_intro: 'bedroom',
    steps: [
      {
        type: 'narration', scene: 'bedroom', action: 'sleep',
        speaker: 'Narrator',
        en: '{name} is sleeping in her Brooklyn apartment. It\'s Monday morning.',
        ru: '{name} спит в своей квартире в Бруклине. Понедельник утром.'
      },
      {
        type: 'narration', scene: 'bedroom', action: 'wakeup',
        speaker: 'Alarm ⏰',
        en: '"BEEP BEEP!" — 7:30 AM. Time to <w>wake up</w>!',
        ru: '7:30 утра. Время просыпаться!'
      },
      {
        type: 'choice', scene: 'bedroom', action: 'wakeup',
        speaker: 'Your friend texts you',
        en: '"Good morning! How are you <w>doing</w> today?"',
        ru: 'Твоя подруга пишет: "Доброе утро! Как ты сегодня?"',
        options: [
          { text: '"I\'m doing great, thanks! Just woke up."', hint: 'doing great — правильно ✓', correct: true },
          { text: '"I am do very good morning."', hint: 'грамматическая ошибка', correct: false },
          { text: '"Yes I fine very much today."', hint: 'неправильный порядок слов', correct: false }
        ]
      },
      {
        type: 'narration', scene: 'kitchen', action: 'kitchen',
        speaker: 'Narrator',
        en: '{name} <w>gets up</w> and walks to the kitchen. The sun is shining through the window!',
        ru: '{name} встаёт и идёт на кухню. Солнце светит через окно!'
      },
      {
        type: 'voice', scene: 'kitchen', action: 'kitchen',
        speaker: 'Alex (roommate)',
        en: '"Hey! I made <w>avocado toast</w>. Are you <w>hungry</w>?"',
        ru: 'Эй! Я сделал тост с авокадо. Ты голоден(а)?',
        voiceEn: '"Yes, I\'m starving! It smells amazing."',
        voiceRu: 'Да, я ужасно голоден(а)! Пахнет потрясающе.',
        refPitch: [.32,.36,.42,.50,.58,.65,.70,.73,.75,.78,.80,.82,.80,.76,.70,.64,
                   .58,.52,.46,.40,.35,.30,.28,.25,.22,.20,.22,.28,.34,.40,
                   .46,.53,.60,.66,.70,.73,.71,.67,.71,.75,.79,.83,.85,.84,.81,
                   .75,.67,.57,.47,.37,.30,.24,.20]
      },
      {
        type: 'choice', scene: 'kitchen', action: 'kitchen',
        speaker: 'Grammar check',
        en: 'Alex says: "I _____ toast every morning." Which is correct?',
        ru: 'Выбери правильную форму глагола:',
        options: [
          { text: '"make" — Present Simple', hint: 'для регулярных действий ✓', correct: true },
          { text: '"am making" — Present Continuous', hint: 'для действий прямо сейчас', correct: false },
          { text: '"made" — Past Simple', hint: 'для прошлого времени', correct: false }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════
  // EPISODE 2 — The Coffee Shop
  // ══════════════════════════════════════════
  {
    id: 2,
    title: 'The Coffee Shop',
    titleRu: 'Кофейня',
    scene_intro: 'cafe',
    steps: [
      {
        type: 'narration', scene: 'street', action: 'walk',
        speaker: 'Narrator',
        en: '{name} walks down <w>Bedford Avenue</w>. Brooklyn smells like coffee and fresh bread.',
        ru: '{name} идёт по Бедфорд Авеню. В Бруклине пахнет кофе и свежим хлебом.'
      },
      {
        type: 'choice', scene: 'cafe', action: 'cafe',
        speaker: 'Barista',
        en: '"Hi! What can I <w>get</w> for you today?"',
        ru: 'Привет! Что вам взять сегодня?',
        options: [
          { text: '"I\'d like a large latte, please."', hint: 'I\'d like — вежливо ✓', correct: true },
          { text: '"Give me coffee large."', hint: 'нет слова please, странный порядок', correct: false },
          { text: '"I want the latte of large."', hint: 'неправильная структура', correct: false }
        ]
      },
      {
        type: 'narration', scene: 'cafe', action: 'cafe',
        speaker: 'Narrator',
        en: 'The barista smiles. "{name} has been coming here every day <w>for years</w>."',
        ru: 'Бариста улыбается. "{name} ходит сюда каждый день уже несколько лет."'
      },
      {
        type: 'voice', scene: 'cafe', action: 'cafe',
        speaker: 'Barista',
        en: '"Your name for the order?"',
        ru: 'Ваше имя для заказа?',
        voiceEn: '"It\'s Maya. Have a great day!"',
        voiceRu: 'Это Майя. Хорошего дня!',
        refPitch: [.38,.42,.46,.52,.56,.58,.56,.50,.44,.38,.32,.28,.24,.20,
                   .22,.26,.34,.42,.50,.56,.62,.66,.68,.65,.60,.52,.44,.36,.28,.22]
      },
      {
        type: 'choice', scene: 'cafe', action: 'cafe',
        speaker: 'Grammar check',
        en: 'You sit down. A stranger asks: "Is this seat <w>taken</w>?"',
        ru: 'Правильный ответ незнакомцу:',
        options: [
          { text: '"No, please go ahead!"', hint: 'go ahead — пожалуйста, садитесь ✓', correct: true },
          { text: '"No, it is free seat here."', hint: 'артикль и порядок слов', correct: false },
          { text: '"Yes it is not taken by nobody."', hint: 'двойное отрицание', correct: false }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════
  // EPISODE 3 — The Stranger
  // ══════════════════════════════════════════
  {
    id: 3,
    title: 'The Stranger',
    titleRu: 'Незнакомец',
    scene_intro: 'cafe',
    steps: [
      {
        type: 'narration', scene: 'cafe', action: 'cafe',
        speaker: 'Narrator',
        en: 'The stranger sits down. He has dark hair and a warm smile. His name is <w>Daniel</w>.',
        ru: 'Незнакомец садится. У него тёмные волосы и тёплая улыбка. Его зовут Дэниел.'
      },
      {
        type: 'choice', scene: 'cafe', action: 'cafe',
        speaker: 'Daniel',
        en: '"I\'ve never seen you here before. Do you come here <w>often</w>?"',
        ru: 'Я никогда раньше вас здесь не видел. Вы часто сюда ходите?',
        options: [
          { text: '"Every morning! It\'s my favourite spot."', hint: 'favourite spot — любимое место ✓', correct: true },
          { text: '"Yes I come here every of the mornings."', hint: 'неправильное употребление every', correct: false },
          { text: '"I am coming here always morning."', hint: 'Present Continuous для привычек неверно', correct: false }
        ]
      },
      {
        type: 'narration', scene: 'cafe', action: 'cafe',
        speaker: 'Narrator',
        en: 'Daniel laughs. He <w>works nearby</w> — at a design studio on North 6th Street.',
        ru: 'Дэниел смеётся. Он работает неподалёку — в дизайн-студии на Норт 6th Стрит.'
      },
      {
        type: 'voice', scene: 'cafe', action: 'cafe',
        speaker: 'Daniel',
        en: '"What do you do for work?"',
        ru: 'Кем вы работаете?',
        voiceEn: '"I\'m a graphic designer. I work freelance."',
        voiceRu: 'Я графический дизайнер. Работаю фрилансером.',
        refPitch: [.30,.35,.40,.48,.56,.62,.66,.68,.66,.62,.56,.50,.44,.38,
                   .32,.28,.30,.36,.44,.52,.58,.62,.60,.54,.46,.38,.30,.24]
      },
      {
        type: 'choice', scene: 'cafe', action: 'cafe',
        speaker: 'Grammar check',
        en: 'Daniel says: "I _____ for this company since 2020."',
        ru: 'Выбери правильное время:',
        options: [
          { text: '"have been working" — Present Perfect Continuous', hint: 'действие началось в прошлом и продолжается ✓', correct: true },
          { text: '"work" — Present Simple', hint: 'не показывает длительность', correct: false },
          { text: '"worked" — Past Simple', hint: 'действие закончилось', correct: false }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════
  // EPISODE 4 — Late for Work
  // ══════════════════════════════════════════
  {
    id: 4,
    title: 'Late for Work!',
    titleRu: 'Опоздание на работу!',
    scene_intro: 'street',
    steps: [
      {
        type: 'narration', scene: 'street', action: 'walk',
        speaker: 'Narrator',
        en: '{name} checks her phone. 9:15 AM! She\'s <w>running late</w> for her meeting!',
        ru: '{name} смотрит на телефон. 9:15! Она опаздывает на встречу!'
      },
      {
        type: 'choice', scene: 'street', action: 'walk',
        speaker: 'Boss (calling)',
        en: '"Where are you? The meeting <w>starts</w> in five minutes!"',
        ru: 'Где ты? Встреча начинается через пять минут!',
        options: [
          { text: '"I\'m on my way! I\'ll be there in ten minutes."', hint: 'on my way — в пути ✓', correct: true },
          { text: '"I am coming to there right now moment."', hint: 'лишние слова, неверная структура', correct: false },
          { text: '"Sorry I will come soon maybe."', hint: 'maybe звучит неуверенно и странно', correct: false }
        ]
      },
      {
        type: 'narration', scene: 'office', action: 'office',
        speaker: 'Narrator',
        en: '{name} <w>rushes</w> into the office. Everyone is already in the conference room.',
        ru: '{name} врывается в офис. Все уже в переговорной.'
      },
      {
        type: 'voice', scene: 'office', action: 'office',
        speaker: 'Colleague Sarah',
        en: '"You made it! We were worried about you."',
        ru: 'Ты успела! Мы волновались.',
        voiceEn: '"I\'m so sorry! The subway was delayed."',
        voiceRu: 'Мне очень жаль! Метро задержалось.',
        refPitch: [.28,.32,.38,.46,.54,.60,.64,.62,.58,.50,.42,.34,.28,.22,
                   .24,.30,.38,.46,.54,.60,.62,.58,.52,.44,.36,.28,.22,.18]
      },
      {
        type: 'choice', scene: 'office', action: 'office',
        speaker: 'Grammar check',
        en: '"The meeting _____ by the time you arrived."',
        ru: 'Выбери правильное время:',
        options: [
          { text: '"had already started" — Past Perfect', hint: 'действие завершилось до другого прошлого ✓', correct: true },
          { text: '"already started" — Past Simple', hint: 'без had — неполная форма', correct: false },
          { text: '"was starting" — Past Continuous', hint: 'процесс, не завершение', correct: false }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════
  // EPISODE 5 — Lunch Break
  // ══════════════════════════════════════════
  {
    id: 5,
    title: 'Lunch Break',
    titleRu: 'Обеденный перерыв',
    scene_intro: 'cafe',
    steps: [
      {
        type: 'narration', scene: 'cafe', action: 'cafe',
        speaker: 'Narrator',
        en: '1 PM. {name} and Sarah go to a <w>deli</w> around the corner for lunch.',
        ru: '13:00. {name} и Сара идут в кафе за углом на обед.'
      },
      {
        type: 'choice', scene: 'cafe', action: 'cafe',
        speaker: 'Server',
        en: '"Are you ready to <w>order</w>, or do you need a few more minutes?"',
        ru: 'Вы готовы заказать или вам нужно ещё немного времени?',
        options: [
          { text: '"We\'re ready! I\'ll have the chicken sandwich."', hint: 'I\'ll have — стандартный заказ ✓', correct: true },
          { text: '"Yes we want to order the sandwich of chicken."', hint: 'неправильный порядок слов', correct: false },
          { text: '"Give to us chicken sandwich please."', hint: 'неверная структура', correct: false }
        ]
      },
      {
        type: 'narration', scene: 'cafe', action: 'cafe',
        speaker: 'Sarah',
        en: '"So... who was that guy in the coffee shop this morning? You were <w>glowing</w>!"',
        ru: 'Итак... кто был тот парень в кофейне утром? Ты прямо светилась!'
      },
      {
        type: 'voice', scene: 'cafe', action: 'cafe',
        speaker: 'Sarah',
        en: '"Did he ask for your number?"',
        ru: 'Он попросил твой номер?',
        voiceEn: '"Not yet, but we\'re meeting for coffee tomorrow!"',
        voiceRu: 'Ещё нет, но мы встречаемся на кофе завтра!',
        refPitch: [.26,.30,.36,.44,.52,.58,.62,.60,.56,.50,.42,.34,.26,.20,
                   .22,.28,.36,.46,.56,.64,.68,.70,.68,.62,.54,.46,.38,.30,.22,.18]
      },
      {
        type: 'choice', scene: 'cafe', action: 'cafe',
        speaker: 'Grammar check',
        en: 'Sarah says: "You _____ him again? That\'s so exciting!"',
        ru: 'Выбери правильную форму:',
        options: [
          { text: '"\'re seeing" — Present Continuous (future plan)', hint: 'для запланированного будущего ✓', correct: true },
          { text: '"will see" — Future Simple', hint: 'спонтанное решение, не план', correct: false },
          { text: '"see" — Present Simple', hint: 'не выражает будущего', correct: false }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════
  // EPISODE 6 — Second Date
  // ══════════════════════════════════════════
  {
    id: 6,
    title: 'Second Meeting',
    titleRu: 'Вторая встреча',
    scene_intro: 'cafe',
    steps: [
      {
        type: 'narration', scene: 'cafe', action: 'cafe',
        speaker: 'Narrator',
        en: 'Tuesday afternoon. {name} arrives at the coffee shop. Daniel is already <w>waiting</w>.',
        ru: 'Вторник, после обеда. {name} приходит в кофейню. Дэниел уже ждёт.'
      },
      {
        type: 'choice', scene: 'cafe', action: 'cafe',
        speaker: 'Daniel',
        en: '"I\'ve been <w>looking forward</w> to this all day!"',
        ru: 'Я ждал этого весь день!',
        options: [
          { text: '"Me too! I\'ve been thinking about our conversation."', hint: 'Me too + Present Perfect ✓', correct: true },
          { text: '"Same here, I think about also yesterday conversation."', hint: 'неправильный порядок слов', correct: false },
          { text: '"Yes I also think this all the day too."', hint: 'лишние слова, неверная структура', correct: false }
        ]
      },
      {
        type: 'narration', scene: 'cafe', action: 'cafe',
        speaker: 'Narrator',
        en: 'They talk for two hours. Daniel is <w>originally from</w> Chicago but moved to NYC three years ago.',
        ru: 'Они разговаривают два часа. Дэниел родом из Чикаго, но переехал в Нью-Йорк три года назад.'
      },
      {
        type: 'voice', scene: 'cafe', action: 'cafe',
        speaker: 'Daniel',
        en: '"What do you love most about New York?"',
        ru: 'Что тебе больше всего нравится в Нью-Йорке?',
        voiceEn: '"The energy! Every day feels like an adventure."',
        voiceRu: 'Энергия! Каждый день ощущается как приключение.',
        refPitch: [.28,.34,.42,.50,.58,.64,.68,.66,.60,.52,.44,.36,.28,.22,
                   .24,.32,.42,.52,.60,.66,.68,.64,.56,.46,.36,.28,.20,.16]
      },
      {
        type: 'choice', scene: 'cafe', action: 'cafe',
        speaker: 'Grammar check',
        en: 'Daniel asks: "Have you _____ to the new rooftop bar on Kent Avenue?"',
        ru: 'Выбери правильную форму:',
        options: [
          { text: '"been" — Present Perfect (experience)', hint: 'have been = бывал(а) ✓', correct: true },
          { text: '"went" — Past Simple', hint: 'после have нужен Participle II', correct: false },
          { text: '"go" — базовый глагол', hint: 'после have нужен Participle II', correct: false }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════
  // EPISODE 7 — Central Park
  // ══════════════════════════════════════════
  {
    id: 7,
    title: 'Central Park',
    titleRu: 'Центральный парк',
    scene_intro: 'park',
    steps: [
      {
        type: 'narration', scene: 'park', action: 'park',
        speaker: 'Narrator',
        en: 'Weekend! Daniel suggests a walk in <w>Central Park</w>. The trees are beautiful in autumn.',
        ru: 'Выходные! Дэниел предлагает прогулку в Центральном парке. Деревья прекрасны осенью.'
      },
      {
        type: 'choice', scene: 'park', action: 'park',
        speaker: 'Daniel',
        en: '"Should we <w>grab</w> some food from a food truck?"',
        ru: 'Возьмём что-нибудь поесть из фуд-трака?',
        options: [
          { text: '"Absolutely! I\'m in the mood for tacos."', hint: 'in the mood for — хочется ✓', correct: true },
          { text: '"Yes we should to grab the food from truck."', hint: 'should + to — ошибка', correct: false },
          { text: '"OK I want eat food from the truck of food."', hint: 'неправильный порядок слов', correct: false }
        ]
      },
      {
        type: 'narration', scene: 'park', action: 'park',
        speaker: 'Narrator',
        en: 'They sit on a bench by the <w>lake</w>. Ducks swim past. It\'s a perfect afternoon.',
        ru: 'Они сидят на скамейке у озера. Утки плывут мимо. Идеальный полдень.'
      },
      {
        type: 'voice', scene: 'park', action: 'park',
        speaker: 'Daniel',
        en: '"I really like spending time with you."',
        ru: 'Мне правда нравится проводить с тобой время.',
        voiceEn: '"I feel the same way. This is really nice."',
        voiceRu: 'Я тоже. Это правда здорово.',
        refPitch: [.30,.36,.44,.52,.58,.62,.60,.54,.46,.38,.30,.24,
                   .22,.26,.32,.40,.48,.56,.62,.64,.60,.52,.42,.32,.24,.18]
      },
      {
        type: 'choice', scene: 'park', action: 'park',
        speaker: 'Grammar check',
        en: '"If the weather _____ good tomorrow, let\'s come back here."',
        ru: 'Выбери правильную форму условного:',
        options: [
          { text: '"is" — First Conditional (реальное условие)', hint: 'If + Present Simple → будущее ✓', correct: true },
          { text: '"will be" — Future в условии', hint: 'после if не используется will', correct: false },
          { text: '"would be" — Second Conditional', hint: 'нереальное условие — не то', correct: false }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════
  // EPISODE 8 — The Argument
  // ══════════════════════════════════════════
  {
    id: 8,
    title: 'Misunderstanding',
    titleRu: 'Недоразумение',
    scene_intro: 'street',
    steps: [
      {
        type: 'narration', scene: 'street', action: 'walk',
        speaker: 'Narrator',
        en: 'Monday again. {name} sees Daniel\'s <w>Instagram</w> — a photo with another girl. Her heart sinks.',
        ru: 'Снова понедельник. {name} видит инстаграм Дэниела — фото с другой девушкой. Сердце падает.'
      },
      {
        type: 'choice', scene: 'cafe', action: 'cafe',
        speaker: '{name} thinks',
        en: 'She <w>confronts</w> Daniel at the coffee shop. What does she say?',
        ru: 'Она идёт к Дэниелу в кофейню. Что она говорит?',
        options: [
          { text: '"Who is the girl in your photo? I\'m confused."', hint: 'I\'m confused — честно и прямо ✓', correct: true },
          { text: '"You are bad person because of photo girl."', hint: 'агрессивно и неграмотно', correct: false },
          { text: '"I see you with girl so now I am angry to you."', hint: 'неправильные предлоги', correct: false }
        ]
      },
      {
        type: 'narration', scene: 'cafe', action: 'cafe',
        speaker: 'Daniel',
        en: '"That\'s my <w>sister</w>! She visited from Chicago last weekend."',
        ru: 'Это моя сестра! Она приезжала из Чикаго на прошлые выходные.'
      },
      {
        type: 'voice', scene: 'cafe', action: 'cafe',
        speaker: '{name}',
        en: 'How do you apologise?',
        ru: 'Как ты извиняешься?',
        voiceEn: '"I\'m so sorry! I jumped to conclusions."',
        voiceRu: 'Мне очень жаль! Я поторопилась с выводами.',
        refPitch: [.24,.28,.34,.42,.50,.56,.58,.54,.48,.40,.32,.24,.18,
                   .20,.28,.38,.48,.56,.60,.58,.50,.40,.30,.22,.16,.14]
      },
      {
        type: 'choice', scene: 'cafe', action: 'cafe',
        speaker: 'Grammar check',
        en: 'Daniel laughs: "Don\'t worry! You _____ have asked me first."',
        ru: 'Выбери правильную форму:',
        options: [
          { text: '"could" — прошлое возможное действие', hint: 'could have + Participle II ✓', correct: true },
          { text: '"can" — Present Modal', hint: 'не для прошлого', correct: false },
          { text: '"should to" — ошибочная форма', hint: 'should не требует to', correct: false }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════
  // EPISODE 9 — First Date (official)
  // ══════════════════════════════════════════
  {
    id: 9,
    title: 'The First Date',
    titleRu: 'Первое свидание',
    scene_intro: 'restaurant',
    steps: [
      {
        type: 'narration', scene: 'restaurant', action: 'restaurant',
        speaker: 'Narrator',
        en: 'Friday evening. Daniel takes {name} to a <w>rooftop restaurant</w> in Manhattan.',
        ru: 'Пятничный вечер. Дэниел ведёт {name} в ресторан на крыше в Манхэттене.'
      },
      {
        type: 'choice', scene: 'restaurant', action: 'restaurant',
        speaker: 'Waiter',
        en: '"Good evening! Can I start you off with some <w>drinks</w>?"',
        ru: 'Добрый вечер! Могу я предложить вам что-нибудь выпить?',
        options: [
          { text: '"Yes, we\'ll have two glasses of white wine, please."', hint: 'we\'ll have — правильный заказ ✓', correct: true },
          { text: '"Please bring two of white wines for us."', hint: 'неверный счётный артикль', correct: false },
          { text: '"We want wine two glasses white."', hint: 'неверный порядок слов', correct: false }
        ]
      },
      {
        type: 'narration', scene: 'restaurant', action: 'restaurant',
        speaker: 'Narrator',
        en: 'The city <w>sparkles</w> below them. Daniel reaches across the table and takes her hand.',
        ru: 'Город сверкает внизу. Дэниел тянется через стол и берёт её за руку.'
      },
      {
        type: 'voice', scene: 'restaurant', action: 'restaurant',
        speaker: 'Daniel',
        en: '"This is the best evening I\'ve had in a long time."',
        ru: 'Это лучший вечер за долгое время.',
        voiceEn: '"I couldn\'t agree more. Thank you for tonight."',
        voiceRu: 'Полностью согласна. Спасибо за этот вечер.',
        refPitch: [.26,.30,.36,.44,.52,.58,.64,.68,.66,.60,.52,.44,.36,.28,.22,
                   .20,.24,.32,.42,.52,.60,.64,.62,.54,.44,.34,.26,.18,.14]
      },
      {
        type: 'choice', scene: 'restaurant', action: 'restaurant',
        speaker: 'Grammar check',
        en: '"This is the best restaurant I _____ ever been to!"',
        ru: 'Выбери правильную форму:',
        options: [
          { text: '"\'ve" (have) — Present Perfect с ever', hint: 'ever + Present Perfect ✓', correct: true },
          { text: '"was" — Past Simple', hint: 'не сочетается с ever в таком смысле', correct: false },
          { text: '"am" — Present Simple', hint: 'не сочетается с been', correct: false }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════
  // EPISODE 10 — The Big News
  // ══════════════════════════════════════════
  {
    id: 10,
    title: 'Big News!',
    titleRu: 'Большие новости!',
    scene_intro: 'office',
    steps: [
      {
        type: 'narration', scene: 'office', action: 'office',
        speaker: 'Narrator',
        en: 'Monday morning. {name} arrives at the office to find a letter on her desk.',
        ru: 'Понедельник утром. {name} приходит в офис и видит письмо на столе.'
      },
      {
        type: 'choice', scene: 'office', action: 'office',
        speaker: 'Boss (email)',
        en: '"Congratulations! You\'ve been <w>selected</w> for the New York Design Award."',
        ru: 'Поздравляем! Тебя выбрали для премии New York Design Award.',
        options: [
          { text: '"This is incredible! I can\'t believe it!"', hint: 'I can\'t believe it — искренняя радость ✓', correct: true },
          { text: '"Oh this is very much good news I am happy."', hint: 'неловкая структура', correct: false },
          { text: '"Thank to you I am selected for this award."', hint: 'неверная структура благодарности', correct: false }
        ]
      },
      {
        type: 'narration', scene: 'street', action: 'walk',
        speaker: 'Narrator',
        en: '{name} calls Daniel immediately. She can <w>barely</w> get the words out!',
        ru: '{name} сразу звонит Дэниелу. Она едва может выговорить слова!'
      },
      {
        type: 'voice', scene: 'street', action: 'walk',
        speaker: 'Daniel',
        en: '"What happened? You sound so excited!"',
        ru: 'Что случилось? Ты звучишь так взволнованно!',
        voiceEn: '"I won an award! I can\'t believe it\'s real!"',
        voiceRu: 'Я выиграла награду! Я не могу поверить, что это реально!',
        refPitch: [.28,.34,.42,.52,.60,.66,.70,.72,.70,.64,.56,.46,.36,.26,.18,
                   .20,.28,.38,.50,.60,.68,.72,.70,.62,.52,.40,.30,.20,.14]
      },
      {
        type: 'choice', scene: 'street', action: 'walk',
        speaker: 'Grammar check',
        en: 'Daniel says: "You _____ so hard. You deserve this!"',
        ru: 'Выбери правильную форму:',
        options: [
          { text: '"have worked" — Present Perfect', hint: 'результат прошлого действия ✓', correct: true },
          { text: '"worked" — Past Simple', hint: 'не связывает с настоящим моментом', correct: false },
          { text: '"are working" — Present Continuous', hint: 'процесс сейчас, не прошлый результат', correct: false }
        ]
      }
    ]
  }

];

// Export for use in main game
if (typeof module !== 'undefined') module.exports = EPISODES_DATA;
